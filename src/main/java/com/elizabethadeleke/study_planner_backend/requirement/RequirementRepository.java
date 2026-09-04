package com.elizabethadeleke.study_planner_backend.requirement;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RequirementRepository extends JpaRepository<Requirement, UUID> {
    List<Requirement> findByAssignmentIdOrderByCreatedAtAsc(UUID assignmentId);
    void deleteByAssignmentId(UUID assignmentId);
}