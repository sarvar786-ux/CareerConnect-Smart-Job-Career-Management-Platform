package com.careerai.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.careerai.dto.JobRequest;
import com.careerai.dto.JobResponse;
import com.careerai.entity.Company;
import com.careerai.entity.Job;
import com.careerai.entity.User;
import com.careerai.exception.ResourceNotFoundException;
import com.careerai.repository.CompanyRepository;
import com.careerai.repository.JobRepository;
import com.careerai.repository.UserRepository;

@Service
public class JobService {

	private final JobRepository jobRepository;
	private final CompanyRepository companyRepository;
	private final UserRepository userRepository;

	// =====================================================
	// CONSTRUCTOR
	// =====================================================

	public JobService(JobRepository jobRepository, CompanyRepository companyRepository, UserRepository userRepository) {

		this.jobRepository = jobRepository;
		this.companyRepository = companyRepository;
		this.userRepository = userRepository;
	}

	// =====================================================
	// CREATE JOB
	// =====================================================

	public JobResponse createJob(JobRequest request, String email) {

		// Find logged-in recruiter
		User recruiter = userRepository.findByEmail(email)
				.orElseThrow(() -> new ResourceNotFoundException("Recruiter not found with email: " + email));

		// Find company
		Company company = companyRepository.findById(request.getCompanyId()).orElseThrow(
				() -> new ResourceNotFoundException("Company not found with ID: " + request.getCompanyId()));

		// Check whether company belongs to logged-in recruiter
		if (company.getRecruiter() == null || !company.getRecruiter().getId().equals(recruiter.getId())) {

			throw new RuntimeException("You are not authorized to create a job " + "for this company");
		}

		// Create Job
		Job job = new Job();

		job.setTitle(request.getTitle());

		job.setDescription(request.getDescription());

		job.setLocation(request.getLocation());

		job.setJobType(request.getJobType());

		job.setExperienceLevel(request.getExperienceLevel());

		job.setSalaryMin(request.getSalaryMin());

		job.setSalaryMax(request.getSalaryMax());

		job.setSkills(request.getSkills());

		job.setCompany(company);

		// Save Job
		Job savedJob = jobRepository.save(job);

		return convertToResponse(savedJob);
	}

	// =====================================================
	// GET ALL JOBS
	// =====================================================

	public List<JobResponse> getAllJobs() {

		return jobRepository.findAll().stream().map(this::convertToResponse).toList();
	}

	// =====================================================
	// GET JOB BY ID
	// =====================================================

	public JobResponse getJobById(Long id) {

		Job job = jobRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Job not found with ID: " + id));

		return convertToResponse(job);
	}

	// =====================================================
	// UPDATE JOB
	// =====================================================

	public JobResponse updateJob(Long id, JobRequest request, String email) {

		// Find logged-in recruiter
		User recruiter = userRepository.findByEmail(email)
				.orElseThrow(() -> new ResourceNotFoundException("Recruiter not found with email: " + email));

		// Find Job
		Job job = jobRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Job not found with ID: " + id));

		// Check company
		Company company = job.getCompany();

		// Check ownership
		if (company == null || company.getRecruiter() == null
				|| !company.getRecruiter().getId().equals(recruiter.getId())) {

			throw new RuntimeException("You are not authorized " + "to update this job");
		}

		// Update fields
		job.setTitle(request.getTitle());

		job.setDescription(request.getDescription());

		job.setLocation(request.getLocation());

		job.setJobType(request.getJobType());

		job.setExperienceLevel(request.getExperienceLevel());

		job.setSalaryMin(request.getSalaryMin());

		job.setSalaryMax(request.getSalaryMax());

		job.setSkills(request.getSkills());

		// Save
		Job updatedJob = jobRepository.save(job);

		return convertToResponse(updatedJob);
	}

	// =====================================================
	// DELETE JOB
	// =====================================================

	public String deleteJob(Long id, String email) {

		// Find logged-in recruiter
		User recruiter = userRepository.findByEmail(email)
				.orElseThrow(() -> new ResourceNotFoundException("Recruiter not found with email: " + email));

		// Find Job
		Job job = jobRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Job not found with ID: " + id));

		// Get company
		Company company = job.getCompany();

		// Check ownership
		if (company == null || company.getRecruiter() == null
				|| !company.getRecruiter().getId().equals(recruiter.getId())) {

			throw new RuntimeException("You are not authorized " + "to delete this job");
		}

		// Delete
		jobRepository.delete(job);

		return "Job deleted successfully";
	}

	// =====================================================
	// SEARCH BY TITLE
	// =====================================================

	public List<JobResponse> searchByTitle(String title) {

		return jobRepository.findByTitleContainingIgnoreCase(title).stream().map(this::convertToResponse).toList();
	}

	// =====================================================
	// SEARCH BY LOCATION
	// =====================================================

	public List<JobResponse> searchByLocation(String location) {

		return jobRepository.findByLocationIgnoreCase(location).stream().map(this::convertToResponse).toList();
	}

	// =====================================================
	// SEARCH BY JOB TYPE
	// =====================================================

	public List<JobResponse> searchByJobType(String jobType) {

		return jobRepository.findByJobTypeIgnoreCase(jobType).stream().map(this::convertToResponse).toList();
	}

	// =====================================================
	// SEARCH BY EXPERIENCE
	// =====================================================

	public List<JobResponse> searchByExperience(String experienceLevel) {

		return jobRepository.findByExperienceLevelIgnoreCase(experienceLevel).stream().map(this::convertToResponse)
				.toList();
	}

	// =====================================================
	// GET JOBS BY COMPANY
	// =====================================================

	public List<JobResponse> getJobsByCompany(Long companyId) {

		return jobRepository.findByCompanyId(companyId).stream().map(this::convertToResponse).toList();
	}

	// =====================================================
	// GET MY JOBS
	// =====================================================

	public List<JobResponse> getMyJobs(String email) {

		User recruiter = userRepository.findByEmail(email)
				.orElseThrow(() -> new ResourceNotFoundException("Recruiter not found with email: " + email));

		return jobRepository.findByCompanyRecruiterId(recruiter.getId()).stream().map(this::convertToResponse).toList();
	}
	// =====================================================
	// ADMIN DELETE JOB
	// =====================================================

	public String adminDeleteJob(Long id) {

		Job job = jobRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Job not found with ID: " + id));

		jobRepository.delete(job);

		return "Job deleted successfully by admin";
	}

	// =====================================================
	// CONVERT ENTITY TO RESPONSE DTO
	// =====================================================

	private JobResponse convertToResponse(Job job) {

		Company company = job.getCompany();

		return new JobResponse(

				job.getId(),

				job.getTitle(),

				job.getDescription(),

				job.getLocation(),

				job.getJobType(),

				job.getExperienceLevel(),

				job.getSalaryMin(),

				job.getSalaryMax(),

				job.getSkills(),

				company != null ? company.getId() : null,

				company != null ? company.getCompanyName() : null);
	}
}