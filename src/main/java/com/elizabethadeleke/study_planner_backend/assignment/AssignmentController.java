package com.elizabethadeleke.study_planner_backend.assignment;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AssignmentController {

    private final AssignmentService assignmentService;

    public AssignmentController(AssignmentService assignmentService) {
        this.assignmentService = assignmentService;
    }

    @GetMapping("/api/assignments")
    public List<Assignment> listAssignments(@AuthenticationPrincipal Jwt jwt) {
        UUID userId = UUID.fromString(jwt.getSubject());
        return assignmentService.listAssignments(userId);
    }

    @GetMapping("/api/assignments/{assignmentId}")
    public Assignment getAssignment(@AuthenticationPrincipal Jwt jwt, @PathVariable UUID assignmentId) {
        UUID userId = UUID.fromString(jwt.getSubject());
        return assignmentService.getAssignment(userId, assignmentId);
    }

    @PostMapping("/api/assignments")
    public Assignment createAssignment(
            @AuthenticationPrincipal Jwt jwt,
            @RequestBody CreateAssignmentRequest request) {

        UUID userId = UUID.fromString(jwt.getSubject());

        return assignmentService.createAssignment(
                userId,
                request.moduleCode(),
                request.moduleTitle(),
                request.moduleLeader(),
                request.assignmentType(),
                request.assignmentWeighting(),
                request.assignmentTask(),
                request.assessmentCriteria(),
                request.learningOutcomesKsbs(),
                request.referencingGuidance(),
                request.officialDeadline(),
                request.personalTargetDate(),
                request.personalAssignmentGoal());
    }

    public record CreateAssignmentRequest(
            String moduleCode,
            String moduleTitle,
            String moduleLeader,
            String assignmentType,
            BigDecimal assignmentWeighting,
            String assignmentTask,
            String assessmentCriteria,
            String learningOutcomesKsbs,
            String referencingGuidance,
            LocalDate officialDeadline,
            LocalDate personalTargetDate,
            String personalAssignmentGoal) {
    }
}