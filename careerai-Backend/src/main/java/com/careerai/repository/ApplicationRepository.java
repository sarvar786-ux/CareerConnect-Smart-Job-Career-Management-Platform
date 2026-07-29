package com.careerai.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.careerai.entity.Application;

public interface ApplicationRepository
        extends JpaRepository<Application, Long> {

    boolean existsByUserIdAndJobId(
            Long userId,
            Long jobId
    );

    List<Application> findByUserId(
            Long userId
    );

    List<Application> findByJobId(
            Long jobId
    );
}