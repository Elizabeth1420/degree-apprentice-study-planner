package com.elizabethadeleke.study_planner_backend.task;

import java.util.List;
import java.util.UUID;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StudyTaskController {

    private final StudyTaskService studyTaskService;

    public StudyTaskController(StudyTaskService studyTaskService) {
        this.studyTaskService = studyTaskService;
    }

    @GetMapping("/api/assignments/{assignmentId}/tasks")
    public List<StudyTask> listTasks(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable UUID assignmentId) {

        UUID userId = UUID.fromString(jwt.getSubject());
        return studyTaskService.listTasks(userId, assignmentId);
    }

    @PostMapping("/api/assignments/{assignmentId}/tasks/generate")
    public List<StudyTask> generateTasks(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable UUID assignmentId) {

        UUID userId = UUID.fromString(jwt.getSubject());
        return studyTaskService.generateTasks(userId, assignmentId);
    }
}