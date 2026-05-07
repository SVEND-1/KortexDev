package org.example.kortexdev.reviews.domain;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.kortexdev.reviews.api.dto.ReviewCreate;
import org.example.kortexdev.reviews.api.dto.Reviews;
import org.example.kortexdev.reviews.db.ReviewsEntity;
import org.example.kortexdev.reviews.db.ReviewsRepository;
import org.example.kortexdev.reviews.domain.mapper.ReviewMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class ReviewService {

    private final ReviewsRepository reviewsRepository;
    private final ReviewMapper reviewMapper;

    public List<Reviews> findAll(Integer limit) {
        return reviewMapper.convertEntityToDto(reviewsRepository.findAllWithLimit(limit));
    }

    public Reviews findById(Long id) {
        return reviewMapper.convertEntityToDto(
                reviewsRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Review не найден"))
        );
    }

    public Reviews save(ReviewCreate request) {
        try {
            ReviewsEntity review = ReviewsEntity.builder()
                    .name(request.name())
                    .review(request.review())
                    .createAt(LocalDate.now())
                    .build();
            return reviewMapper.convertEntityToDto(
                    reviewsRepository.save(review)
            );
        }catch (Exception e) {
            log.error("Не удалось создать review,ex={}",e.getMessage());
            throw new RuntimeException(e);
        }
    }

    public String deleteById(Long id) {
        try {
            reviewsRepository.deleteById(id);
            return "Успешно";
        }catch (Exception e) {
            log.error("Не удалось удалить review,ex={}",e.getMessage());
            throw new RuntimeException(e);
        }
    }
}
