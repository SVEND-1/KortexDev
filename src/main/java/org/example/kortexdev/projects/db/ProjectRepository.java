package org.example.kortexdev.projects.db;

import org.example.kortexdev.reviews.db.ReviewsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProjectRepository extends JpaRepository<ProjectEntity,Long> {

    @Query(value = "SELECT * FROM projects p LIMIT :count", nativeQuery = true)
    List<ProjectEntity> findAllWithLimit(@Param("count") int count);
}
