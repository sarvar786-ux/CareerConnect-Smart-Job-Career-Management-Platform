package com.careerai.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.careerai.entity.Company;

public interface CompanyRepository
        extends JpaRepository<Company, Long> {

	List<Company> findByRecruiterId(Long recruiterId);
    
}