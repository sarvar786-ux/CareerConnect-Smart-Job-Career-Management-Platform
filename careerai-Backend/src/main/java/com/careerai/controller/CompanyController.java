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

import com.careerai.dto.CompanyRequest;
import com.careerai.dto.CompanyResponse;
import com.careerai.service.CompanyService;

@RestController
@RequestMapping("/api/companies")
public class CompanyController {

    private final CompanyService companyService;

    public CompanyController(
            CompanyService companyService) {

        this.companyService = companyService;
    }

 // Create Company
    @PostMapping
    public ResponseEntity<CompanyResponse> createCompany(
            @RequestBody CompanyRequest request,
            Authentication authentication) {

        // Get logged-in recruiter's email from JWT
        String email = authentication.getName();

        CompanyResponse company =
                companyService.createCompany(
                        request,
                        email
                );

        return new ResponseEntity<>(
                company,
                HttpStatus.CREATED
        );
    }

    // Get All Companies
    @GetMapping
    public ResponseEntity<List<CompanyResponse>>
    getAllCompanies() {

        return ResponseEntity.ok(
                companyService.getAllCompanies()
        );
    }

    // Get Company By ID
    @GetMapping("/{id}")
    public ResponseEntity<CompanyResponse>
    getCompanyById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                companyService.getCompanyById(id)
        );
    }

    // Update Company
    @PutMapping("/{id}")
    public ResponseEntity<CompanyResponse>
    updateCompany(
            @PathVariable Long id,
            @RequestBody CompanyRequest request) {

        return ResponseEntity.ok(
                companyService.updateCompany(
                        id,
                        request
                )
        );
    }

    // Delete Company
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCompany(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                companyService.deleteCompany(id)
        );
    }
 // ==========================================
 // Get My Company
 // ==========================================

    @GetMapping("/my")
    public ResponseEntity<List<CompanyResponse>> getMyCompanies(
            Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                companyService.getMyCompanies(email)
        );
    }
}