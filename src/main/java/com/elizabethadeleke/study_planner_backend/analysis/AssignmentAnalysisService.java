package com.elizabethadeleke.study_planner_backend.analysis;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.stereotype.Service;

import com.elizabethadeleke.study_planner_backend.assignment.Assignment;

@Service
public class AssignmentAnalysisService {

    private static final Pattern NUMBERED_DELIVERABLE_PATTERN = Pattern.compile(
            "(?ms)(?:^|\\R)\\s*(\\d{1,2})[.)]\\s+(.+?)(?=(?:\\R\\s*\\d{1,2}[.)]\\s+)|\\z)");
    private static final Pattern INCLUDE_CUE_PATTERN = Pattern.compile(
            "(?is)\\b(?:must|will|should)\\s+include\\s*:\\s*(.+)\\z");
    private static final Pattern LETTERED_DELIVERABLE_PATTERN = Pattern.compile(
            "(?is)(?:^|\\s)([a-z])[.)]\\s+(.+?)(?=(?:\\s+[a-z][.)]\\s+)|\\z)");

    public AssignmentAnalysisResult analyseAssignment(Assignment assignment) {
        List<RequirementSuggestion> requirements = new ArrayList<>();

        addAssignmentTaskRequirements(requirements, assignment.getAssignmentTask());
        addRequirement(requirements, "Meet the assessment criteria", assignment.getAssessmentCriteria(), "Assessment criteria");
        addLearningOutcomeAndKsbRequirements(requirements, assignment.getLearningOutcomesKsbs());
        addRequirement(requirements, "Follow the referencing guidance", assignment.getReferencingGuidance(), "Referencing guidance");

        List<TaskSuggestion> tasks = requirements.stream()
                .map(this::buildTaskSuggestion)
                .toList();

        List<String> successChecklist = buildSuccessChecklist(assignment);

        return new AssignmentAnalysisResult(requirements, tasks, successChecklist);
    }

