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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.careerai.dto.ApplicationRequest;
import com.careerai.dto.ApplicationResponse;
import com.careerai.service.ApplicationService;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(
            ApplicationService applicationService) {

        this.applicationService = applicationService;
    }


    // =====================================================
    // APPLY FOR JOB - JOB SEEKER
    // =====================================================

    @PostMapping
    public ResponseEntity<ApplicationResponse> applyForJob(
            @RequestBody ApplicationRequest request,
            Authentication authentication) {

        String email = authentication.getName();

        ApplicationResponse response =
                applicationService.applyForJob(
                        request,
                        email
                );

        return new ResponseEntity<>(
                response,
                HttpStatus.CREATED
        );
    }


    // =====================================================
    // GET ALL APPLICATIONS
    // =====================================================

    @GetMapping
    public ResponseEntity<List<ApplicationResponse>>
    getAllApplications() {

        return ResponseEntity.ok(
                applicationService.getAllApplications()
        );
    }


    // =====================================================
    // GET APPLICATION BY ID
    // =====================================================

    @GetMapping("/{id}")
    public ResponseEntity<ApplicationResponse>
    getApplicationById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                applicationService.getApplicationById(id)
        );
    }


    // =====================================================
    // GET MY APPLICATIONS - JOB SEEKER
    // =====================================================

    @GetMapping("/my")
    public ResponseEntity<List<ApplicationResponse>>
    getMyApplications(
            Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                applicationService.getMyApplications(email)
        );
    }


    // =====================================================
    // GET ALL APPLICATIONS FOR MY JOBS - RECRUITER
    // =====================================================

    @GetMapping("/job/my")
    public ResponseEntity<List<ApplicationResponse>>
    getMyJobApplications(
            Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                applicationService
                        .getApplicationsForRecruiter(email)
        );
    }


    // =====================================================
    // GET APPLICATIONS FOR SPECIFIC JOB
    // =====================================================

    @GetMapping("/job/{jobId}")
    public ResponseEntity<List<ApplicationResponse>>
    getApplicationsByJob(
            @PathVariable Long jobId) {

        return ResponseEntity.ok(
                applicationService
                        .getApplicationsByJob(jobId)
        );
    }


    // =====================================================
    // UPDATE APPLICATION STATUS
    // =====================================================

    @PutMapping("/{id}/status")
    public ResponseEntity<ApplicationResponse>
    updateStatus(
            @PathVariable Long id,
            @RequestParam String status) {

        return ResponseEntity.ok(
                applicationService.updateStatus(
                        id,
                        status
                )
        );
    }


    // =====================================================
    // DELETE APPLICATION
    // =====================================================

    @DeleteMapping("/{id}")
    public ResponseEntity<String>
    deleteApplication(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                applicationService.deleteApplication(id)
        );
    }

}