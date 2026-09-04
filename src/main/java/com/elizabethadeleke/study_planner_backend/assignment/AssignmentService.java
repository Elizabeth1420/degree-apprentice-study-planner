package com.elizabethadeleke.study_planner_backend.assignment;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AssignmentService {

    private final AssignmentRepository repository;
    private final BriefAnalysisService briefAnalysisService;

    public AssignmentService(AssignmentRepository repository, BriefAnalysisService briefAnalysisService) {
        this.repository = repository;
        this.briefAnalysisService = briefAnalysisService;
    }

    @Transactional(readOnly = true)
    public List<Assignment> listAssignments(UUID userId) {
        return repository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    @Transactional(readOnly = true)
    public Assignment getAssignment(UUID userId, UUID assignmentId) {
        return repository.findByAssignmentIdAndUserId(assignmentId, userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Assignment not found"));
    }

    @Transactional
    public void deleteAssignment(UUID userId, UUID assignmentId) {
        Assignment assignment = getAssignment(userId, assignmentId);
        repository.delete(assignment);
    }

    @Transactional
    public Assignment updateBriefText(UUID userId, UUID assignmentId, String extractedText) {
        Assignment assignment = getAssignment(userId, assignmentId);
        assignment.setExtractedText(extractedText);
        return repository.save(assignment);
    }

    @Transactional
    public Assignment updateBriefFile(
            UUID userId,
            UUID assignmentId,
            String uploadedFileName,
            String uploadedFileType,
            String extractedText) {

        Assignment assignment = getAssignment(userId, assignmentId);
        assignment.setUploadedFileName(uploadedFileName);
        assignment.setUploadedFileType(uploadedFileType);
        assignment.setExtractedText(extractedText);
        briefAnalysisService.populateAssignmentFields(assignment, extractedText);
        return repository.save(assignment);
    }

    @Transactional
    public Assignment createAssignment(
            UUID userId,
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

        Assignment assignment = new Assignment(userId);
        assignment.setModuleCode(moduleCode);
        assignment.setModuleTitle(moduleTitle);
        assignment.setModuleLeader(moduleLeader);
        assignment.setAssignmentType(assignmentType);
        assignment.setAssignmentWeighting(assignmentWeighting);
        assignment.setAssessmentCriteria(assessmentCriteria);
        assignment.setAssignmentTask(assignmentTask);
        assignment.setLearningOutcomesKsbs(learningOutcomesKsbs);
        assignment.setReferencingGuidance(referencingGuidance);
        assignment.setOfficialDeadline(officialDeadline);
        assignment.setPersonalTargetDate(personalTargetDate);
        assignment.setPersonalAssignmentGoal(personalAssignmentGoal);


        return repository.save(assignment);
    }
}