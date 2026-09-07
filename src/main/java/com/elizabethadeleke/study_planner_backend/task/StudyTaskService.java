package com.elizabethadeleke.study_planner_backend.task;

import com.elizabethadeleke.study_planner_backend.sessiontask.SessionTaskRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.elizabethadeleke.study_planner_backend.assignment.Assignment;
import com.elizabethadeleke.study_planner_backend.assignment.AssignmentService;
import com.elizabethadeleke.study_planner_backend.analysis.AssignmentAnalysisService;
import com.elizabethadeleke.study_planner_backend.analysis.TaskSuggestion;
import com.elizabethadeleke.study_planner_backend.requirement.Requirement;
import com.elizabethadeleke.study_planner_backend.requirement.RequirementService;

@Service
public class StudyTaskService {

    private static final String AI = "AI";
    private static final String STUDENT = "STUDENT";
    private static final String SUGGESTED = "SUGGESTED";
    private static final String APPROVED = "APPROVED";
    private static final String REJECTED = "REJECTED";
    private static final String COMPLETE = "COMPLETE";

    private final StudyTaskRepository studyTaskRepository;
    private final AssignmentService assignmentService;
    private final RequirementService requirementService;
    private final SessionTaskRepository sessionTaskRepository;
    private final AssignmentAnalysisService assignmentAnalysisService;

    public StudyTaskService(
            StudyTaskRepository studyTaskRepository,
            AssignmentService assignmentService,
            RequirementService requirementService,
            SessionTaskRepository sessionTaskRepository,
            AssignmentAnalysisService assignmentAnalysisService) {
        this.studyTaskRepository = studyTaskRepository;
        this.assignmentService = assignmentService;
        this.requirementService = requirementService;
        this.sessionTaskRepository = sessionTaskRepository;
        this.assignmentAnalysisService = assignmentAnalysisService;
    }

    @Transactional(readOnly = true)
    public List<StudyTask> listTasks(UUID userId, UUID assignmentId) {
        assignmentService.getAssignment(userId, assignmentId);
        return studyTaskRepository.findByAssignmentIdOrderByCreatedAtAsc(assignmentId);
    }

    @Transactional
    public List<StudyTask> generateTasks(UUID userId, UUID assignmentId) {
        Assignment assignment = assignmentService.getAssignment(userId, assignmentId);

        List<StudyTask> existingTasks = studyTaskRepository.findByAssignmentIdOrderByCreatedAtAsc(assignmentId);
        List<Requirement> requirements = requirementService.listRequirements(userId, assignmentId);
        List<TaskSuggestion> suggestions = assignmentAnalysisService.analyseAssignment(assignment).tasks();
        TaskGenerationPlan generationPlan = buildGenerationPlan(existingTasks, suggestions);

        for (StudyTask obsoleteTask : generationPlan.obsoleteTasks()) {
            sessionTaskRepository.deleteByTaskId(obsoleteTask.getTaskId());
            studyTaskRepository.delete(obsoleteTask);
        }

        List<StudyTask> newTasks = new ArrayList<>();

        for (TaskSuggestion suggestion : generationPlan.newSuggestions()) {
            Requirement matchingRequirement = findMatchingRequirement(requirements, suggestion);

            newTasks.add(new StudyTask(
                    assignmentId,
                    matchingRequirement == null ? null : matchingRequirement.getRequirementId(),
                    suggestion.taskTitle(),
                    suggestion.taskDescription(),
                    suggestion.sourcePassage()));
        }

        if (!newTasks.isEmpty()) {
            studyTaskRepository.saveAll(newTasks);
        }

        return studyTaskRepository.findByAssignmentIdOrderByCreatedAtAsc(assignmentId);
    }

