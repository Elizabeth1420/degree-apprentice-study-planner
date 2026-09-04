package com.elizabethadeleke.study_planner_backend.progress;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.elizabethadeleke.study_planner_backend.assignment.AssignmentService;
import com.elizabethadeleke.study_planner_backend.studysession.StudySession;
import com.elizabethadeleke.study_planner_backend.studysession.StudySessionRepository;
import com.elizabethadeleke.study_planner_backend.task.StudyTask;
import com.elizabethadeleke.study_planner_backend.task.StudyTaskRepository;

@Service
public class ProgressService {

    private final AssignmentService assignmentService;
    private final StudyTaskRepository studyTaskRepository;
    private final StudySessionRepository studySessionRepository;

    public ProgressService(
            AssignmentService assignmentService,
            StudyTaskRepository studyTaskRepository,
            StudySessionRepository studySessionRepository) {
        this.assignmentService = assignmentService;
        this.studyTaskRepository = studyTaskRepository;
        this.studySessionRepository = studySessionRepository;
    }

    @Transactional(readOnly = true)
    public AssignmentProgress getAssignmentProgress(UUID userId, UUID assignmentId) {
        assignmentService.getAssignment(userId, assignmentId);

        List<StudyTask> tasks = studyTaskRepository.findByAssignmentIdOrderByCreatedAtAsc(assignmentId);
        List<StudySession> sessions = studySessionRepository.findByAssignmentIdOrderBySessionDateAscCreatedAtAsc(assignmentId);

        int totalTasks = tasks.size();
        int completedTasks = countTasksByStatus(tasks, "COMPLETE");
        int approvedTasks = countTasksByApproval(tasks, "APPROVED");
        int suggestedTasks = countTasksByApproval(tasks, "SUGGESTED");

        int totalSessions = sessions.size();
        int plannedSessions = countSessionsByStatus(sessions, "PLANNED");
        int activeSessions = countSessionsByStatus(sessions, "ACTIVE");
        int completedSessions = countSessionsByStatus(sessions, "COMPLETED");

        int totalStudySeconds = sessions.stream()
                .map(StudySession::getDurationSeconds)
                .filter(Objects::nonNull)
                .mapToInt(Integer::intValue)
                .sum();

        int taskCompletionPercentage = totalTasks == 0
                ? 0
                : (int) Math.round((completedTasks * 100.0) / totalTasks);

        return new AssignmentProgress(
                assignmentId,
                totalTasks,
                completedTasks,
                approvedTasks,
                suggestedTasks,
                totalSessions,
                plannedSessions,
                activeSessions,
                completedSessions,
                totalStudySeconds,
                taskCompletionPercentage);
    }

    private int countTasksByStatus(List<StudyTask> tasks, String status) {
        return (int) tasks.stream()
                .filter(task -> status.equals(task.getTaskStatus()))
                .count();
    }

    private int countTasksByApproval(List<StudyTask> tasks, String status) {
        return (int) tasks.stream()
                .filter(task -> status.equals(task.getApprovalStatus()))
                .count();
    }

    private int countSessionsByStatus(List<StudySession> sessions, String status) {
        return (int) sessions.stream()
                .filter(session -> status.equals(session.getSessionStatus()))
                .count();
    }
}