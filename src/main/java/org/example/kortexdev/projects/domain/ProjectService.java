package org.example.kortexdev.projects.domain;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.kortexdev.projects.api.dto.Project;
import org.example.kortexdev.projects.api.dto.ProjectCreate;
import org.example.kortexdev.projects.db.ProjectEntity;
import org.example.kortexdev.projects.db.ProjectRepository;
import org.example.kortexdev.projects.domain.mapper.ProjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Service
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final ProjectMapper projectMapper;

    public List<Project> findAll(Integer limit) {
        return projectMapper.convertEntityToDto(projectRepository.findAllWithLimit(limit));
    }

    public Project findById(Long id) {
        return projectMapper.convertEntityToDto(
                projectRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Review не найден"))
        );
    }

    @Transactional
    public Project save(ProjectCreate request) {
        try {
            List<String> strings = request.images()
                    .stream()
                    .map(el -> {
                        return "uploads/project/" + saveImage(el);
                    })
                    .toList();

            ProjectEntity project = ProjectEntity.builder()
                    .name(request.name())
                    .images(strings)
                    .build();
            return projectMapper.convertEntityToDto(
                    projectRepository.save(project)
            );
        }catch (Exception e) {
            log.error("Не удалось создать review,ex={}",e.getMessage());
            throw new RuntimeException(e);
        }
    }

    @Transactional
    public String deleteById(Long id) {
        try {
            Project project = findById(id);

            for(String imageName : project.images()) {
                deleteImage(imageName);
            }

            projectRepository.deleteById(id);
            return "Успешно";
        }catch (Exception e) {
            log.error("Не удалось удалить review,ex={}",e.getMessage());
            throw new RuntimeException(e);
        }
    }

    private String saveImage(MultipartFile imageFile) {
        try {
            String fileName = UUID.randomUUID() + "_" + imageFile.getOriginalFilename();
            Path uploadPath = Paths.get("uploads/project/");

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            Path filePath = uploadPath.resolve(fileName);
            Files.copy(imageFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            return fileName;
        }catch (IOException e){
            log.error("Не удалось сохранить картинку,ex={}",e.getMessage());
            throw new RuntimeException(e);
        }
    }

    private void deleteImage(String imageName) throws IOException {
        try {
        if (imageName != null && !imageName.trim().isEmpty()) {
            Path imagePath = Paths.get("uploads/project/", imageName);

            if (Files.exists(imagePath)) {
                Files.delete(imagePath);
                System.out.println("Изображение удалено: " + imageName);
            } else {
                System.out.println("Файл не найден: " + imageName);
            }
        }
        }catch (IOException e) {
            log.error("Не удалось удалить картинку,ex={}", e.getMessage());
            throw new RuntimeException(e);
        }
    }
}