package com.careerai.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.careerai.entity.Skill;

public interface SkillRepository
        extends JpaRepository<Skill, Long> {

    List<Skill> findByUserId(Long userId);

    boolean existsByUserIdAndSkillName(
            Long userId,
            String skillName
    );
}