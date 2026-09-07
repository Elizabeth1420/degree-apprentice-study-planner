package com.elizabethadeleke.study_planner_backend.task;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;
import java.util.UUID;

import org.junit.jupiter.api.Test;

import com.elizabethadeleke.study_planner_backend.analysis.AssignmentAnalysisService;
import com.elizabethadeleke.study_planner_backend.analysis.TaskSuggestion;
import com.elizabethadeleke.study_planner_backend.assignment.Assignment;

class StudyTaskServiceTests {

    private final AssignmentAnalysisService assignmentAnalysisService = new AssignmentAnalysisService();

    @Test
    void regenerationPreservesReviewedAndManualTasksAndReplacesOnlyObsoleteSuggestions() {
        UUID assignmentId = UUID.randomUUID();
        Assignment assignment = assignmentWithSevenDeliverables();
        List<TaskSuggestion> currentSuggestions = assignmentAnalysisService.analyseAssignment(assignment).tasks();

        StudyTask obsoleteSuggestion = new StudyTask(
                assignmentId,
                null,
                "Break down the assignment task",
                "Old generic description",
                assignment.getAssignmentTask());

        StudyTask approvedGeneratedTask = new StudyTask(
                assignmentId,
                null,
                "Define the problem, target users and context",
                "Existing reviewed description",
                "A clear statement of the problem, target users and context.");
        approvedGeneratedTask.setApprovalStatus("APPROVED");

        StudyTask manualTask = new StudyTask(
                assignmentId,
                null,
                "Arrange a tutor meeting",
                null,
                null);
        manualTask.setOrigin("STUDENT");
        manualTask.setApprovalStatus("APPROVED");

        StudyTaskService.TaskGenerationPlan plan = StudyTaskService.buildGenerationPlan(
                List.of(obsoleteSuggestion, approvedGeneratedTask, manualTask),
                currentSuggestions);

        assertEquals(List.of(obsoleteSuggestion), plan.obsoleteTasks());
        assertEquals(6, plan.newSuggestions().size());
        assertTrue(plan.newSuggestions().stream()
                .anyMatch(suggestion -> suggestion.taskTitle().equals("Build the functioning prototype")));
    }

    @Test
    void regenerationDoesNotCreateDuplicatesWhenSuggestionsAlreadyExist() {
        UUID assignmentId = UUID.randomUUID();
        Assignment assignment = new Assignment(UUID.randomUUID());
        assignment.setAssignmentTask("Build and evaluate a secure web service.");

        List<TaskSuggestion> currentSuggestions = assignmentAnalysisService.analyseAssignment(assignment).tasks();
        StudyTask existingSuggestion = new StudyTask(
                assignmentId,
                null,
                "Complete the assignment task",
                "Existing description",
                assignment.getAssignmentTask());

        StudyTaskService.TaskGenerationPlan plan = StudyTaskService.buildGenerationPlan(
                List.of(existingSuggestion),
                currentSuggestions);

        assertTrue(plan.obsoleteTasks().isEmpty());
        assertTrue(plan.newSuggestions().isEmpty());
    }

    private Assignment assignmentWithSevenDeliverables() {
        Assignment assignment = new Assignment(UUID.randomUUID());
        assignment.setAssignmentTask("""
                Your assignment must include:
                1. A clear statement of the problem, target users and context.
                2. Research into distributed web systems and existing solutions.
                3. Functional and non-functional requirements.
                4. A system design including use cases and an N-tier architecture diagram.
                5. A functioning prototype demonstrating essential functionality.
                6. Screenshots showing functionality and the limitations of design choices.
                7. A critical reflection on learning and challenges.
                """);
        return assignment;
    }
}
