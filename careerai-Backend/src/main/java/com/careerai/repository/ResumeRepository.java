package com.careerai.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.careerai.entity.Resume;

public interface ResumeRepository
        extends JpaRepository<Resume, Long> {

    Optional<Resume> findByUserId(Long userId);

    boolean existsByUserId(Long userId);
}