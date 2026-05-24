package org.example.kortexdev.admin;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.example.kortexdev.projects.api.dto.Project;
import org.example.kortexdev.projects.api.dto.ProjectCreate;
import org.example.kortexdev.projects.domain.ProjectService;
import org.example.kortexdev.request.api.dto.Request;
import org.example.kortexdev.request.domain.RequestService;
import org.example.kortexdev.reviews.api.dto.Reviews;
import org.example.kortexdev.reviews.domain.ReviewService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin")
public class AdminController {
    private final ProjectService projectService;
    private final RequestService requestService;
    private final ReviewService reviewService;
    private final AuthenticationManager authenticationManager;

    @Value("${admin.password}")
    private String password;

    @Value("${admin.username}")
    private String username;

    @PostMapping("/login")//ТОЛЬКО ДЛЯ SWAGGER НА ФРОНТЕНДЕ ДЕЛАТЬ ПРОСТО ПО /login,а не /api/admin/login
    public ResponseEntity<?> login(
            @RequestParam String username,
            @RequestParam String password,
            HttpServletRequest request,
            HttpServletResponse response
    ) {
        if (this.username.equals(username) && this.password.equals(password)) {
            try {
                Set<SimpleGrantedAuthority> roles = Collections.singleton(new SimpleGrantedAuthority("ROLE_ADMIN"));
                Authentication authToken = new UsernamePasswordAuthenticationToken(username, null, roles);
                SecurityContextHolder.getContext().setAuthentication(authToken);

                HttpSession session = request.getSession(true);
                session.setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext());

                return ResponseEntity.ok(Map.of(
                        "success", true,
                        "message", "Успешно",
                        "sessionId", session.getId()
                ));

            } catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Ошибка: " + e.getMessage()));
            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("error", "Не верный пароль"));
    }


    @GetMapping("/project")
    public ResponseEntity<List<Project>> getProjects(
            @RequestParam(defaultValue = "10") int limit
    ) {
        return ResponseEntity.ok(projectService.findAll(limit));
    }

    @PostMapping(value = "/project", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Project> createProject(
            @RequestParam("name") String name,
            @RequestPart(value = "images", required = false) List<MultipartFile> images
    ){
        ProjectCreate request = new ProjectCreate(name,images);
        return ResponseEntity.ok(projectService.save(request));
    }

    @DeleteMapping("/project/{id}")
    public ResponseEntity<String> deleteProject(@PathVariable Long id){
        return ResponseEntity.ok(projectService.deleteById(id));
    }

    @GetMapping("/request")
    public ResponseEntity<List<Request>> getRequests(
            @RequestParam(defaultValue = "10") int limit
    ){
        return ResponseEntity.ok(requestService.findAll(limit));
    }

    @DeleteMapping("/request/{id}")
    public ResponseEntity<String> deleteRequests(@PathVariable Long id){
        return ResponseEntity.ok(requestService.deleteById(id));
    }

    @GetMapping("/reviews")
    public ResponseEntity<List<Reviews>> getReviews(
            @RequestParam(defaultValue = "10") int limit
    ){
        return ResponseEntity.ok(reviewService.findAll(limit));
    }

    @DeleteMapping("/reviews/{id}")
    public ResponseEntity<String> deleteReviews(@PathVariable Long id){
        return ResponseEntity.ok(reviewService.deleteById(id));
    }
}
