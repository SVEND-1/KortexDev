package org.example.kortexdev.request.api.dto;

import org.example.kortexdev.request.db.RequestType;

import java.time.LocalDateTime;

public record Request(
        Long id,
        String name,
        String username,
        RequestType requestType,
        LocalDateTime createAt
) {
}
