package com.careerai.dto;

public class ResumeResponse {

    private Long id;

    private Long userId;

    private String userName;

    private String resumeUrl;

    private String summary;

    private String education;

    private String experience;

    private String projects;

    private String certifications;

    public ResumeResponse() {
    }

    public ResumeResponse(
            Long id,
            Long userId,
            String userName,
            String resumeUrl,
            String summary,
            String education,
            String experience,
            String projects,
            String certifications) {

        this.id = id;
        this.userId = userId;
        this.userName = userName;
        this.resumeUrl = resumeUrl;
        this.summary = summary;
        this.education = education;
        this.experience = experience;
        this.projects = projects;
        this.certifications = certifications;
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

    public String getResumeUrl() {
        return resumeUrl;
    }

    public void setResumeUrl(String resumeUrl) {
        this.resumeUrl = resumeUrl;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getEducation() {
        return education;
    }

    public void setEducation(String education) {
        this.education = education;
    }

    public String getExperience() {
        return experience;
    }

    public void setExperience(String experience) {
        this.experience = experience;
    }

    public String getProjects() {
        return projects;
    }

    public void setProjects(String projects) {
        this.projects = projects;
    }

    public String getCertifications() {
        return certifications;
    }

    public void setCertifications(String certifications) {
        this.certifications = certifications;
    }
}