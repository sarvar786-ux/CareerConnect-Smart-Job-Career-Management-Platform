package com.careerai.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.careerai.dto.SkillRequest;
import com.careerai.dto.SkillResponse;
import com.careerai.entity.Skill;
import com.careerai.entity.User;
import com.careerai.exception.ResourceNotFoundException;
import com.careerai.repository.SkillRepository;
import com.careerai.repository.UserRepository;

@Service
public class SkillService {

    private final SkillRepository skillRepository;

    private final UserRepository userRepository;

    public SkillService(
            SkillRepository skillRepository,
            UserRepository userRepository) {

        this.skillRepository = skillRepository;

        this.userRepository = userRepository;
    }

    // Add Skill
    public SkillResponse addSkill(
            SkillRequest request) {

        User user =
                userRepository
                        .findById(request.getUserId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "User not found with ID: "
                                                + request.getUserId()
                                )
                        );

        // Prevent duplicate skill
        if (skillRepository
                .existsByUserIdAndSkillName(
                        request.getUserId(),
                        request.getSkillName()
                )) {

            throw new RuntimeException(
                    "User already has this skill"
            );
        }

        Skill skill = new Skill();

        skill.setUser(user);

        skill.setSkillName(
                request.getSkillName()
        );

        skill.setProficiency(
                request.getProficiency()
        );

        Skill savedSkill =
                skillRepository.save(skill);

        return convertToResponse(
                savedSkill
        );
    }

    // Get All Skills
    public List<SkillResponse>
    getAllSkills() {

        return skillRepository
                .findAll()
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    // Get Skill By ID
    public SkillResponse getSkillById(
            Long id) {

        Skill skill =
                skillRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Skill not found with ID: "
                                                + id
                                )
                        );

        return convertToResponse(skill);
    }

    // Get Skills By User
    public List<SkillResponse>
    getSkillsByUser(Long userId) {

        // Check User Exists
        userRepository
                .findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found with ID: "
                                        + userId
                        )
                );

        return skillRepository
                .findByUserId(userId)
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    // Update Skill
    public SkillResponse updateSkill(
            Long id,
            SkillRequest request) {

        Skill skill =
                skillRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Skill not found with ID: "
                                                + id
                                )
                        );

        skill.setSkillName(
                request.getSkillName()
        );

        skill.setProficiency(
                request.getProficiency()
        );

        Skill updatedSkill =
                skillRepository.save(skill);

        return convertToResponse(
                updatedSkill
        );
    }

    // Delete Skill
    public String deleteSkill(Long id) {

        Skill skill =
                skillRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Skill not found with ID: "
                                                + id
                                )
                        );

        skillRepository.delete(skill);

        return "Skill deleted successfully";
    }

    // Convert Entity to Response
    private SkillResponse convertToResponse(
            Skill skill) {

        User user = skill.getUser();

        return new SkillResponse(

                skill.getId(),

                user != null
                        ? user.getId()
                        : null,

                user != null
                        ? user.getName()
                        : null,

                skill.getSkillName(),

                skill.getProficiency()
        );
    }
}