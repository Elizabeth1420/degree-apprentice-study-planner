package com.elizabethadeleke.study_planner_backend.requirement;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.elizabethadeleke.study_planner_backend.assignment.Assignment;
import com.elizabethadeleke.study_planner_backend.assignment.AssignmentService;

@Service
public class RequirementService {

    private final RequirementRepository requirementRepository;
    private final AssignmentService assignmentService;

    public RequirementService(RequirementRepository requirementRepository, AssignmentService assignmentService) {
        this.requirementRepository = requirementRepository;
        this.assignmentService = assignmentService;
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

        addRequirement(requirements, assignmentId, "Complete the assignment task", assignment.getAssignmentTask(), "Assignment task");
        addRequirement(requirements, assignmentId, "Meet the assessment criteria", assignment.getAssessmentCriteria(), "Assessment criteria");
        addRequirement(requirements, assignmentId, "Address the learning outcomes and KSBs", assignment.getLearningOutcomesKsbs(), "Learning outcomes / KSBs");
        addRequirement(requirements, assignmentId, "Follow the referencing guidance", assignment.getReferencingGuidance(), "Referencing guidance");

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