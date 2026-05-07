package org.example.kortexdev.request.domain.mapper;

import org.example.kortexdev.request.api.dto.Request;
import org.example.kortexdev.request.db.RequestEntity;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface RequestMapper {
    Request convertEntityToDto(RequestEntity entity);
    List<Request> convertEntityToDto(List<RequestEntity> entities);
}
