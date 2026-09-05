// TaskSuggestion.java
package com.elizabethadeleke.study_planner_backend.analysis;

public record TaskSuggestion(
        String sourceSection,
        String taskTitle,
        String taskDescription,
        String sourcePassage
) {
}