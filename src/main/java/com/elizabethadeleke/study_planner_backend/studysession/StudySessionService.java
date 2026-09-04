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
        session.setDurationSeconds(0);
        session.setTimerStatus(RUNNING);
        session.setSessionStatus(ACTIVE);

        return studySessionRepository.save(session);
    }

    @Transactional
    public StudySession stopSession(UUID userId, UUID assignmentId, UUID sessionId) {
        StudySession session = getSessionForAssignment(userId, assignmentId, sessionId);

        if (session.getStartTime() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Session has not been started");
        }

        OffsetDateTime finishedAt = OffsetDateTime.now();
        int durationSeconds = Math.toIntExact(Duration.between(session.getStartTime(), finishedAt).getSeconds());

        session.setEndTime(finishedAt);
        session.setDurationSeconds(durationSeconds);
        session.setTimerStatus(STOPPED);
        session.setSessionStatus(COMPLETED);

        return studySessionRepository.save(session);
    }

    private StudySession getSessionForAssignment(UUID userId, UUID assignmentId, UUID sessionId) {
        assignmentService.getAssignment(userId, assignmentId);

        return studySessionRepository.findBySessionIdAndAssignmentId(sessionId, assignmentId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Study session not found"));
    }

}