    private void addAssignmentTaskRequirements(
            List<RequirementSuggestion> requirements,
            String assignmentTask) {

        if (!hasText(assignmentTask)) {
            return;
        }

        List<NumberedDeliverable> deliverables = extractNumberedDeliverables(assignmentTask);

        if (deliverables.isEmpty()) {
            deliverables = extractLetteredDeliverables(assignmentTask);
        }

        if (deliverables.isEmpty()) {
            addRequirement(requirements, "Complete the assignment task", assignmentTask, "Assignment task");
            return;
        }

        for (NumberedDeliverable deliverable : deliverables) {
            addRequirement(
                    requirements,
                    "Complete required deliverable " + deliverable.number() + ": "
                            + removeTrailingPunctuation(deliverable.text()),
                    deliverable.text(),
                    "Assignment task");
        }
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
            case "Assignment task" -> buildAssignmentTaskTitle(fallbackTitle);
            case "Assessment criteria" -> "Map work against the assessment criteria";
            case "Learning outcomes / KSBs" -> "Evidence the learning outcomes and KSBs";
            case "Referencing guidance" -> "Check referencing requirements";
            default -> fallbackTitle;
        };
    }

    private String buildAssignmentTaskTitle(String requirementText) {
        String lowerText = requirementText.toLowerCase();

        if (lowerText.contains("ksb-mapped evidence") || lowerText.contains("ksb mapped evidence")) {
            return "Compile the KSB-mapped evidence portfolio";
        }

        if (lowerText.contains("action plan") || lowerText.contains("ppdp")) {
            return "Update the Action Plan (PPDP)";
        }

        if (lowerText.contains("problem") && lowerText.contains("target user")) {
            return "Define the problem, target users and context";
        }

        if (lowerText.contains("research") && lowerText.contains("existing solution")) {
            return "Research distributed web systems and existing solutions";
        }

        if (lowerText.contains("functional") && lowerText.contains("non-functional")) {
            return "Document functional and non-functional requirements";
        }

        if (lowerText.contains("system design") || lowerText.contains("architecture diagram")) {
            return "Create the system design and N-tier architecture diagram";
        }

        if (lowerText.contains("prototype")) {
            return "Build the functioning prototype";
        }

        if (lowerText.contains("screenshot") || lowerText.contains("design choice")) {
            return "Capture evidence and evaluate the design choices";
        }

        if (lowerText.contains("critical reflection") || lowerText.contains("reflect")) {
            return "Write the critical reflection";
        }

        return shortenTitle(requirementText);
    }

    private String buildTaskDescription(RequirementSuggestion requirement) {
    String preview = preview(requirement.sourcePassage());

    return switch (requirement.sourceSection()) {
        case "Assignment task" -> buildAssignmentTaskDescription(requirement.requirementText(), preview);
        case "Assessment criteria" -> "Turn the assessment criteria into a checklist for evaluating your work. Source: " + preview;
        case "Learning outcomes / KSBs" -> "Identify evidence that could show how your project meets the learning outcomes and KSBs. Source: " + preview;
        case "Referencing guidance" -> "Note the required referencing rules and check them before submission. Source: " + preview;
        default -> requirement.sourcePassage();
    };
}

    private String buildAssignmentTaskDescription(String requirementText, String sourcePreview) {
        String lowerText = requirementText.toLowerCase();

        if (lowerText.contains("ksb-mapped evidence") || lowerText.contains("ksb mapped evidence")) {
            return "Gather and organise evidence showing how your work demonstrates the relevant "
                    + "Knowledge, Skills and Behaviours, then map it to the requirements in the assignment brief. "
                    + "Source: " + sourcePreview;
        }

        return "Complete this compulsory deliverable from the assignment brief. Source: " + sourcePreview;
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

    private List<NumberedDeliverable> extractNumberedDeliverables(String value) {
        List<NumberedDeliverable> deliverables = new ArrayList<>();
        Matcher matcher = NUMBERED_DELIVERABLE_PATTERN.matcher(value);

        while (matcher.find()) {
            String text = matcher.group(2).trim().replaceAll("\\s+", " ");

            if (!text.isBlank()) {
                deliverables.add(new NumberedDeliverable(matcher.group(1), text));
            }
        }

        return deliverables;
    }

    private List<NumberedDeliverable> extractLetteredDeliverables(String value) {
        Matcher includeCueMatcher = INCLUDE_CUE_PATTERN.matcher(value);

        if (!includeCueMatcher.find()) {
            return List.of();
        }

        List<NumberedDeliverable> deliverables = new ArrayList<>();
        Matcher itemMatcher = LETTERED_DELIVERABLE_PATTERN.matcher(includeCueMatcher.group(1));
        char expectedLabel = 'a';

        while (itemMatcher.find()) {
            char itemLabel = Character.toLowerCase(itemMatcher.group(1).charAt(0));

            if (itemLabel != expectedLabel) {
                break;
            }

            String text = trimFollowingExplanation(
                    itemMatcher.group(2).trim().replaceAll("\\s+", " "));

            if (!text.isBlank()) {
                deliverables.add(new NumberedDeliverable(itemMatcher.group(1), text));
            }

            expectedLabel++;
        }

        return deliverables.size() > 1 ? deliverables : List.of();
    }

    private String trimFollowingExplanation(String value) {
        Matcher sentenceMatcher = Pattern.compile("^(.+?[.!?])(?:\\s+[A-Z]|$)").matcher(value);
        return sentenceMatcher.find() ? sentenceMatcher.group(1).trim() : value;
    }

    private String shortenTitle(String value) {
        String title = removeTrailingPunctuation(value.trim().replaceAll("\\s+", " "));

        if (title.length() <= 90) {
            return title;
        }

        return title.substring(0, 87).trim() + "...";
    }

    private String removeTrailingPunctuation(String value) {
        return value.replaceFirst("[.;:,]+$", "");
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

    private record NumberedDeliverable(String number, String text) {
    }
}
