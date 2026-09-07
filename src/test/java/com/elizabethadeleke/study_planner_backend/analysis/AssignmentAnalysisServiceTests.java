package com.elizabethadeleke.study_planner_backend.analysis;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;
import java.util.UUID;

import org.junit.jupiter.api.Test;

import com.elizabethadeleke.study_planner_backend.assignment.Assignment;

class AssignmentAnalysisServiceTests {

    private final AssignmentAnalysisService assignmentAnalysisService = new AssignmentAnalysisService();

    @Test
    void createsOneRequirementAndTaskForEachNumberedDeliverable() {
        Assignment assignment = new Assignment(UUID.randomUUID());
        assignment.setAssignmentTask("""
                Design, develop and document a web-based distributed application.

                Your assignment must include:
                1. A clear statement of the problem, target users and context.
                2. Research into multi-tier or distributed web systems and existing solutions.
                3. Functional and non-functional requirements.
                4. A system design including use cases and an N-tier architecture diagram.
                5. A functioning prototype demonstrating the essential functionality.
                6. Screenshots showing functionality, requirements fit, advantages and limitations of design choices.
                7. A critical reflection on learning, decision-making and challenges.
                """);

        AssignmentAnalysisResult result = assignmentAnalysisService.analyseAssignment(assignment);

        List<RequirementSuggestion> assignmentRequirements = result.requirements().stream()
                .filter(requirement -> requirement.sourceSection().equals("Assignment task"))
                .toList();
        List<TaskSuggestion> assignmentTasks = result.tasks().stream()
                .filter(task -> task.sourceSection().equals("Assignment task"))
                .toList();

        assertEquals(7, assignmentRequirements.size());
        assertEquals(7, assignmentTasks.size());
        assertTrue(assignmentRequirements.get(0).requirementText()
                .startsWith("Complete required deliverable 1:"));
        assertEquals("Define the problem, target users and context", assignmentTasks.get(0).taskTitle());
        assertEquals("Document functional and non-functional requirements", assignmentTasks.get(2).taskTitle());
        assertEquals("Build the functioning prototype", assignmentTasks.get(4).taskTitle());
        assertEquals("Write the critical reflection", assignmentTasks.get(6).taskTitle());
    }

    @Test
    void fallsBackToOneTaskWhenTheBriefHasNoNumberedDeliverables() {
        Assignment assignment = new Assignment(UUID.randomUUID());
        assignment.setAssignmentTask("Build and evaluate a secure web service.");

        AssignmentAnalysisResult result = assignmentAnalysisService.analyseAssignment(assignment);

        assertEquals(1, result.requirements().size());
        assertEquals(1, result.tasks().size());
        assertEquals("Complete the assignment task", result.requirements().get(0).requirementText());
        assertEquals("Complete the assignment task", result.tasks().get(0).taskTitle());
    }

    @Test
    void createsSeparateTasksForInlineLetteredDeliverables() {
        Assignment assignment = new Assignment(UUID.randomUUID());
        assignment.setAssignmentTask("""
                This assessment element will include: a) KSB-mapped evidence b) An updated Action Plan (PPDP)
                c) Critical reflection on the learner's professional development to date and into the future.
                """);

        AssignmentAnalysisResult result = assignmentAnalysisService.analyseAssignment(assignment);

        List<RequirementSuggestion> assignmentRequirements = result.requirements().stream()
                .filter(requirement -> requirement.sourceSection().equals("Assignment task"))
                .toList();
        List<TaskSuggestion> assignmentTasks = result.tasks().stream()
                .filter(task -> task.sourceSection().equals("Assignment task"))
                .toList();

        assertEquals(3, assignmentRequirements.size());
        assertEquals("Complete required deliverable a: KSB-mapped evidence",
                assignmentRequirements.get(0).requirementText());
        assertEquals("Compile the KSB-mapped evidence portfolio", assignmentTasks.get(0).taskTitle());
        assertEquals(
                "Gather and organise evidence showing how your work demonstrates the relevant Knowledge, Skills "
                        + "and Behaviours, then map it to the requirements in the assignment brief. "
                        + "Source: KSB-mapped evidence",
                assignmentTasks.get(0).taskDescription());
        assertEquals("Update the Action Plan (PPDP)", assignmentTasks.get(1).taskTitle());
        assertEquals("Write the critical reflection", assignmentTasks.get(2).taskTitle());
    }

    @Test
    void stopsAfterTheFirstLetteredListAndExcludesFollowingExplanation() {
        Assignment assignment = new Assignment(UUID.randomUUID());
        assignment.setAssignmentTask("""
                This assessment element will include: a) KSB-mapped evidence b) An updated Action Plan (PPDP)
                c) Critical reflection on the learner's professional development to date and into the future.
                The KSB-mapped evidence will act as the portfolio of evidence for the professional review and will
                be aligned to: a) workplace evidence b) supporting documents c) reflective commentary.
                """);

        AssignmentAnalysisResult result = assignmentAnalysisService.analyseAssignment(assignment);

        List<TaskSuggestion> assignmentTasks = result.tasks().stream()
                .filter(task -> task.sourceSection().equals("Assignment task"))
                .toList();

        assertEquals(3, assignmentTasks.size());
        assertEquals("Compile the KSB-mapped evidence portfolio", assignmentTasks.get(0).taskTitle());
        assertEquals("Update the Action Plan (PPDP)", assignmentTasks.get(1).taskTitle());
        assertEquals("Write the critical reflection", assignmentTasks.get(2).taskTitle());
        assertEquals(
                "Critical reflection on the learner's professional development to date and into the future.",
                assignmentTasks.get(2).sourcePassage());
    }
}
