package com.elizabethadeleke.study_planner_backend.requirement;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.elizabethadeleke.study_planner_backend.assignment.Assignment;
import com.elizabethadeleke.study_planner_backend.assignment.AssignmentService;
import com.elizabethadeleke.study_planner_backend.analysis.AssignmentAnalysisService;
import com.elizabethadeleke.study_planner_backend.analysis.RequirementSuggestion;

@Service
public class RequirementService {

    private final RequirementRepository requirementRepository;
    private final AssignmentService assignmentService;
    private final AssignmentAnalysisService assignmentAnalysisService;

    public RequirementService(
            RequirementRepository requirementRepository,
            AssignmentService assignmentService,
            AssignmentAnalysisService assignmentAnalysisService) {
        this.requirementRepository = requirementRepository;
        this.assignmentService = assignmentService;
        this.assignmentAnalysisService = assignmentAnalysisService;
    }

    @Transactional(readOnly = true)
    public List<Requirement> listRequirements(UUID userId, UUID assignmentId) {
        assignmentService.getAssignment(userId, assignmentId);
        return requirementRepository.findByAssignmentIdOrderByCreatedAtAsc(assignmentId);
    }

    @Transactional
    public List<Requirement> generateRequirements(UUID userId, UUID assignmentId) {
        Assignment assignment = assignmentService.getAssignment(userId, assignmentId);

        requirementRepository.deleteByAssignmentId(assignmentId);

        List<Requirement> requirements = new ArrayList<>();

        for (RequirementSuggestion suggestion : assignmentAnalysisService.analyseAssignment(assignment)
                .requirements()) {
            addRequirement(
                    requirements,
                    assignmentId,
                    suggestion.requirementText(),
                    suggestion.sourcePassage(),
                    suggestion.sourceSection());
        }

        return requirementRepository.saveAll(requirements);
    }

    private void addRequirement(
            List<Requirement> requirements,
            UUID assignmentId,
            String requirementText,
            String sourcePassage,
            String sourceSection) {

        if (sourcePassage != null && !sourcePassage.trim().isEmpty()) {
            requirements.add(new Requirement(assignmentId, requirementText, sourcePassage.trim(), sourceSection));
        }
    }
}
