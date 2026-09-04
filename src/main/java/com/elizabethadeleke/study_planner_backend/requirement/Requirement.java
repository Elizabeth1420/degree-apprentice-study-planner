package com.elizabethadeleke.study_planner_backend.requirement;

import java.time.OffsetDateTime;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "requirements", schema = "public")
public class Requirement {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "requirement_id", nullable = false)
    private UUID requirementId;

    @Column(name = "assignment_id", nullable = false)
    private UUID assignmentId;

    @Column(name = "requirement_text", columnDefinition = "text")
    private String requirementText;

    @Column(name = "source_passage", columnDefinition = "text")
    private String sourcePassage;

    @Column(name = "source_section")
    private String sourceSection;

    @Column(name = "ai_generated")
    private Boolean aiGenerated = false;

    @Column(name = "created_at", insertable = false, updatable = false)
    private OffsetDateTime createdAt;

    protected Requirement() {
    }

    public Requirement(UUID assignmentId, String requirementText, String sourcePassage, String sourceSection) {
        this.assignmentId = assignmentId;
        this.requirementText = requirementText;
        this.sourcePassage = sourcePassage;
        this.sourceSection = sourceSection;
        this.aiGenerated = false;
    }

    public UUID getRequirementId() { return requirementId; }
    public UUID getAssignmentId() { return assignmentId; }
    public String getRequirementText() { return requirementText; }
    public String getSourcePassage() { return sourcePassage; }
    public String getSourceSection() { return sourceSection; }
    public Boolean getAiGenerated() { return aiGenerated; }
    public OffsetDateTime getCreatedAt() { return createdAt; }
}