// RequirementSuggestion.java
package com.elizabethadeleke.study_planner_backend.analysis;

public record RequirementSuggestion(
        String requirementText,
        String sourcePassage,
        String sourceSection
) {
}