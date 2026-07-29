package com.careerai.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.careerai.dto.CompanyRequest;
import com.careerai.dto.CompanyResponse;
import com.careerai.entity.Company;
import com.careerai.entity.User;
import com.careerai.exception.ResourceNotFoundException;
import com.careerai.repository.CompanyRepository;
import com.careerai.repository.UserRepository;

@Service
public class CompanyService {

	private final CompanyRepository companyRepository;
	private final UserRepository userRepository;

	public CompanyService(CompanyRepository companyRepository, UserRepository userRepository) {

		this.companyRepository = companyRepository;
		this.userRepository = userRepository;
	}

	// Create Company
	// Create Company
	public CompanyResponse createCompany(CompanyRequest request, String email) {

		// Find logged-in recruiter using JWT email
		User recruiter = userRepository.findByEmail(email)
				.orElseThrow(() -> new ResourceNotFoundException("Recruiter not found with email: " + email));

		// Create new company
		Company company = new Company();

		company.setCompanyName(request.getCompanyName());

		company.setDescription(request.getDescription());

		company.setWebsite(request.getWebsite());

		company.setLocation(request.getLocation());

		// Automatically link company to logged-in recruiter
		company.setRecruiter(recruiter);

		// Save company
		Company savedCompany = companyRepository.save(company);

		// Convert entity to response
		return convertToResponse(savedCompany);
	}

	// Get All Companies
	public List<CompanyResponse> getAllCompanies() {

		return companyRepository.findAll().stream().map(this::convertToResponse).toList();
	}

	// Get Company By ID
	public CompanyResponse getCompanyById(Long id) {

		Company company = companyRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Company not found with ID: " + id));

		return convertToResponse(company);
	}

	// Update Company
	public CompanyResponse updateCompany(Long id, CompanyRequest request) {

		Company company = companyRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Company not found with ID: " + id));

		company.setCompanyName(request.getCompanyName());

		company.setDescription(request.getDescription());

		company.setWebsite(request.getWebsite());

		company.setLocation(request.getLocation());

		Company updatedCompany = companyRepository.save(company);

		return convertToResponse(updatedCompany);
	}

	// Delete Company
	public String deleteCompany(Long id) {

		Company company = companyRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Company not found with ID: " + id));

		companyRepository.delete(company);

		return "Company deleted successfully";
	}
	public List<CompanyResponse> getMyCompanies(String email) {

	    User recruiter = userRepository
	            .findByEmail(email)
	            .orElseThrow(() ->
	                    new ResourceNotFoundException(
	                            "Recruiter not found with email: " + email
	                    )
	            );

	    List<Company> companies =
	            companyRepository.findByRecruiterId(
	                    recruiter.getId()
	            );

	    return companies.stream()
	            .map(this::convertToResponse)
	            .toList();
	}
	// Convert Entity to Response DTO
	private CompanyResponse convertToResponse(Company company) {

		User recruiter = company.getRecruiter();

		return new CompanyResponse(company.getId(), company.getCompanyName(), company.getDescription(),
				company.getWebsite(), company.getLocation(), recruiter != null ? recruiter.getId() : null,
				recruiter != null ? recruiter.getName() : null);
	}
}