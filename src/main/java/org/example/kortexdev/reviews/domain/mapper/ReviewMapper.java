package org.example.kortexdev.reviews.domain.mapper;

import org.example.kortexdev.reviews.api.dto.ReviewCreate;
import org.example.kortexdev.reviews.api.dto.Reviews;
import org.example.kortexdev.reviews.db.ReviewsEntity;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ReviewMapper {

    Reviews convertEntityToDto(ReviewsEntity entity);
    List<Reviews> convertEntityToDto(List<ReviewsEntity> entities);
    ReviewCreate convertEntityToCreateDto(ReviewsEntity entity);
}
