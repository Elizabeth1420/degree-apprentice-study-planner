package com.elizabethadeleke.study_planner_backend.studysession;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface StudySessionRepository extends JpaRepository<StudySession, UUID> {
    List<StudySession> findByAssignmentIdOrderBySessionDateAscCreatedAtAsc(UUID assignmentId);
    Optional<StudySession> findBySessionIdAndAssignmentId(UUID sessionId, UUID assignmentId);
}