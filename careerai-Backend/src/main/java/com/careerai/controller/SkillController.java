package com.careerai.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.careerai.dto.SkillRequest;
import com.careerai.dto.SkillResponse;
import com.careerai.service.SkillService;

@RestController
@RequestMapping("/api/skills")
public class SkillController {

    private final SkillService skillService;

    public SkillController(
            SkillService skillService) {

        this.skillService = skillService;
    }

    // Add Skill
    @PostMapping
    public ResponseEntity<SkillResponse>
    addSkill(
            @RequestBody SkillRequest request) {

        SkillResponse response =
                skillService.addSkill(request);

        return new ResponseEntity<>(
                response,
                HttpStatus.CREATED
        );
    }

    // Get All Skills
    @GetMapping
    public ResponseEntity<List<SkillResponse>>
    getAllSkills() {

        return ResponseEntity.ok(
                skillService.getAllSkills()
        );
    }

    // Get Skill By ID
    @GetMapping("/{id}")
    public ResponseEntity<SkillResponse>
    getSkillById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                skillService.getSkillById(id)
        );
    }

    // Get Skills By User
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<SkillResponse>>
    getSkillsByUser(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                skillService
                        .getSkillsByUser(userId)
        );
    }

    // Update Skill
    @PutMapping("/{id}")
    public ResponseEntity<SkillResponse>
    updateSkill(
            @PathVariable Long id,
            @RequestBody SkillRequest request) {

        return ResponseEntity.ok(
                skillService.updateSkill(
                        id,
                        request
                )
        );
    }

    // Delete Skill
    @DeleteMapping("/{id}")
    public ResponseEntity<String>
    deleteSkill(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                skillService.deleteSkill(id)
        );
    }
}