package com.elizabethadeleke.study_planner_backend.progress;

import java.util.UUID;

public record AssignmentProgress(
        UUID assignmentId,
        int totalTasks,
        int completedTasks,
        int approvedTasks,
        int suggestedTasks,
        int totalSessions,
        int plannedSessions,
        int activeSessions,
        int completedSessions,
        int totalStudySeconds,
        int taskCompletionPercentage) {
}