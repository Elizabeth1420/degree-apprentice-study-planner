package com.elizabethadeleke.study_planner_backend.assignment;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.Year;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.Locale;
import java.util.ArrayList;
import java.util.List;
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
        extractOfficialDeadline(assignment, briefText, flatText);

        setIfPresent(assignment::setAssignmentTask, extractCoreAssignmentTask(briefText));

        setIfPresent(assignment::setAssessmentCriteria, extractAssessmentCriteria(briefText));
        setIfPresent(assignment::setLearningOutcomesKsbs, extractLearningOutcomesAndKsbs(briefText));

        setIfPresent(assignment::setReferencingGuidance, extractSection(briefText,
                "Practicalities\\s*:\\s*Referencing,\\s*presenting\\s+and\\s+submitting\\s+your\\s+work|Referencing(?:\\s+guidance)?",
                "Confidentiality",
                "Academic\\s+integrity",
                "Categorical\\s+Mark\\s+and\\s+Grade",
                "Before\\s+submission\\s+checklist"));

        if (!hasText(assignment.getPersonalAssignmentGoal())) {
            setIfPresent(assignment::setPersonalAssignmentGoal, buildPersonalAssignmentGoal(briefText));
        }
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

    private void extractOfficialDeadline(Assignment assignment, String briefText, String flatText) {
    Optional<String> deadlineText = extractSection(briefText,
            "Submission\\s+time\\s+and\\s+date|Submission\\s+date|Official\\s+deadline|Deadline",
            "Target\\s+feedback\\s+time",
            "Assignment\\s+task",
            "Your\\s+submission\\s+should\\s+include",
            "Assessment\\s+Criteria",
            "Getting\\s+Support");

    if (deadlineText.isEmpty()) {
        deadlineText = extractBetween(flatText,
                "Submission\\s+time\\s+and\\s+date|Submission\\s+date|Official\\s+deadline|Deadline",
                "Target\\s+feedback\\s+time");
    }

    deadlineText
            .flatMap(this::parseDeadlineDate)
            .ifPresent(assignment::setOfficialDeadline);
}

private Optional<LocalDate> parseDeadlineDate(String value) {
    if (!hasText(value)) {
        return Optional.empty();
    }

    String cleanedValue = value
            .replaceAll("(?i)\\b(\\d{1,2})(st|nd|rd|th)\\b", "$1")
            .replace(",", " ")
            .replaceAll("\\s+", " ")
            .trim();

    Matcher numericMatcher = Pattern.compile("\\b(\\d{1,2})[/-](\\d{1,2})[/-](\\d{2,4})\\b")
            .matcher(cleanedValue);

    if (numericMatcher.find()) {
        String year = numericMatcher.group(3);

        if (year.length() == 2) {
            year = "20" + year;
        }

        return parseDate(numericMatcher.group(1) + "/" + numericMatcher.group(2) + "/" + year,
                DateTimeFormatter.ofPattern("d/M/uuuu"));
    }

    Matcher writtenDateWithYearMatcher = Pattern.compile("(?i)\\b(\\d{1,2})\\s+([A-Za-z]+)\\s+(\\d{4})\\b")
            .matcher(cleanedValue);

    if (writtenDateWithYearMatcher.find()) {
        String dateText = writtenDateWithYearMatcher.group(1) + " "
                + writtenDateWithYearMatcher.group(2) + " "
                + writtenDateWithYearMatcher.group(3);

        return parseWrittenDate(dateText);
    }

    Matcher writtenDateWithoutYearMatcher = Pattern.compile("(?i)\\b(\\d{1,2})\\s+([A-Za-z]+)\\b")
            .matcher(cleanedValue);

    if (writtenDateWithoutYearMatcher.find()) {
        String dateText = writtenDateWithoutYearMatcher.group(1) + " "
                + writtenDateWithoutYearMatcher.group(2) + " "
                + Year.now().getValue();

        return parseWrittenDate(dateText);
    }

    return Optional.empty();
}

private Optional<LocalDate> parseWrittenDate(String value) {
    List<DateTimeFormatter> formatters = List.of(
            DateTimeFormatter.ofPattern("d MMMM uuuu", Locale.UK),
            DateTimeFormatter.ofPattern("d MMM uuuu", Locale.UK));

    for (DateTimeFormatter formatter : formatters) {
        Optional<LocalDate> parsedDate = parseDate(value, formatter);

        if (parsedDate.isPresent()) {
            return parsedDate;
        }
    }

    return Optional.empty();
}

