package org.example.kortexdev.reviews.api;

import lombok.RequiredArgsConstructor;
import org.example.kortexdev.reviews.api.dto.ReviewCreate;
import org.example.kortexdev.reviews.api.dto.Reviews;
import org.example.kortexdev.reviews.domain.ReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/reviews")
public class ReviewController {
    private final ReviewService reviewService;

    @GetMapping
    public ResponseEntity<List<Reviews>> reviews(@RequestParam(defaultValue = "10") Integer limit) {
        return ResponseEntity.ok(reviewService.findAll(limit));
    }

    @PostMapping
    public ResponseEntity<Reviews> review(@RequestBody ReviewCreate review) {
        return ResponseEntity.ok(reviewService.save(review));
    }
}
