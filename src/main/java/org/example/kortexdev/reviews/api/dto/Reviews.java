package org.example.kortexdev.reviews.api.dto;

import java.time.LocalDate;

public record Reviews(
        Long id,
        String name,
        String review,
        LocalDate createAt
) {
}
