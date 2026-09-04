package com.elizabethadeleke.study_planner_backend.studysession;

import java.time.Duration;
import java.time.OffsetDateTime;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;


import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.elizabethadeleke.study_planner_backend.assignment.AssignmentService;

@Service
public class StudySessionService {

    private static final String RUNNING = "RUNNING";
    private static final String PAUSED = "PAUSED";
    private static final String STOPPED = "STOPPED";
    private static final String ACTIVE = "ACTIVE";
    private static final String COMPLETED = "COMPLETED";
    private final StudySessionRepository studySessionRepository;
    private final AssignmentService assignmentService;

    public StudySessionService(
            StudySessionRepository studySessionRepository,
            AssignmentService assignmentService) {
        this.studySessionRepository = studySessionRepository;
        this.assignmentService = assignmentService;
    }

    @Transactional(readOnly = true)
    public List<StudySession> listSessions(UUID userId, UUID assignmentId) {
        assignmentService.getAssignment(userId, assignmentId);
        return studySessionRepository.findByAssignmentIdOrderBySessionDateAscCreatedAtAsc(assignmentId);
    }

    @Transactional
    public StudySession createSession(
            UUID userId,
            UUID assignmentId,
            String sessionName,
            LocalDate sessionDate,
            String sessionGoal) {

        assignmentService.getAssignment(userId, assignmentId);

        if (sessionDate == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Session date is required");
        }

        StudySession studySession = new StudySession(
                assignmentId,
                sessionName,
                sessionDate,
                sessionGoal);

        return studySessionRepository.save(studySession);
    }

    @Transactional
    public StudySession startSession(UUID userId, UUID assignmentId, UUID sessionId) {
        StudySession session = getSessionForAssignment(userId, assignmentId, sessionId);

        if (RUNNING.equals(session.getTimerStatus())) {
            return session;
        }

        if (COMPLETED.equals(session.getSessionStatus())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Completed sessions cannot be restarted");
        }

        session.setStartTime(OffsetDateTime.now());
        session.setEndTime(null);

        if (session.getDurationSeconds() == null) {
            session.setDurationSeconds(0);
        }

        session.setTimerStatus(RUNNING);
        session.setSessionStatus(ACTIVE);

        return studySessionRepository.save(session);
    }

        @Transactional
    public StudySession pauseSession(UUID userId, UUID assignmentId, UUID sessionId) {
        StudySession session = getSessionForAssignment(userId, assignmentId, sessionId);

        if (!RUNNING.equals(session.getTimerStatus())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Only running sessions can be paused");
        }

        OffsetDateTime pausedAt = OffsetDateTime.now();
        session.setDurationSeconds(calculateDurationSeconds(session, pausedAt));
        session.setStartTime(null);
        session.setEndTime(null);
        session.setTimerStatus(PAUSED);
        session.setSessionStatus(ACTIVE);

        return studySessionRepository.save(session);
    }

    @Transactional
    public StudySession resumeSession(UUID userId, UUID assignmentId, UUID sessionId) {
        StudySession session = getSessionForAssignment(userId, assignmentId, sessionId);

        if (!PAUSED.equals(session.getTimerStatus())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Only paused sessions can be resumed");
        }

        session.setStartTime(OffsetDateTime.now());
        session.setEndTime(null);
        session.setTimerStatus(RUNNING);
        session.setSessionStatus(ACTIVE);

        return studySessionRepository.save(session);
    }

    @Transactional
    public StudySession completeSession(UUID userId, UUID assignmentId, UUID sessionId) {
        StudySession session = getSessionForAssignment(userId, assignmentId, sessionId);

        OffsetDateTime completedAt = OffsetDateTime.now();

        if (RUNNING.equals(session.getTimerStatus())) {
            session.setDurationSeconds(calculateDurationSeconds(session, completedAt));
        }

        session.setEndTime(completedAt);
        session.setStartTime(null);
        session.setTimerStatus(STOPPED);
        session.setSessionStatus(COMPLETED);

        return studySessionRepository.save(session);
    }

        private int calculateDurationSeconds(StudySession session, OffsetDateTime finishedAt) {
        int existingDuration = session.getDurationSeconds() == null ? 0 : session.getDurationSeconds();

        if (session.getStartTime() == null) {
            return existingDuration;
        }

        return existingDuration + Math.toIntExact(Duration.between(session.getStartTime(), finishedAt).getSeconds());
    }
    
    private StudySession getSessionForAssignment(UUID userId, UUID assignmentId, UUID sessionId) {
        assignmentService.getAssignment(userId, assignmentId);

        return studySessionRepository.findBySessionIdAndAssignmentId(sessionId, assignmentId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Study session not found"));
    }

}