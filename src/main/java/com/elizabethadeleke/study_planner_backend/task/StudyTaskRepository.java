package com.elizabethadeleke.study_planner_backend.task;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface StudyTaskRepository extends JpaRepository<StudyTask, UUID> {
    List<StudyTask> findByAssignmentIdOrderByCreatedAtAsc(UUID assignmentId);
    void deleteByAssignmentIdAndOrigin(UUID assignmentId, String origin);
}