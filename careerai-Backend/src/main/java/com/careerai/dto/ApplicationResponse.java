package com.careerai.dto;

import java.time.LocalDateTime;

public class ApplicationResponse {

    private Long id;

    private Long userId;
    private String userName;

    private Long jobId;
    private String jobTitle;

    private Long companyId;
    private String companyName;

    private String status;

    private LocalDateTime appliedAt;

    private String coverLetter;

    public ApplicationResponse() {
    }

    public ApplicationResponse(
            Long id,
            Long userId,
            String userName,
            Long jobId,
            String jobTitle,
            Long companyId,
            String companyName,
            String status,
            LocalDateTime appliedAt,
            String coverLetter) {

        this.id = id;
        this.userId = userId;
        this.userName = userName;
        this.jobId = jobId;
        this.jobTitle = jobTitle;
        this.companyId = companyId;
        this.companyName = companyName;
        this.status = status;
        this.appliedAt = appliedAt;
        this.coverLetter = coverLetter;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Long getJobId() {
        return jobId;
    }

    public void setJobId(Long jobId) {
        this.jobId = jobId;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public Long getCompanyId() {	
        return companyId;
    }

    public void setCompanyId(Long companyId) {
        this.companyId = companyId;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getAppliedAt() {
        return appliedAt;
    }

    public void setAppliedAt(LocalDateTime appliedAt) {
        this.appliedAt = appliedAt;
    }

    public String getCoverLetter() {
        return coverLetter;
    }

    public void setCoverLetter(String coverLetter) {
        this.coverLetter = coverLetter;
    }
}