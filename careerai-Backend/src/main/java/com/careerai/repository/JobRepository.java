package com.careerai.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.careerai.entity.Job;

public interface JobRepository extends JpaRepository<Job, Long> {

    // Search jobs
    List<Job> findByLocationIgnoreCase(String location);

    List<Job> findByTitleContainingIgnoreCase(String title);

    List<Job> findByJobTypeIgnoreCase(String jobType);

    List<Job> findByExperienceLevelIgnoreCase(
            String experienceLevel
    );

    // Get jobs by company
    List<Job> findByCompanyId(Long companyId);

    // Get all jobs posted by a recruiter
    List<Job> findByCompanyRecruiterId(Long recruiterId);

    // Check if job belongs to recruiter
    boolean existsByIdAndCompanyRecruiterId(
            Long jobId,
            Long recruiterId
    );
}