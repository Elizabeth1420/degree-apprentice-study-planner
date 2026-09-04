package com.elizabethadeleke.study_planner_backend.requirement;

import java.util.List;
import java.util.UUID;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RequirementController {

    private final RequirementService requirementService;

    public RequirementController(RequirementService requirementService) {
        this.requirementService = requirementService;
    }

    @GetMapping("/api/assignments/{assignmentId}/requirements")
    public List<Requirement> listRequirements(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable UUID assignmentId) {

        UUID userId = UUID.fromString(jwt.getSubject());
        return requirementService.listRequirements(userId, assignmentId);
    }

    @PostMapping("/api/assignments/{assignmentId}/requirements/generate")
    public List<Requirement> generateRequirements(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable UUID assignmentId) {

        UUID userId = UUID.fromString(jwt.getSubject());
        return requirementService.generateRequirements(userId, assignmentId);
    }
}