package com.elizabethadeleke.study_planner_backend.studysession;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PatchMapping;
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

        @PatchMapping("/api/assignments/{assignmentId}/study-sessions/{sessionId}/start")
    public StudySession startSession(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable UUID assignmentId,
            @PathVariable UUID sessionId) {

        UUID userId = UUID.fromString(jwt.getSubject());
        return studySessionService.startSession(userId, assignmentId, sessionId);
    }

        @PatchMapping("/api/assignments/{assignmentId}/study-sessions/{sessionId}/pause")
    public StudySession pauseSession(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable UUID assignmentId,
            @PathVariable UUID sessionId) {

        UUID userId = UUID.fromString(jwt.getSubject());
        return studySessionService.pauseSession(userId, assignmentId, sessionId);
    }

    @PatchMapping("/api/assignments/{assignmentId}/study-sessions/{sessionId}/resume")
    public StudySession resumeSession(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable UUID assignmentId,
            @PathVariable UUID sessionId) {

        UUID userId = UUID.fromString(jwt.getSubject());
        return studySessionService.resumeSession(userId, assignmentId, sessionId);
    }

    @PatchMapping("/api/assignments/{assignmentId}/study-sessions/{sessionId}/complete")
    public StudySession completeSession(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable UUID assignmentId,
            @PathVariable UUID sessionId) {

        UUID userId = UUID.fromString(jwt.getSubject());
        return studySessionService.completeSession(userId, assignmentId, sessionId);
    }

    @PatchMapping("/api/assignments/{assignmentId}/study-sessions/{sessionId}/notes")
    public StudySession updateSessionNotes(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable UUID assignmentId,
            @PathVariable UUID sessionId,
            @RequestBody UpdateSessionNotesRequest request) {

        UUID userId = UUID.fromString(jwt.getSubject());
        return studySessionService.updateSessionNotes(userId, assignmentId, sessionId, request.sessionNotes());
    }

    public record CreateStudySessionRequest(
            String sessionName,
            LocalDate sessionDate,
            String sessionGoal) {
    }

    public record UpdateSessionNotesRequest(String sessionNotes) {
}
}