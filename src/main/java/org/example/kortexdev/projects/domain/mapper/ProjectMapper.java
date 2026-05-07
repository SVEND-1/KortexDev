package org.example.kortexdev.projects.domain.mapper;

import org.example.kortexdev.projects.api.dto.Project;
import org.example.kortexdev.projects.db.ProjectEntity;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProjectMapper {
    Project convertEntityToDto(ProjectEntity entity);
    List<Project> convertEntityToDto(List<ProjectEntity> entities);
}
