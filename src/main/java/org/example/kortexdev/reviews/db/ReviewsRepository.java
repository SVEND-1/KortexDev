package org.example.kortexdev.reviews.db;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewsRepository extends JpaRepository<ReviewsEntity,Long> {

    @Query(value = "SELECT * FROM reviews r LIMIT :count", nativeQuery = true)
    List<ReviewsEntity> findAllWithLimit(@Param("count") int count);
}
