package com.elizabethadeleke.study_planner_backend.sessiontask;
import com.elizabethadeleke.study_planner_backend.task.StudyTask;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.elizabethadeleke.study_planner_backend.assignment.AssignmentService;
import com.elizabethadeleke.study_planner_backend.studysession.StudySessionRepository;
import com.elizabethadeleke.study_planner_backend.task.StudyTaskRepository;

@Service
public class SessionTaskService {

    private final SessionTaskRepository sessionTaskRepository;
    private final AssignmentService assignmentService;
    private final StudySessionRepository studySessionRepository;
    private final StudyTaskRepository studyTaskRepository;

    public SessionTaskService(
            SessionTaskRepository sessionTaskRepository,
            AssignmentService assignmentService,
            StudySessionRepository studySessionRepository,
            StudyTaskRepository studyTaskRepository) {
        this.sessionTaskRepository = sessionTaskRepository;
        this.assignmentService = assignmentService;
        this.studySessionRepository = studySessionRepository;
        this.studyTaskRepository = studyTaskRepository;
    }

    @Transactional(readOnly = true)
    public List<SessionTask> listSessionTasks(UUID userId, UUID assignmentId, UUID sessionId) {
        validateSession(userId, assignmentId, sessionId);
        return sessionTaskRepository.findBySessionId(sessionId);
    }

    @Transactional
    public SessionTask addTaskToSession(UUID userId, UUID assignmentId, UUID sessionId, UUID taskId) {
        validateSession(userId, assignmentId, sessionId);
        validateTask(assignmentId, taskId);

        return sessionTaskRepository.findBySessionIdAndTaskId(sessionId, taskId)
                .orElseGet(() -> sessionTaskRepository.save(new SessionTask(sessionId, taskId)));
    }

    @Transactional
    public void removeTaskFromSession(UUID userId, UUID assignmentId, UUID sessionId, UUID taskId) {
        validateSession(userId, assignmentId, sessionId);
        validateTask(assignmentId, taskId);
        sessionTaskRepository.deleteBySessionIdAndTaskId(sessionId, taskId);
    }

    @Transactional
    public SessionTask updateTaskOutcome(
            UUID userId,
            UUID assignmentId,
            UUID sessionId,
            UUID taskId,
            String outcomeStatus,
            String outcome) {

        validateSession(userId, assignmentId, sessionId);

        StudyTask task = studyTaskRepository.findByTaskIdAndAssignmentId(taskId, assignmentId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found"));

        SessionTask sessionTask = sessionTaskRepository.findBySessionIdAndTaskId(sessionId, taskId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Session task link not found"));

        String cleanedOutcomeStatus = outcomeStatus == null || outcomeStatus.isBlank()
                ? null
                : outcomeStatus.trim().toUpperCase();

        if (cleanedOutcomeStatus != null
                && !cleanedOutcomeStatus.equals("COMPLETE")
                && !cleanedOutcomeStatus.equals("PARTIAL")
                && !cleanedOutcomeStatus.equals("INCOMPLETE")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Outcome status must be COMPLETE, PARTIAL, or INCOMPLETE");
        }

        sessionTask.setOutcomeStatus(cleanedOutcomeStatus);
        sessionTask.setOutcome(outcome == null || outcome.isBlank() ? null : outcome.trim());

        if ("COMPLETE".equals(cleanedOutcomeStatus)) {
            task.setTaskStatus("COMPLETE");
        } else if ("PARTIAL".equals(cleanedOutcomeStatus)) {
            task.setTaskStatus("IN_PROGRESS");
        } else if ("INCOMPLETE".equals(cleanedOutcomeStatus)) {
            task.setTaskStatus("TO_DO");
        }

        studyTaskRepository.save(task);
        return sessionTaskRepository.save(sessionTask);
    }

    private void validateSession(UUID userId, UUID assignmentId, UUID sessionId) {
        assignmentService.getAssignment(userId, assignmentId);

        studySessionRepository.findBySessionIdAndAssignmentId(sessionId, assignmentId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Study session not found"));
    }

    private void validateTask(UUID assignmentId, UUID taskId) {
        studyTaskRepository.findByTaskIdAndAssignmentId(taskId, assignmentId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found"));
    }
}