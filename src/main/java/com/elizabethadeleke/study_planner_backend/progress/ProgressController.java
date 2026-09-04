package com.elizabethadeleke.study_planner_backend.progress;

import java.util.UUID;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProgressController {

    private final ProgressService progressService;

    public ProgressController(ProgressService progressService) {
        this.progressService = progressService;
    }

    @GetMapping("/api/assignments/{assignmentId}/progress")
    public AssignmentProgress getAssignmentProgress(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable UUID assignmentId) {

        UUID userId = UUID.fromString(jwt.getSubject());
        return progressService.getAssignmentProgress(userId, assignmentId);
    }
}