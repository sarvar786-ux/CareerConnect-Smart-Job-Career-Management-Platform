package com.careerai.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.careerai.dto.ResumeRequest;
import com.careerai.dto.ResumeResponse;
import com.careerai.entity.Resume;
import com.careerai.entity.User;
import com.careerai.exception.ResourceNotFoundException;
import com.careerai.repository.ResumeRepository;
import com.careerai.repository.UserRepository;

@Service
public class ResumeService {

    private final ResumeRepository resumeRepository;

    private final UserRepository userRepository;

    // =====================================================
    // CONSTRUCTOR
    // =====================================================

    public ResumeService(
            ResumeRepository resumeRepository,
            UserRepository userRepository) {

        this.resumeRepository = resumeRepository;

        this.userRepository = userRepository;
    }

    // =====================================================
    // CREATE MY RESUME
    // =====================================================

    public ResumeResponse createMyResume(
            ResumeRequest request,
            String email) {

        // Find logged-in user using JWT email
        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found with email: "
                                        + email
                        )
                );

        // Check if user already has a resume
        if (resumeRepository.existsByUserId(user.getId())) {

            throw new RuntimeException(
                    "You already have a resume"
            );
        }

        // Create new Resume
        Resume resume = new Resume();

        resume.setUser(user);

        resume.setResumeUrl(
                request.getResumeUrl()
        );

        resume.setSummary(
                request.getSummary()
        );

        resume.setEducation(
                request.getEducation()
        );

        resume.setExperience(
                request.getExperience()
        );

        resume.setProjects(
                request.getProjects()
        );

        resume.setCertifications(
                request.getCertifications()
        );

        // Save Resume
        Resume savedResume =
                resumeRepository.save(resume);

        return convertToResponse(
                savedResume
        );
    }

    // =====================================================
    // GET MY RESUME
    // =====================================================

    public ResumeResponse getMyResume(
            String email) {

        // Find logged-in user
        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found with email: "
                                        + email
                        )
                );

        // Find resume of logged-in user
        Resume resume =
                resumeRepository
                        .findByUserId(user.getId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Resume not found for logged-in user"
                                )
                        );

        return convertToResponse(resume);
    }

    // =====================================================
    // UPDATE MY RESUME
    // =====================================================

    public ResumeResponse updateMyResume(
            ResumeRequest request,
            String email) {

        // Find logged-in user
        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found with email: "
                                        + email
                        )
                );

        // Find user's resume
        Resume resume =
                resumeRepository
                        .findByUserId(user.getId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Resume not found for logged-in user"
                                )
                        );

        // Update fields
        resume.setResumeUrl(
                request.getResumeUrl()
        );

        resume.setSummary(
                request.getSummary()
        );

        resume.setEducation(
                request.getEducation()
        );

        resume.setExperience(
                request.getExperience()
        );

        resume.setProjects(
                request.getProjects()
        );

        resume.setCertifications(
                request.getCertifications()
        );

        // Save updated resume
        Resume updatedResume =
                resumeRepository.save(resume);

        return convertToResponse(
                updatedResume
        );
    }

    // =====================================================
    // DELETE MY RESUME
    // =====================================================

    public String deleteMyResume(
            String email) {

        // Find logged-in user
        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found with email: "
                                        + email
                        )
                );

        // Find user's resume
        Resume resume =
                resumeRepository
                        .findByUserId(user.getId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Resume not found for logged-in user"
                                )
                        );

        // Delete resume
        resumeRepository.delete(resume);

        return "Resume deleted successfully";
    }

    // =====================================================
    // GET ALL RESUMES
    // =====================================================

    public List<ResumeResponse>
    getAllResumes() {

        return resumeRepository
                .findAll()
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    // =====================================================
    // GET RESUME BY ID
    // =====================================================

    public ResumeResponse getResumeById(
            Long id) {

        Resume resume =
                resumeRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Resume not found with ID: "
                                                + id
                                )
                        );

        return convertToResponse(resume);
    }

    // =====================================================
    // GET RESUME BY USER ID
    // =====================================================

    public ResumeResponse getResumeByUserId(
            Long userId) {

        Resume resume =
                resumeRepository
                        .findByUserId(userId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Resume not found for user ID: "
                                                + userId
                                )
                        );

        return convertToResponse(resume);
    }

    // =====================================================
    // UPDATE RESUME BY ID
    // =====================================================

    public ResumeResponse updateResume(
            Long id,
            ResumeRequest request) {

        Resume resume =
                resumeRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Resume not found with ID: "
                                                + id
                                )
                        );

        resume.setResumeUrl(
                request.getResumeUrl()
        );

        resume.setSummary(
                request.getSummary()
        );

        resume.setEducation(
                request.getEducation()
        );

        resume.setExperience(
                request.getExperience()
        );

        resume.setProjects(
                request.getProjects()
        );

        resume.setCertifications(
                request.getCertifications()
        );

        Resume updatedResume =
                resumeRepository.save(resume);

        return convertToResponse(
                updatedResume
        );
    }

    // =====================================================
    // DELETE RESUME BY ID
    // =====================================================

    public String deleteResume(
            Long id) {

        Resume resume =
                resumeRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Resume not found with ID: "
                                                + id
                                )
                        );

        resumeRepository.delete(resume);

        return "Resume deleted successfully";
    }

    // =====================================================
    // CONVERT ENTITY TO RESPONSE DTO
    // =====================================================

    private ResumeResponse convertToResponse(
            Resume resume) {

        User user = resume.getUser();

        return new ResumeResponse(

                // Resume ID
                resume.getId(),

                // User ID
                user != null
                        ? user.getId()
                        : null,

                // User Name
                user != null
                        ? user.getName()
                        : null,

                // Resume URL
                resume.getResumeUrl(),

                // Summary
                resume.getSummary(),

                // Education
                resume.getEducation(),

                // Experience
                resume.getExperience(),

                // Projects
                resume.getProjects(),

                // Certifications
                resume.getCertifications()
        );
    }
}