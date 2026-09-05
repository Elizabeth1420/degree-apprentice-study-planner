package com.elizabethadeleke.study_planner_backend.sessiontask;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "session_tasks", schema = "public")
public class SessionTask {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "session_task_id", nullable = false)
    private UUID sessionTaskId;

    @Column(name = "session_id", nullable = false)
    private UUID sessionId;

    @Column(name = "task_id", nullable = false)
    private UUID taskId;

    @Column(name = "outcome", columnDefinition = "text")
    private String outcome;

    @Column(name = "outcome_status")
    private String outcomeStatus;

    protected SessionTask() {
    }

    public SessionTask(UUID sessionId, UUID taskId) {
        this.sessionId = sessionId;
        this.taskId = taskId;
    }

    public UUID getSessionTaskId() {
        return sessionTaskId;
    }

    public UUID getSessionId() {
        return sessionId;
    }

    public UUID getTaskId() {
        return taskId;
    }

    public String getOutcome() {
        return outcome;
    }

    public void setOutcome(String outcome) {
        this.outcome = outcome;
    }

    public String getOutcomeStatus() {
        return outcomeStatus;
    }

    public void setOutcomeStatus(String outcomeStatus) {
        this.outcomeStatus = outcomeStatus;
    }
}