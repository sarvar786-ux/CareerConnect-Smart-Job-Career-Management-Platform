package com.careerai.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.careerai.dto.ApplicationRequest;
import com.careerai.dto.ApplicationResponse;
import com.careerai.entity.Application;
import com.careerai.entity.Job;
import com.careerai.entity.User;
import com.careerai.exception.ResourceNotFoundException;
import com.careerai.repository.ApplicationRepository;
import com.careerai.repository.JobRepository;
import com.careerai.repository.UserRepository;

@Service
public class ApplicationService {

	private final ApplicationRepository applicationRepository;

	private final UserRepository userRepository;

	private final JobRepository jobRepository;

	// ==========================================
	// Constructor
	// ==========================================

	public ApplicationService(ApplicationRepository applicationRepository, UserRepository userRepository,
			JobRepository jobRepository) {

		this.applicationRepository = applicationRepository;

		this.userRepository = userRepository;

		this.jobRepository = jobRepository;
	}

	// ==========================================
	// Apply For Job
	// ==========================================

	public ApplicationResponse applyForJob(ApplicationRequest request, String email) {

		// ------------------------------------------
		// Find logged-in user using JWT email
		// ------------------------------------------

		User user = userRepository.findByEmail(email)
				.orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));

		// ------------------------------------------
		// Find Job
		// ------------------------------------------

		Job job = jobRepository.findById(request.getJobId())
				.orElseThrow(() -> new ResourceNotFoundException("Job not found with ID: " + request.getJobId()));

		// ------------------------------------------
		// Prevent Duplicate Application
		// ------------------------------------------

		if (applicationRepository.existsByUserIdAndJobId(user.getId(), job.getId())) {

			throw new RuntimeException("You have already applied for this job");
		}

		// ------------------------------------------
		// Create Application
		// ------------------------------------------

		Application application = new Application();

		application.setUser(user);

		application.setJob(job);

		application.setCoverLetter(request.getCoverLetter());

		// ------------------------------------------
		// Set Application Status
		// ------------------------------------------

		application.setStatus("PENDING");

		// ------------------------------------------
		// Set Applied Date
		// ------------------------------------------

		application.setAppliedAt(LocalDateTime.now());

		// ------------------------------------------
		// Save Application
		// ------------------------------------------

		Application savedApplication = applicationRepository.save(application);

		// ------------------------------------------
		// Convert Entity To Response
		// ------------------------------------------

		return convertToResponse(savedApplication);
	}

	// ==========================================
	// Get All Applications
	// ==========================================

	public List<ApplicationResponse> getAllApplications() {

		return applicationRepository.findAll().stream().map(this::convertToResponse).collect(Collectors.toList());
	}

	// ==========================================
	// Get Application By ID
	// ==========================================

	public ApplicationResponse getApplicationById(Long id) {

		Application application = applicationRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Application not found with ID: " + id));

		return convertToResponse(application);
	}

	// ==========================================
	// Get Applications By User
	// ==========================================

	public List<ApplicationResponse> getApplicationsByUser(Long userId) {

		return applicationRepository.findByUserId(userId).stream().map(this::convertToResponse)
				.collect(Collectors.toList());
	}
	// ==========================================
	// Get My Applications
	// ==========================================

	public List<ApplicationResponse> getMyApplications(String email) {

		// Find logged-in user using email from JWT
		User user = userRepository.findByEmail(email)
				.orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));

		// Get applications belonging to logged-in user
		return applicationRepository.findByUserId(user.getId()).stream().map(this::convertToResponse)
				.collect(Collectors.toList());
	}

	// ==========================================
	// Get Applications By Job
	// ==========================================

	public List<ApplicationResponse> getApplicationsByJob(Long jobId) {

		return applicationRepository.findByJobId(jobId).stream().map(this::convertToResponse)
				.collect(Collectors.toList());
	}
	// =====================================================
	// GET ALL APPLICATIONS FOR RECRUITER'S JOBS
	// =====================================================

	public List<ApplicationResponse> getApplicationsForRecruiter(
	        String email) {

	    // ------------------------------------------
	    // Find logged-in recruiter
	    // ------------------------------------------

	    User recruiter = userRepository
	            .findByEmail(email)
	            .orElseThrow(() ->
	                    new ResourceNotFoundException(
	                            "Recruiter not found with email: "
	                                    + email
	                    )
	            );


	    // ------------------------------------------
	    // Find all jobs posted by recruiter
	    // ------------------------------------------

	    List<Job> recruiterJobs =
	            jobRepository.findByCompanyRecruiterId(
	                    recruiter.getId()
	            );


	    // ------------------------------------------
	    // Get applications for recruiter jobs
	    // ------------------------------------------

	    return recruiterJobs
	            .stream()
	            .flatMap(job ->
	                    applicationRepository
	                            .findByJobId(job.getId())
	                            .stream()
	            )
	            .map(this::convertToResponse)
	            .collect(Collectors.toList());
	}

	// ==========================================
	// Update Application Status
	// ==========================================

	public ApplicationResponse updateStatus(Long id, String status) {

		Application application = applicationRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Application not found with ID: " + id));

		application.setStatus(status.toUpperCase());

		Application updatedApplication = applicationRepository.save(application);

		return convertToResponse(updatedApplication);
	}

	// ==========================================
	// Delete Application
	// ==========================================

	public String deleteApplication(Long id) {

		Application application = applicationRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Application not found with ID: " + id));

		applicationRepository.delete(application);

		return "Application deleted successfully";
	}

	// ==========================================
	// Convert Entity To Response
	// ==========================================

	// Convert Entity to Response DTO
	private ApplicationResponse convertToResponse(Application application) {

		User user = application.getUser();
		Job job = application.getJob();

		return new ApplicationResponse(

				// Application ID
				application.getId(),

				// User ID
				user != null ? user.getId() : null,

				// User Name
				user != null ? user.getName() : null,

				// Job ID
				job != null ? job.getId() : null,

				// Job Title
				job != null ? job.getTitle() : null,

				// Company ID
				job != null && job.getCompany() != null ? job.getCompany().getId() : null,

				// Company Name
				job != null && job.getCompany() != null ? job.getCompany().getCompanyName() : null,

				// Application Status
				application.getStatus(),

				// Applied Date
				application.getAppliedAt(),

				// Cover Letter
				application.getCoverLetter());
	}

}