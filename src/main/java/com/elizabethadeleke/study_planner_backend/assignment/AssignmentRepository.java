package com.elizabethadeleke.study_planner_backend.assignment;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AssignmentRepository extends JpaRepository<Assignment, UUID> {

    List<Assignment> findByUserIdOrderByCreatedAtDesc(UUID userId);

    Optional<Assignment> findByAssignmentIdAndUserId(UUID assignmentId, UUID userId);
}