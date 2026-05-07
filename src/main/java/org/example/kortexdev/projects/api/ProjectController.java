package org.example.kortexdev.projects.api;

import lombok.RequiredArgsConstructor;
import org.example.kortexdev.projects.api.dto.Project;
import org.example.kortexdev.projects.domain.ProjectService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;

    @GetMapping
    public ResponseEntity<List<Project>> getProjects(
            @RequestParam(defaultValue = "8") Integer limit
    ) {
        return ResponseEntity.ok(projectService.findAll(limit));
    }
}
