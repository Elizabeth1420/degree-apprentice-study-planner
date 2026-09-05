// AssignmentAnalysisResult.java
package com.elizabethadeleke.study_planner_backend.analysis;

import java.util.List;

public record AssignmentAnalysisResult(
        List<RequirementSuggestion> requirements,
        List<TaskSuggestion> tasks,
        List<String> successChecklist
) {
}