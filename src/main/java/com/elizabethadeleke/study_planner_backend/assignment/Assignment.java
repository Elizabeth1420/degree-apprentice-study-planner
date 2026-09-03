package com.elizabethadeleke.study_planner_backend.assignment;

import java.math.BigDecimal;
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
@Table(name = "assignments", schema = "public")
public class Assignment {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "assignment_id", nullable = false)
    private UUID assignmentId;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(name = "module_code")
    private String moduleCode;

    @Column(name = "module_title")
    private String moduleTitle;

    @Column(name = "module_leader")
    private String moduleLeader;

    @Column(name = "assignment_type")
    private String assignmentType;

    @Column(name = "assignment_weighting")
    private BigDecimal assignmentWeighting;

    @Column(name = "official_deadline")
    private LocalDate officialDeadline;

    @Column(name = "personal_target_date")
    private LocalDate personalTargetDate;

    @Column(name = "personal_assignment_goal")
    private String personalAssignmentGoal;

    @Column(name = "assignment_task")
    private String assignmentTask;

    @Column(name = "assessment_criteria")
    private String assessmentCriteria;

    @Column(name = "learning_outcomes_ksbs")
    private String learningOutcomesKsbs;

    @Column(name = "referencing_guidance")
    private String referencingGuidance;

    @Column(name = "created_at", insertable = false, updatable = false)
    private OffsetDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt;

    protected Assignment() {
    }

    public Assignment(UUID userId) {
        this.userId = userId;
    }

    @PrePersist
    @PreUpdate
    void updateTimestamp() {
        this.updatedAt = OffsetDateTime.now();
    }

    public UUID getAssignmentId() { return assignmentId; }
    public UUID getUserId() { return userId; }
    public String getModuleCode() { return moduleCode; }
    public void setModuleCode(String moduleCode) { this.moduleCode = moduleCode; }
    public String getModuleTitle() { return moduleTitle; }
    public void setModuleTitle(String moduleTitle) { this.moduleTitle = moduleTitle; }
    public String getModuleLeader() { return moduleLeader; }
    public void setModuleLeader(String moduleLeader) {this.moduleLeader = moduleLeader;}
    public String getAssignmentType() { return assignmentType; }
    public void setAssignmentType(String assignmentType) {this.assignmentType = assignmentType;}
    public BigDecimal getAssignmentWeighting() { return assignmentWeighting; }
    public void setAssignmentWeighting(BigDecimal assignmentWeighting) {this.assignmentWeighting = assignmentWeighting;}
    public String getAssignmentTask() { return assignmentTask; }
    public void setAssignmentTask(String assignmentTask) {this.assignmentTask = assignmentTask;}
    public String getAssessmentCriteria() { return assessmentCriteria; }
    public void setAssessmentCriteria(String assessmentCriteria) {this.assessmentCriteria = assessmentCriteria;}
    public String getLearningOutcomesKsbs() {return learningOutcomesKsbs; }
    public void setLearningOutcomesKsbs(String learningOutcomesKsbs) {this.learningOutcomesKsbs = learningOutcomesKsbs;}
    public String getReferencingGuidance() {return referencingGuidance; }
    public void setReferencingGuidance(String referencingGuidance) {this.referencingGuidance = referencingGuidance;}
    public LocalDate getOfficialDeadline() { return officialDeadline; }
    public void setOfficialDeadline(LocalDate officialDeadline) { this.officialDeadline = officialDeadline; }
    public LocalDate getPersonalTargetDate() { return personalTargetDate; }
    public void setPersonalTargetDate(LocalDate personalTargetDate) { this.personalTargetDate = personalTargetDate; }
    public String getPersonalAssignmentGoal() { return personalAssignmentGoal; }
    public void setPersonalAssignmentGoal(String personalAssignmentGoal) { this.personalAssignmentGoal = personalAssignmentGoal; }
    public OffsetDateTime getCreatedAt() { return createdAt; }
    public OffsetDateTime getUpdatedAt() { return updatedAt; }
}