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

import com.careerai.dto.JobRequest;
import com.careerai.dto.JobResponse;
import com.careerai.service.JobService;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

	private final JobService jobService;

	// =====================================================
	// CONSTRUCTOR
	// =====================================================

	public JobController(JobService jobService) {
		this.jobService = jobService;
	}

	// =====================================================
	// CREATE MY JOB
	// =====================================================

	/*
	 * Recruiter creates a job.
	 *
	 * The recruiter is identified using JWT.
	 *
	 * POST /api/jobs
	 *
	 * Authorization: Bearer JWT_TOKEN
	 */

	@PostMapping
	public ResponseEntity<JobResponse> createJob(@RequestBody JobRequest request, Authentication authentication) {

		String email = authentication.getName();

		return new ResponseEntity<>(jobService.createJob(request, email), HttpStatus.CREATED);
	}

	// =====================================================
	// GET MY JOBS
	// =====================================================

	/*
	 * Get all jobs posted by logged-in recruiter.
	 *
	 * GET /api/jobs/my
	 */

	@GetMapping("/my")
	public ResponseEntity<List<JobResponse>> getMyJobs(Authentication authentication) {

		String email = authentication.getName();

		return ResponseEntity.ok(jobService.getMyJobs(email));
	}

	// =====================================================
	// GET ALL JOBS
	// =====================================================

	/*
	 * Public job listing.
	 *
	 * GET /api/jobs
	 */

	@GetMapping
	public ResponseEntity<List<JobResponse>> getAllJobs() {

		return ResponseEntity.ok(jobService.getAllJobs());
	}

	// =====================================================
	// GET JOB BY ID
	// =====================================================

	/*
	 * GET /api/jobs/{id}
	 */

	@GetMapping("/{id}")
	public ResponseEntity<JobResponse> getJobById(@PathVariable Long id) {

		return ResponseEntity.ok(jobService.getJobById(id));
	}

	// =====================================================
	// UPDATE MY JOB
	// =====================================================

	/*
	 * Recruiter can update only their own job.
	 *
	 * PUT /api/jobs/{id}
	 *
	 * Authorization: Bearer JWT_TOKEN
	 */

	@PutMapping("/{id}")
	public ResponseEntity<JobResponse> updateJob(@PathVariable Long id, @RequestBody JobRequest request,
			Authentication authentication) {

		String email = authentication.getName();

		return ResponseEntity.ok(jobService.updateJob(id, request, email));
	}

	// =====================================================
	// DELETE MY JOB
	// =====================================================

	/*
	 * Recruiter can delete only their own job.
	 *
	 * DELETE /api/jobs/{id}
	 *
	 * Authorization: Bearer JWT_TOKEN
	 */

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteJob(@PathVariable Long id, Authentication authentication) {

		String email = authentication.getName();

		return ResponseEntity.ok(jobService.deleteJob(id, email));
	}

	// =====================================================
	// SEARCH BY TITLE
	// =====================================================

	/*
	 * GET /api/jobs/search/title?title=Java
	 */

	@GetMapping("/search/title")
	public ResponseEntity<List<JobResponse>> searchByTitle(@RequestParam String title) {

		return ResponseEntity.ok(jobService.searchByTitle(title));
	}
	// =====================================================
	// ADMIN DELETE ANY JOB
	// =====================================================

	@DeleteMapping("/admin/{id}")
	public ResponseEntity<String> adminDeleteJob(@PathVariable Long id) {

		return ResponseEntity.ok(jobService.adminDeleteJob(id));
	}

	// =====================================================
	// SEARCH BY LOCATION
	// =====================================================

	/*
	 * GET /api/jobs/search/location?location=Hyderabad
	 */

	@GetMapping("/search/location")
	public ResponseEntity<List<JobResponse>> searchByLocation(@RequestParam String location) {

		return ResponseEntity.ok(jobService.searchByLocation(location));
	}

	// =====================================================
	// SEARCH BY JOB TYPE
	// =====================================================

	/*
	 * GET /api/jobs/search/type?jobType=FULL_TIME
	 */

	@GetMapping("/search/type")
	public ResponseEntity<List<JobResponse>> searchByJobType(@RequestParam String jobType) {

		return ResponseEntity.ok(jobService.searchByJobType(jobType));
	}

	// =====================================================
	// SEARCH BY EXPERIENCE
	// =====================================================

	/*
	 * GET /api/jobs/search/experience?experienceLevel=ENTRY_LEVEL
	 */

	@GetMapping("/search/experience")
	public ResponseEntity<List<JobResponse>> searchByExperience(@RequestParam String experienceLevel) {

		return ResponseEntity.ok(jobService.searchByExperience(experienceLevel));
	}

	// =====================================================
	// GET JOBS BY COMPANY
	// =====================================================

	/*
	 * GET /api/jobs/company/{companyId}
	 */

	@GetMapping("/company/{companyId}")
	public ResponseEntity<List<JobResponse>> getJobsByCompany(@PathVariable Long companyId) {

		return ResponseEntity.ok(jobService.getJobsByCompany(companyId));
	}
}