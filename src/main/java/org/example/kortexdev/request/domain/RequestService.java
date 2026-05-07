package org.example.kortexdev.request.domain;


import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.kortexdev.request.api.dto.Request;
import org.example.kortexdev.request.api.dto.RequestCreate;
import org.example.kortexdev.request.db.RequestEntity;
import org.example.kortexdev.request.db.RequestRepository;
import org.example.kortexdev.request.domain.mapper.RequestMapper;
import org.example.kortexdev.reviews.api.dto.ReviewCreate;
import org.example.kortexdev.reviews.api.dto.Reviews;
import org.example.kortexdev.reviews.db.ReviewsEntity;
import org.example.kortexdev.reviews.db.ReviewsRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class RequestService {
    private final RequestRepository requestRepository;
    private final RequestMapper requestMapper;

    public List<Request> findAll(Integer limit) {
        return requestMapper.convertEntityToDto(
                requestRepository.findAllWithLimit(limit)
        );
    }

    public Request findById(Long id) {
        return requestMapper.convertEntityToDto(
                requestRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Review не найден"))
        );
    }

    public Request save(RequestCreate request) {
        try {
            RequestEntity requestEntity = RequestEntity.builder()
                    .name(request.name())
                    .username(request.username())
                    .requestType(request.requestType())
                    .createdAt(LocalDateTime.now())
                    .build();
            return requestMapper.convertEntityToDto(
                    requestRepository.save(requestEntity)
            );
        }catch (Exception e) {
            log.error("Не удалось создать review,ex={}",e.getMessage());
            throw new RuntimeException(e);
        }
    }

    public String deleteById(Long id) {
        try {
            requestRepository.deleteById(id);
            return "Успешно";
        }catch (Exception e) {
            log.error("Не удалось удалить review,ex={}",e.getMessage());
            throw new RuntimeException(e);
        }
    }
}
