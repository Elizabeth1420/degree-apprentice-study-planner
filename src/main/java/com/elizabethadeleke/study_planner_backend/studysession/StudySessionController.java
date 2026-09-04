package com.elizabethadeleke.study_planner_backend.studysession;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StudySessionController {

    private final StudySessionService studySessionService;

    public StudySessionController(StudySessionService studySessionService) {
        this.studySessionService = studySessionService;
    }

    @GetMapping("/api/assignments/{assignmentId}/study-sessions")
    public List<StudySession> listSessions(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable UUID assignmentId) {

        UUID userId = UUID.fromString(jwt.getSubject());
        return studySessionService.listSessions(userId, assignmentId);
    }

    @PostMapping("/api/assignments/{assignmentId}/study-sessions")
    public StudySession createSession(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable UUID assignmentId,
            @RequestBody CreateStudySessionRequest request) {

        UUID userId = UUID.fromString(jwt.getSubject());

        return studySessionService.createSession(
                userId,
                assignmentId,
                request.sessionName(),
                request.sessionDate(),
                request.sessionGoal());
    }

    public record CreateStudySessionRequest(
            String sessionName,
            LocalDate sessionDate,
            String sessionGoal) {
    }
}