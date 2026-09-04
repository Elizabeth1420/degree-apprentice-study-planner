package com.elizabethadeleke.study_planner_backend.studysession;

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
}