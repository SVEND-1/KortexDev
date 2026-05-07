package org.example.kortexdev.projects.api.dto;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public record ProjectCreate(
        String name,
        List<MultipartFile> images
) {
}
