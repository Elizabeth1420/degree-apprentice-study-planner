package com.elizabethadeleke.study_planner_backend.studysession;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

@Entity
@Table(name = "study_sessions", schema = "public")
public class StudySession {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "session_id", nullable = false)
    private UUID sessionId;

    @Column(name = "assignment_id", nullable = false)
    private UUID assignmentId;

    @Column(name = "session_name")
    private String sessionName;

    @Column(name = "session_date", nullable = false)
    private LocalDate sessionDate;

    @Column(name = "session_goal", columnDefinition = "text")
    private String sessionGoal;

    @Column(name = "session_notes", columnDefinition = "text")
    private String sessionNotes;

    @Column(name = "start_time")
    private OffsetDateTime startTime;

    @Column(name = "end_time")
    private OffsetDateTime endTime;

    @Column(name = "duration_seconds")
    private Integer durationSeconds;

    @Column(name = "timer_status")
    private String timerStatus = "NOT_STARTED";

    @Column(name = "session_status")
    private String sessionStatus = "PLANNED";

    @Column(name = "created_at", insertable = false, updatable = false)
    private OffsetDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt;

    protected StudySession() {
    }

    public StudySession(UUID assignmentId, String sessionName, LocalDate sessionDate, String sessionGoal) {
        this.assignmentId = assignmentId;
        this.sessionName = sessionName;
        this.sessionDate = sessionDate;
        this.sessionGoal = sessionGoal;
    }

    @PrePersist
    @PreUpdate
    void updateTimestamp() {
        this.updatedAt = OffsetDateTime.now();
    }

    public UUID getSessionId() { return sessionId; }
    public UUID getAssignmentId() { return assignmentId; }
    public String getSessionName() { return sessionName; }
    public LocalDate getSessionDate() { return sessionDate; }
    public String getSessionGoal() { return sessionGoal; }
    public String getSessionNotes() { return sessionNotes; }
    public OffsetDateTime getStartTime() { return startTime; }
    public OffsetDateTime getEndTime() { return endTime; }
    public Integer getDurationSeconds() { return durationSeconds; }
    public String getTimerStatus() { return timerStatus; }
    public String getSessionStatus() { return sessionStatus; }
    public OffsetDateTime getCreatedAt() { return createdAt; }
    public OffsetDateTime getUpdatedAt() { return updatedAt; }
}