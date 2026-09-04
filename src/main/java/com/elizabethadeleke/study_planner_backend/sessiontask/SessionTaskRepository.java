package com.elizabethadeleke.study_planner_backend.sessiontask;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SessionTaskRepository extends JpaRepository<SessionTask, UUID> {
    List<SessionTask> findBySessionId(UUID sessionId);
    Optional<SessionTask> findBySessionIdAndTaskId(UUID sessionId, UUID taskId);
    void deleteBySessionIdAndTaskId(UUID sessionId, UUID taskId);
    void deleteByTaskId(UUID taskId);
}