    static TaskGenerationPlan buildGenerationPlan(
            List<StudyTask> existingTasks,
            List<TaskSuggestion> currentSuggestions) {

        if (currentSuggestions.isEmpty()) {
            return new TaskGenerationPlan(List.of(), List.of());
        }

        List<StudyTask> obsoleteTasks = existingTasks.stream()
                .filter(task -> AI.equals(task.getOrigin()))
                .filter(task -> SUGGESTED.equals(task.getApprovalStatus()))
                .filter(task -> currentSuggestions.stream()
                        .noneMatch(suggestion -> matchesSuggestion(task, suggestion)))
                .toList();

        List<TaskSuggestion> newSuggestions = currentSuggestions.stream()
                .filter(suggestion -> existingTasks.stream()
                        .noneMatch(task -> matchesSuggestion(task, suggestion)))
                .toList();

        return new TaskGenerationPlan(obsoleteTasks, newSuggestions);
    }

    private Requirement findMatchingRequirement(
            List<Requirement> requirements,
            TaskSuggestion suggestion) {

        return requirements.stream()
                .filter(requirement -> sameText(requirement.getSourceSection(), suggestion.sourceSection()))
                .filter(requirement -> sameText(requirement.getSourcePassage(), suggestion.sourcePassage()))
                .findFirst()
                .orElseGet(() -> requirements.stream()
                        .filter(requirement -> sameText(requirement.getSourceSection(), suggestion.sourceSection()))
                        .findFirst()
                        .orElse(null));
    }

    private static boolean matchesSuggestion(StudyTask task, TaskSuggestion suggestion) {
        return AI.equals(task.getOrigin())
                && sameText(task.getTaskTitle(), suggestion.taskTitle())
                && sameText(task.getSourcePassage(), suggestion.sourcePassage());
    }

    private static boolean sameText(String first, String second) {
        return normaliseText(first).equals(normaliseText(second));
    }

    private static String normaliseText(String value) {
        return value == null
                ? ""
                : value.trim().replaceAll("\\s+", " ").toLowerCase(Locale.ROOT);
    }

    record TaskGenerationPlan(
            List<StudyTask> obsoleteTasks,
            List<TaskSuggestion> newSuggestions) {
    }

    @Transactional
    public StudyTask createManualTask(
            UUID userId,
            UUID assignmentId,
            String taskTitle,
            String taskDescription) {

        assignmentService.getAssignment(userId, assignmentId);

        if (taskTitle == null || taskTitle.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Task title is required");
        }

        StudyTask task = new StudyTask(
                assignmentId,
                null,
                taskTitle.trim(),
                taskDescription == null || taskDescription.isBlank() ? null : taskDescription.trim(),
                null);

        task.setOrigin(STUDENT);
        task.setApprovalStatus(APPROVED);

        return studyTaskRepository.save(task);
    }

    @Transactional
    public StudyTask approveTask(UUID userId, UUID assignmentId, UUID taskId) {
        StudyTask task = getTaskForAssignment(userId, assignmentId, taskId);
        task.setApprovalStatus(APPROVED);
        return studyTaskRepository.save(task);
    }

    @Transactional
    public StudyTask rejectTask(UUID userId, UUID assignmentId, UUID taskId) {
        StudyTask task = getTaskForAssignment(userId, assignmentId, taskId);

        if (!AI.equals(task.getOrigin())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Only generated tasks can be rejected");
        }

        if (!SUGGESTED.equals(task.getApprovalStatus())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Only suggested tasks can be rejected");
        }

        sessionTaskRepository.deleteByTaskId(taskId);
        task.setApprovalStatus(REJECTED);

        return studyTaskRepository.save(task);
    }

    @Transactional
    public StudyTask completeTask(UUID userId, UUID assignmentId, UUID taskId) {
        StudyTask task = getTaskForAssignment(userId, assignmentId, taskId);
        task.setTaskStatus(COMPLETE);
        return studyTaskRepository.save(task);
    }

    @Transactional
    public void deleteManualTask(UUID userId, UUID assignmentId, UUID taskId) {
        StudyTask task = getTaskForAssignment(userId, assignmentId, taskId);

        if (!STUDENT.equals(task.getOrigin())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Only manual tasks can be deleted");
        }

        sessionTaskRepository.deleteByTaskId(taskId);
        studyTaskRepository.delete(task);
    }

    private StudyTask getTaskForAssignment(UUID userId, UUID assignmentId, UUID taskId) {
        assignmentService.getAssignment(userId, assignmentId);

        return studyTaskRepository.findByTaskIdAndAssignmentId(taskId, assignmentId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found"));
    }


}
