package com.elizabethadeleke.study_planner_backend.assignment;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.UUID;

import org.junit.jupiter.api.Test;

class BriefAnalysisServiceTests {

    private final BriefAnalysisService briefAnalysisService = new BriefAnalysisService();

    @Test
    void assignmentTaskKeepsCompulsoryDeliverablesAndExcludesSuggestedDomains() {
        String briefText = """
                Assignment task
                You are required to individually design, develop and document a web-based distributed application.

                Your assignment must include:
                1. A clear statement of the problem, target users and context.
                2. Research into multi-tier or distributed web systems and existing solutions.
                3. Functional and non-functional requirements.
                4. A system design including use cases and an N-tier architecture diagram.
                5. A functioning prototype demonstrating the essential functionality.
                6. Screenshots showing functionality, requirements fit, advantages and limitations.
                7. A critical reflection on learning, decisions and challenges.

                Suggested Real-world Problem Domains
                Smart campus navigation
                Public transport journey planner

                Your submission should include:
                A report of around 2,000 words and a link to the application.
                """;

        Assignment assignment = new Assignment(UUID.randomUUID());

        briefAnalysisService.populateAssignmentFields(assignment, briefText);

        String assignmentTask = assignment.getAssignmentTask();
        assertNotNull(assignmentTask);
        assertTrue(assignmentTask.contains("individually design, develop and document"));
        assertTrue(assignmentTask.contains("1. A clear statement of the problem"));
        assertTrue(assignmentTask.contains("7. A critical reflection"));
        assertFalse(assignmentTask.contains("Suggested Real-world Problem Domains"));
        assertFalse(assignmentTask.contains("Smart campus navigation"));
        assertFalse(assignmentTask.contains("Your submission should include"));
    }

    @Test
    void assignmentTaskStillStopsAtSubmissionWhenNoSuggestedSectionExists() {
        String briefText = """
                Assignment task
                Build and evaluate a secure web service.
                Your assignment must include:
                1. A working implementation.
                2. Evidence of testing.
                Your submission should include:
                A report and source-code link.
                """;

        Assignment assignment = new Assignment(UUID.randomUUID());

        briefAnalysisService.populateAssignmentFields(assignment, briefText);

        String assignmentTask = assignment.getAssignmentTask();
        assertNotNull(assignmentTask);
        assertTrue(assignmentTask.contains("Build and evaluate a secure web service"));
        assertTrue(assignmentTask.contains("2. Evidence of testing"));
        assertFalse(assignmentTask.contains("A report and source-code link"));
    }
}
