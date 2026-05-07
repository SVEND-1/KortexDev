package org.example.kortexdev.request.api.dto;

import org.example.kortexdev.request.db.RequestType;

public record RequestCreate(
        String name,
        String username,
        RequestType requestType
) {
}
