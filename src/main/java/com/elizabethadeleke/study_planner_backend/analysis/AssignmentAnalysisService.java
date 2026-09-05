package com.elizabethadeleke.study_planner_backend.analysis;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.elizabethadeleke.study_planner_backend.assignment.Assignment;

@Service
public class AssignmentAnalysisService {

    public AssignmentAnalysisResult analyseAssignment(Assignment assignment) {
        List<RequirementSuggestion> requirements = new ArrayList<>();

        addRequirement(requirements, "Complete the assignment task", assignment.getAssignmentTask(), "Assignment task");
        addRequirement(requirements, "Meet the assessment criteria", assignment.getAssessmentCriteria(), "Assessment criteria");
        addLearningOutcomeAndKsbRequirements(requirements, assignment.getLearningOutcomesKsbs());
        addRequirement(requirements, "Follow the referencing guidance", assignment.getReferencingGuidance(), "Referencing guidance");

        List<TaskSuggestion> tasks = requirements.stream()
                .map(this::buildTaskSuggestion)
                .toList();

        List<String> successChecklist = buildSuccessChecklist(assignment);

        return new AssignmentAnalysisResult(requirements, tasks, successChecklist);
    }

    private void addRequirement(
            List<RequirementSuggestion> requirements,
            String requirementText,
            String sourcePassage,
            String sourceSection) {

        if (hasText(sourcePassage)) {
            requirements.add(new RequirementSuggestion(requirementText, sourcePassage.trim(), sourceSection));
        }
    }

        private void addLearningOutcomeAndKsbRequirements(
            List<RequirementSuggestion> requirements,
            String learningOutcomesKsbs) {

        if (!hasText(learningOutcomesKsbs)) {
            return;
        }

        List<String> points = splitIntoPoints(learningOutcomesKsbs);

        if (points.isEmpty()) {
            addRequirement(
                    requirements,
                    "Address the learning outcomes and KSBs",
                    learningOutcomesKsbs,
                    "Learning outcomes / KSBs");
            return;
        }

        for (String point : points) {
            String lowerPoint = point.toLowerCase();

            if (lowerPoint.contains("knowledge:")
                    || lowerPoint.contains("skills:")
                    || lowerPoint.contains("values and behaviours:")
                    || lowerPoint.matches(".*\\b[ksb]\\d+\\b.*")) {
                addRequirement(
                        requirements,
                        "Evidence KSB: " + point,
                        point,
                        "Learning outcomes / KSBs");
            } else {
                addRequirement(
                        requirements,
                        "Evidence learning outcome: " + point,
                        point,
                        "Learning outcomes / KSBs");
            }
        }
    }

    private TaskSuggestion buildTaskSuggestion(RequirementSuggestion requirement) {
    return new TaskSuggestion(
            requirement.sourceSection(),
            buildTaskTitle(requirement.sourceSection(), requirement.requirementText()),
            buildTaskDescription(requirement),
            requirement.sourcePassage());
}

    private String buildTaskTitle(String sourceSection, String fallbackTitle) {
        return switch (sourceSection) {
            case "Assignment task" -> "Break down the assignment task";
            case "Assessment criteria" -> "Map work against the assessment criteria";
            case "Learning outcomes / KSBs" -> "Evidence the learning outcomes and KSBs";
            case "Referencing guidance" -> "Check referencing requirements";
            default -> fallbackTitle;
        };
    }

    private String buildTaskDescription(RequirementSuggestion requirement) {
    String preview = preview(requirement.sourcePassage());

    return switch (requirement.sourceSection()) {
        case "Assignment task" -> "Review the assignment task and break it into smaller delivery steps. Source: " + preview;
        case "Assessment criteria" -> "Turn the assessment criteria into a checklist for evaluating your work. Source: " + preview;
        case "Learning outcomes / KSBs" -> "Identify evidence that could show how your project meets the learning outcomes and KSBs. Source: " + preview;
        case "Referencing guidance" -> "Note the required referencing rules and check them before submission. Source: " + preview;
        default -> requirement.sourcePassage();
    };
}

private List<String> buildSuccessChecklist(Assignment assignment) {
    List<String> checklist = new ArrayList<>();

    if (hasText(assignment.getAssignmentTask())) {
        checklist.add("Identify the problem, target users, context, and final prototype evidence required by the assignment task.");
    }

    if (hasText(assignment.getAssessmentCriteria())) {
        checklist.add("Use the assessment criteria as a checklist before writing the final report.");
    }

    if (hasText(assignment.getLearningOutcomesKsbs())) {
        checklist.add("Map your implementation and reflection evidence against the learning outcomes and KSBs.");
    }

    if (hasText(assignment.getReferencingGuidance())) {
        checklist.add("Check the required referencing style and apply it consistently before submission.");
    }

    if (hasText(assignment.getPersonalAssignmentGoal())) {
        checklist.add("Keep your personal assignment goal visible when planning study sessions and reviewing progress.");
    }

    if (checklist.isEmpty()) {
        checklist.add("Upload or paste an assignment brief so the planner can suggest success checklist items.");
    }

    return checklist;
}

    private List<String> splitIntoPoints(String value) {
        if (!hasText(value)) {
            return List.of();
        }

        String normalisedValue = value
                .replace("Learning outcomes:", "")
                .replace("KSBs:", "")
                .trim();

        List<String> points = new ArrayList<>();

        for (String part : normalisedValue.split("\\R|;|•")) {
            String point = part.trim().replaceAll("\\s+", " ");

            if (point.isBlank()) {
                continue;
            }

            points.add(point);
        }

        return points;
    }

private String preview(String value) {
    if (!hasText(value)) {
        return "";
    }

    String cleanValue = value.trim().replaceAll("\\s+", " ");

    if (cleanValue.length() <= 180) {
        return cleanValue;
    }

    return cleanValue.substring(0, 180) + "...";
}

    private boolean hasText(String value) {
        return value != null && !value.trim().isEmpty();
    }
}
