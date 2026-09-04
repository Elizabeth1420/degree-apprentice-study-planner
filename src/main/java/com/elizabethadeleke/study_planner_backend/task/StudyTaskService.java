package com.elizabethadeleke.study_planner_backend.task;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.elizabethadeleke.study_planner_backend.assignment.AssignmentService;
import com.elizabethadeleke.study_planner_backend.requirement.Requirement;
import com.elizabethadeleke.study_planner_backend.requirement.RequirementService;

@Service
public class StudyTaskService {

    private static final String AI = "AI";
    private static final String STUDENT = "STUDENT";
    private static final String APPROVED = "APPROVED";
    private static final String COMPLETE = "COMPLETE";

    private final StudyTaskRepository studyTaskRepository;
    private final AssignmentService assignmentService;
    private final RequirementService requirementService;

    public StudyTaskService(
            StudyTaskRepository studyTaskRepository,
            AssignmentService assignmentService,
            RequirementService requirementService) {
        this.studyTaskRepository = studyTaskRepository;
        this.assignmentService = assignmentService;
        this.requirementService = requirementService;
    }

    @Transactional(readOnly = true)
    public List<StudyTask> listTasks(UUID userId, UUID assignmentId) {
        assignmentService.getAssignment(userId, assignmentId);
        return studyTaskRepository.findByAssignmentIdOrderByCreatedAtAsc(assignmentId);
    }

    @Transactional
    public List<StudyTask> generateTasks(UUID userId, UUID assignmentId) {
        assignmentService.getAssignment(userId, assignmentId);

        List<StudyTask> existingTasks = studyTaskRepository.findByAssignmentIdOrderByCreatedAtAsc(assignmentId);

        if (!existingTasks.isEmpty()) {
            return existingTasks;
        }

        List<Requirement> requirements = requirementService.listRequirements(userId, assignmentId);

        studyTaskRepository.deleteByAssignmentIdAndOrigin(assignmentId, AI);

        List<StudyTask> tasks = new ArrayList<>();

        for (Requirement requirement : requirements) {
            tasks.add(new StudyTask(
                    assignmentId,
                    requirement.getRequirementId(),
                    buildTaskTitle(requirement),
                    requirement.getSourcePassage(),
                    requirement.getSourcePassage()));
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
    public StudyTask completeTask(UUID userId, UUID assignmentId, UUID taskId) {
        StudyTask task = getTaskForAssignment(userId, assignmentId, taskId);
        task.setTaskStatus(COMPLETE);
        return studyTaskRepository.save(task);
    }

    private StudyTask getTaskForAssignment(UUID userId, UUID assignmentId, UUID taskId) {
        assignmentService.getAssignment(userId, assignmentId);

        return studyTaskRepository.findByTaskIdAndAssignmentId(taskId, assignmentId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found"));
    }

    private String buildTaskTitle(Requirement requirement) {
        return switch (requirement.getSourceSection()) {
            case "Assignment task" -> "Break down the assignment task";
            case "Assessment criteria" -> "Map work against the assessment criteria";
            case "Learning outcomes / KSBs" -> "Evidence the learning outcomes and KSBs";
            case "Referencing guidance" -> "Check referencing requirements";
            default -> requirement.getRequirementText();
        };
    }
}