package com.elizabethadeleke.study_planner_backend.task;

import com.elizabethadeleke.study_planner_backend.sessiontask.SessionTaskRepository;

import java.util.ArrayList;
import java.util.List;
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

        if (!existingTasks.isEmpty()) {
            return existingTasks;
        }

        List<Requirement> requirements = requirementService.listRequirements(userId, assignmentId);

        studyTaskRepository.deleteByAssignmentIdAndOrigin(assignmentId, AI);

        List<StudyTask> tasks = new ArrayList<>();

        for (TaskSuggestion suggestion : assignmentAnalysisService.analyseAssignment(assignment).tasks()) {
            Requirement matchingRequirement = requirements.stream()
                    .filter(requirement -> requirement.getSourceSection().equals(suggestion.sourceSection()))
                    .findFirst()
                    .orElse(null);

            tasks.add(new StudyTask(
                    assignmentId,
                    matchingRequirement == null ? null : matchingRequirement.getRequirementId(),
                    suggestion.taskTitle(),
                    suggestion.taskDescription(),
                    suggestion.sourcePassage()));
        }

        return studyTaskRepository.saveAll(tasks);
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
