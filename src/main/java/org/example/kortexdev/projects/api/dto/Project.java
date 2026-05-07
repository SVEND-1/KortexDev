package org.example.kortexdev.projects.api.dto;

import java.util.List;

public record Project(
        Long id,
        String name,
        List<String> images
) {
}
