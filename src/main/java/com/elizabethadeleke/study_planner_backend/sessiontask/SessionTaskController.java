package com.elizabethadeleke.study_planner_backend.sessiontask;

import java.util.List;
import java.util.UUID;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SessionTaskController {

    private final SessionTaskService sessionTaskService;

    public SessionTaskController(SessionTaskService sessionTaskService) {
        this.sessionTaskService = sessionTaskService;
    }

    @GetMapping("/api/assignments/{assignmentId}/study-sessions/{sessionId}/tasks")
    public List<SessionTask> listSessionTasks(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable UUID assignmentId,
            @PathVariable UUID sessionId) {

        UUID userId = UUID.fromString(jwt.getSubject());
        return sessionTaskService.listSessionTasks(userId, assignmentId, sessionId);
    }

    @PostMapping("/api/assignments/{assignmentId}/study-sessions/{sessionId}/tasks/{taskId}")
    public SessionTask addTaskToSession(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable UUID assignmentId,
            @PathVariable UUID sessionId,
            @PathVariable UUID taskId) {

        UUID userId = UUID.fromString(jwt.getSubject());
        return sessionTaskService.addTaskToSession(userId, assignmentId, sessionId, taskId);
    }

    @DeleteMapping("/api/assignments/{assignmentId}/study-sessions/{sessionId}/tasks/{taskId}")
    public void removeTaskFromSession(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable UUID assignmentId,
            @PathVariable UUID sessionId,
            @PathVariable UUID taskId) {

        UUID userId = UUID.fromString(jwt.getSubject());
        sessionTaskService.removeTaskFromSession(userId, assignmentId, sessionId, taskId);
    }
}