private Optional<LocalDate> parseDate(String value, DateTimeFormatter formatter) {
    try {
        return Optional.of(LocalDate.parse(value, formatter));
    } catch (DateTimeParseException exception) {
        return Optional.empty();
    }
}

    private Optional<String> extractAssessmentCriteria(String text) {
        return extractSection(text,
                "Categorical\\s+Mark\\s+and\\s+Grade|Criterion\\s+1\\s+[–-]\\s+Research",
                "Before\\s+submission\\s+checklist");
    }

    private Optional<String> extractCoreAssignmentTask(String text) {
        return extractSection(text,
                "Assignment\\s+task",
                "Suggested\\s+(?:Real[-\\s]?world\\s+)?Problem\\s+Domains",
                "Suggested\\s+(?:Topics|Project\\s+Ideas|Examples)",
                "Example\\s+(?:Topics|Projects|Domains)",
                "Optional\\s+(?:Topics|Project\\s+Ideas|Examples)",
                "Your\\s+submission\\s+should\\s+include",
                "Getting\\s+Support",
                "This\\s+assignment\\s+has\\s+been\\s+designed",
                "Categorical\\s+Mark\\s+and\\s+Grade")
                .map(this::normaliseExtractedSection);
    }

    private Optional<String> extractLearningOutcomesAndKsbs(String text) {
        Optional<String> learningOutcomes = extractSection(text,
                "This\\s+assignment\\s+has\\s+been\\s+designed\\s+to\\s+provide\\s+you\\s+with\\s+an\\s+opportunity\\s+to\\s+demonstrate\\s+your\\s+achievement\\s+of\\s+the\\s+following\\s+module\\s+learning\\s+outcomes",
                "This\\s+assignment\\s+also\\s+provides",
                "Practicalities",
                "Confidentiality");

        Optional<String> ksbs = extractSection(text,
                "This\\s+assignment\\s+also\\s+provides\\s+you\\s+with\\s+an\\s+opportunity\\s+to\\s+demonstrate\\s+your\\s+achievement\\s+of\\s+the\\s+following\\s+Knowledge,\\s*Skills,\\s*Values\\s+and\\s+Behaviours",
                "Practicalities",
                "Confidentiality",
                "Academic\\s+integrity");

        List<String> sections = new ArrayList<>();

        learningOutcomes.ifPresent(value -> sections.add("Learning outcomes:\n" + value));
        ksbs.ifPresent(value -> sections.add("KSBs:\n" + value));

        return sections.isEmpty() ? Optional.empty() : Optional.of(String.join("\n\n", sections));
    }

    private Optional<String> buildPersonalAssignmentGoal(String text) {
        Optional<String> submissionChecklist = extractSection(text,
                "Before\\s+submission\\s+checklist");

        if (submissionChecklist.isPresent()) {
            return Optional.of("Complete a functioning N-tier web application prototype and use the submission checklist to evidence requirements, design, implementation, testing, evaluation and reflection.");
        }

        return Optional.empty();
    }

    private Optional<String> extractBetween(String text, String startLabel, String endLabel) {
        Pattern pattern = Pattern.compile(
                startLabel + "\\s*:?\\s*(.+?)\\s+" + endLabel + "\\s*:?",
                Pattern.CASE_INSENSITIVE);

        Matcher matcher = pattern.matcher(text);
        return matcher.find() ? clean(matcher.group(1)) : Optional.empty();
    }

    private Optional<String> extractSection(String text, String startHeading, String... endHeadings) {
        String endPattern = endHeadings.length == 0
                ? "\\z"
                : "\\R\\s*(?:" + String.join("|", endHeadings) + ")\\s*:?|\\z";

        Pattern pattern = Pattern.compile(
                "(?is)(?:^|\\R)\\s*(?:" + startHeading + ")\\s*:?\\s*(.*?)(?=" + endPattern + ")");

        Matcher matcher = pattern.matcher(text);
        return matcher.find() ? clean(matcher.group(1)) : Optional.empty();
    }

    private Optional<String> clean(String value) {
        if (!hasText(value)) {
            return Optional.empty();
        }

        return Optional.of(value.trim().replaceAll("[ \\t]+", " "));
    }

    private String normaliseExtractedSection(String value) {
        return value
                .replace("\r\n", "\n")
                .replace('\r', '\n')
                .replaceAll("(?m)[ \\t]+$", "")
                .replaceAll("\n{3,}", "\n\n")
                .trim();
    }

    private void setIfPresent(Consumer<String> setter, Optional<String> value) {
        value.ifPresent(setter);
    }

    private boolean hasText(String value) {
        return value != null && !value.trim().isEmpty();
    }
}
