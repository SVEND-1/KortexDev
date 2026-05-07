package org.example.kortexdev.request.db;

import org.example.kortexdev.reviews.db.ReviewsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RequestRepository extends JpaRepository<RequestEntity, Long> {
    @Query(value = "SELECT * FROM requests r LIMIT :count", nativeQuery = true)
    List<RequestEntity> findAllWithLimit(@Param("count") int count);
}
