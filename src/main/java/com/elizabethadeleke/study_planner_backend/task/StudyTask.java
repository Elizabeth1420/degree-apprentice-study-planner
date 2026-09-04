package com.elizabethadeleke.study_planner_backend.task;

import java.time.OffsetDateTime;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tasks", schema = "public")
public class StudyTask {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "task_id", nullable = false)
    private UUID taskId;

    @Column(name = "assignment_id", nullable = false)
    private UUID assignmentId;

    @Column(name = "requirement_id")
    private UUID requirementId;

    @Column(name = "task_title")
    private String taskTitle;

    @Column(name = "task_description", columnDefinition = "text")
    private String taskDescription;

    @Column(name = "task_status")
    private String taskStatus = "TO_DO";

    @Column(name = "approval_status")
    private String approvalStatus = "SUGGESTED";

    @Column(name = "origin")
    private String origin = "AI";

    @Column(name = "source_passage", columnDefinition = "text")
    private String sourcePassage;

    @Column(name = "created_at", insertable = false, updatable = false)
    private OffsetDateTime createdAt;

    protected StudyTask() {
    }

    public StudyTask(UUID assignmentId, UUID requirementId, String taskTitle, String taskDescription, String sourcePassage) {
        this.assignmentId = assignmentId;
        this.requirementId = requirementId;
        this.taskTitle = taskTitle;
        this.taskDescription = taskDescription;
        this.sourcePassage = sourcePassage;
    }

    public UUID getTaskId() { return taskId; }
    public UUID getAssignmentId() { return assignmentId; }
    public UUID getRequirementId() { return requirementId; }
    public String getTaskTitle() { return taskTitle; }
    public String getTaskDescription() { return taskDescription; }
    public String getTaskStatus() { return taskStatus; }
    public String getApprovalStatus() { return approvalStatus; }
    public String getOrigin() { return origin; }
    public String getSourcePassage() { return sourcePassage; }
    public OffsetDateTime getCreatedAt() { return createdAt; }

    public void setTaskStatus(String taskStatus) {
        this.taskStatus = taskStatus;
    }

    public void setApprovalStatus(String approvalStatus) {
        this.approvalStatus = approvalStatus;
    }
}