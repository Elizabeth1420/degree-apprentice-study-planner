package com.elizabethadeleke.study_planner_backend.assignment;

import java.math.BigDecimal;
import java.util.Optional;
import java.util.function.Consumer;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.stereotype.Service;

@Service
public class BriefAnalysisService {

    public void populateAssignmentFields(Assignment assignment, String briefText) {
        if (!hasText(briefText)) {
            return;
        }

        String flatText = briefText.replaceAll("\\s+", " ").trim();

        extractModuleCodeAndTitle(assignment, flatText);
        setIfPresent(assignment::setModuleLeader, extractBetween(flatText,
                "Module\\s+leader",
                "Assignment(?:\\s+No\\.)?\\s+and\\s+type"));

        setIfPresent(assignment::setAssignmentType, extractBetween(flatText,
                "Assignment(?:\\s+No\\.)?\\s+and\\s+type",
                "Assessment\\s+weighting"));

        extractAssignmentWeighting(assignment, flatText);

        setIfPresent(assignment::setAssignmentTask, extractSection(briefText,
                "Assignment\\s+task",
                "Assessment\\s+criteria", "Learning\\s+outcomes", "Referencing"));

        setIfPresent(assignment::setAssessmentCriteria, extractSection(briefText,
                "Assessment\\s+criteria",
                "Learning\\s+outcomes", "KSBs", "Referencing", "Assignment\\s+task"));

        setIfPresent(assignment::setLearningOutcomesKsbs, extractSection(briefText,
                "Learning\\s+outcomes(?:\\s*/\\s*KSBs)?|KSBs",
                "Referencing", "Assessment\\s+criteria", "Assignment\\s+task"));

        setIfPresent(assignment::setReferencingGuidance, extractSection(briefText,
                "Referencing(?:\\s+guidance)?",
                "Assessment\\s+criteria", "Learning\\s+outcomes", "Assignment\\s+task"));
    }

    private void extractModuleCodeAndTitle(Assignment assignment, String flatText) {
        Pattern pattern = Pattern.compile(
                "Module\\s+code\\s*&\\s*title:\\s*([A-Z]{2,}\\d{4})\\s+(.+?)\\s+Module\\s+leader:",
                Pattern.CASE_INSENSITIVE);

        Matcher matcher = pattern.matcher(flatText);

        if (matcher.find()) {
            assignment.setModuleCode(matcher.group(1).trim());
            assignment.setModuleTitle(matcher.group(2).trim());
        }
    }

    private void extractAssignmentWeighting(Assignment assignment, String flatText) {
        Pattern pattern = Pattern.compile(
                "Assessment\\s+weighting:\\s*(\\d+(?:\\.\\d+)?)\\s*%?",
                Pattern.CASE_INSENSITIVE);

        Matcher matcher = pattern.matcher(flatText);

        if (matcher.find()) {
            assignment.setAssignmentWeighting(new BigDecimal(matcher.group(1)));
        }
    }

    private Optional<String> extractBetween(String text, String startLabel, String endLabel) {
        Pattern pattern = Pattern.compile(
                startLabel + "\\s*:?\\s*(.+?)\\s+" + endLabel + "\\s*:?",
                Pattern.CASE_INSENSITIVE);

        Matcher matcher = pattern.matcher(text);
        return matcher.find() ? clean(matcher.group(1)) : Optional.empty();
    }

    private Optional<String> extractSection(String text, String startHeading, String... endHeadings) {
        String endPattern = String.join("|", endHeadings);

        Pattern pattern = Pattern.compile(
                "(?is)(?:^|\\R)\\s*(?:" + startHeading + ")\\s*:?\\s*(.*?)(?=\\R\\s*(?:"
                        + endPattern + ")\\s*:?|\\z)");

        Matcher matcher = pattern.matcher(text);
        return matcher.find() ? clean(matcher.group(1)) : Optional.empty();
    }

    private Optional<String> clean(String value) {
        if (!hasText(value)) {
            return Optional.empty();
        }

        return Optional.of(value.trim().replaceAll("[ \\t]+", " "));
    }

    private void setIfPresent(Consumer<String> setter, Optional<String> value) {
        value.ifPresent(setter);
    }

    private boolean hasText(String value) {
        return value != null && !value.trim().isEmpty();
    }
}