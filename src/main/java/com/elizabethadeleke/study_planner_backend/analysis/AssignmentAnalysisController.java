package com.elizabethadeleke.study_planner_backend.analysis;

import java.util.List;
import java.util.UUID;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.elizabethadeleke.study_planner_backend.assignment.Assignment;
import com.elizabethadeleke.study_planner_backend.assignment.AssignmentService;

@RestController
public class AssignmentAnalysisController {

    private final AssignmentService assignmentService;
    private final AssignmentAnalysisService assignmentAnalysisService;

    public AssignmentAnalysisController(
            AssignmentService assignmentService,
            AssignmentAnalysisService assignmentAnalysisService) {
        this.assignmentService = assignmentService;
        this.assignmentAnalysisService = assignmentAnalysisService;
    }

    @GetMapping("/api/assignments/{assignmentId}/analysis/success-checklist")
    public List<String> getSuccessChecklist(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable UUID assignmentId) {

        UUID userId = UUID.fromString(jwt.getSubject());
        Assignment assignment = assignmentService.getAssignment(userId, assignmentId);

        return assignmentAnalysisService.analyseAssignment(assignment).successChecklist();
    }
}
