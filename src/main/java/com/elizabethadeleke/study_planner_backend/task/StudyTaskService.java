package com.elizabethadeleke.study_planner_backend.task;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.elizabethadeleke.study_planner_backend.assignment.AssignmentService;
import com.elizabethadeleke.study_planner_backend.requirement.Requirement;
import com.elizabethadeleke.study_planner_backend.requirement.RequirementService;

@Service
public class StudyTaskService {

    private static final String AI = "AI";

    private final StudyTaskRepository studyTaskRepository;
    private final AssignmentService assignmentService;
    private final RequirementService requirementService;

    public StudyTaskService(
            StudyTaskRepository studyTaskRepository,
            AssignmentService assignmentService,
            RequirementService requirementService) {
        this.studyTaskRepository = studyTaskRepository;
        this.assignmentService = assignmentService;
        this.requirementService = requirementService;
    }

    @Transactional(readOnly = true)
    public List<StudyTask> listTasks(UUID userId, UUID assignmentId) {
        assignmentService.getAssignment(userId, assignmentId);
        return studyTaskRepository.findByAssignmentIdOrderByCreatedAtAsc(assignmentId);
    }

    @Transactional
    public List<StudyTask> generateTasks(UUID userId, UUID assignmentId) {
        assignmentService.getAssignment(userId, assignmentId);
        List<Requirement> requirements = requirementService.listRequirements(userId, assignmentId);

        studyTaskRepository.deleteByAssignmentIdAndOrigin(assignmentId, AI);

        List<StudyTask> tasks = new ArrayList<>();

        for (Requirement requirement : requirements) {
            tasks.add(new StudyTask(
                    assignmentId,
                    requirement.getRequirementId(),
                    buildTaskTitle(requirement),
                    requirement.getSourcePassage(),
                    requirement.getSourcePassage()));
        }

        return studyTaskRepository.saveAll(tasks);
    }

    private String buildTaskTitle(Requirement requirement) {
        return switch (requirement.getSourceSection()) {
            case "Assignment task" -> "Break down the assignment task";
            case "Assessment criteria" -> "Map work against the assessment criteria";
            case "Learning outcomes / KSBs" -> "Evidence the learning outcomes and KSBs";
            case "Referencing guidance" -> "Check referencing requirements";
            default -> requirement.getRequirementText();
        };
    }
}