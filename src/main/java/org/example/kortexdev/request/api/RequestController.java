package org.example.kortexdev.request.api;

import lombok.RequiredArgsConstructor;
import org.example.kortexdev.request.api.dto.Request;
import org.example.kortexdev.request.api.dto.RequestCreate;
import org.example.kortexdev.request.domain.RequestService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/requests")
public class RequestController {
    private final RequestService requestService;


    @PostMapping
    public ResponseEntity<Request> review(@RequestBody RequestCreate review) {
        return ResponseEntity.ok(requestService.save(review));
    }

}
