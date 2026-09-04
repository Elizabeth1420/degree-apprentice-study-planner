package com.elizabethadeleke.study_planner_backend.task;

import java.util.List;
import java.util.UUID;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StudyTaskController {

    private final StudyTaskService studyTaskService;

    public StudyTaskController(StudyTaskService studyTaskService) {
        this.studyTaskService = studyTaskService;
    }

    @GetMapping("/api/assignments/{assignmentId}/tasks")
    public List<StudyTask> listTasks(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable UUID assignmentId) {

        UUID userId = UUID.fromString(jwt.getSubject());
        return studyTaskService.listTasks(userId, assignmentId);
    }

    @PostMapping("/api/assignments/{assignmentId}/tasks/generate")
    public List<StudyTask> generateTasks(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable UUID assignmentId) {

        UUID userId = UUID.fromString(jwt.getSubject());
        return studyTaskService.generateTasks(userId, assignmentId);
    }

    @PostMapping("/api/assignments/{assignmentId}/tasks")
    public StudyTask createManualTask(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable UUID assignmentId,
            @RequestBody CreateManualTaskRequest request) {

        UUID userId = UUID.fromString(jwt.getSubject());

        return studyTaskService.createManualTask(
                userId,
                assignmentId,
                request.taskTitle(),
                request.taskDescription());
    }

        @PatchMapping("/api/assignments/{assignmentId}/tasks/{taskId}/approve")
    public StudyTask approveTask(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable UUID assignmentId,
            @PathVariable UUID taskId) {

        UUID userId = UUID.fromString(jwt.getSubject());
        return studyTaskService.approveTask(userId, assignmentId, taskId);
    }

    @PatchMapping("/api/assignments/{assignmentId}/tasks/{taskId}/reject")
    public StudyTask rejectTask(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable UUID assignmentId,
            @PathVariable UUID taskId) {

        UUID userId = UUID.fromString(jwt.getSubject());
        return studyTaskService.rejectTask(userId, assignmentId, taskId);
    }

    @PatchMapping("/api/assignments/{assignmentId}/tasks/{taskId}/complete")
    public StudyTask completeTask(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable UUID assignmentId,
            @PathVariable UUID taskId) {

        UUID userId = UUID.fromString(jwt.getSubject());
        return studyTaskService.completeTask(userId, assignmentId, taskId);
    }

    @DeleteMapping("/api/assignments/{assignmentId}/tasks/{taskId}")
    public void deleteManualTask(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable UUID assignmentId,
            @PathVariable UUID taskId) {

        UUID userId = UUID.fromString(jwt.getSubject());
        studyTaskService.deleteManualTask(userId, assignmentId, taskId);
    }

    public record CreateManualTaskRequest(
        String taskTitle,
        String taskDescription) {
}
}