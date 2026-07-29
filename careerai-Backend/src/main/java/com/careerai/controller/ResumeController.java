package com.careerai.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.careerai.dto.ResumeRequest;
import com.careerai.dto.ResumeResponse;
import com.careerai.service.ResumeService;

@RestController
@RequestMapping("/api/resumes")
public class ResumeController {

    private final ResumeService resumeService;

    // =====================================================
    // CONSTRUCTOR
    // =====================================================

    public ResumeController(
            ResumeService resumeService) {

        this.resumeService = resumeService;
    }

    // =====================================================
    // CREATE MY RESUME
    // =====================================================

    @PostMapping("/my")
    public ResponseEntity<ResumeResponse>
    createMyResume(
            @RequestBody ResumeRequest request,
            Authentication authentication) {

        // Get logged-in user's email from JWT
        String email =
                authentication.getName();

        ResumeResponse response =
                resumeService.createMyResume(
                        request,
                        email
                );

        return new ResponseEntity<>(
                response,
                HttpStatus.CREATED
        );
    }

    // =====================================================
    // GET MY RESUME
    // =====================================================

    @GetMapping("/my")
    public ResponseEntity<ResumeResponse>
    getMyResume(
            Authentication authentication) {

        // Get logged-in user's email
        String email =
                authentication.getName();

        return ResponseEntity.ok(
                resumeService.getMyResume(
                        email
                )
        );
    }

    // =====================================================
    // UPDATE MY RESUME
    // =====================================================

    @PutMapping("/my")
    public ResponseEntity<ResumeResponse>
    updateMyResume(
            @RequestBody ResumeRequest request,
            Authentication authentication) {

        // Get logged-in user's email
        String email =
                authentication.getName();

        return ResponseEntity.ok(
                resumeService.updateMyResume(
                        request,
                        email
                )
        );
    }

    // =====================================================
    // DELETE MY RESUME
    // =====================================================

    @DeleteMapping("/my")
    public ResponseEntity<String>
    deleteMyResume(
            Authentication authentication) {

        // Get logged-in user's email
        String email =
                authentication.getName();

        return ResponseEntity.ok(
                resumeService.deleteMyResume(
                        email
                )
        );
    }

    // =====================================================
    // GET ALL RESUMES
    // =====================================================

    @GetMapping
    public ResponseEntity<List<ResumeResponse>>
    getAllResumes() {

        return ResponseEntity.ok(
                resumeService.getAllResumes()
        );
    }

    // =====================================================
    // GET RESUME BY ID
    // =====================================================

    @GetMapping("/{id}")
    public ResponseEntity<ResumeResponse>
    getResumeById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                resumeService.getResumeById(
                        id
                )
        );
    }

    // =====================================================
    // GET RESUME BY USER ID
    // =====================================================

    @GetMapping("/user/{userId}")
    public ResponseEntity<ResumeResponse>
    getResumeByUserId(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                resumeService.getResumeByUserId(
                        userId
                )
        );
    }

    // =====================================================
    // UPDATE RESUME BY ID
    // =====================================================

    @PutMapping("/{id}")
    public ResponseEntity<ResumeResponse>
    updateResume(
            @PathVariable Long id,
            @RequestBody ResumeRequest request) {

        return ResponseEntity.ok(
                resumeService.updateResume(
                        id,
                        request
                )
        );
    }

    // =====================================================
    // DELETE RESUME BY ID
    // =====================================================

    @DeleteMapping("/{id}")
    public ResponseEntity<String>
    deleteResume(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                resumeService.deleteResume(
                        id
                )
        );
    }
}