package com.careerai.dto;

public class JobResponse {

    private Long id;
    private String title;
    private String description;
    private String location;
    private String jobType;
    private String experienceLevel;
    private Double salaryMin;
    private Double salaryMax;
    private String skills;

    private Long companyId;
    private String companyName;

    public JobResponse() {
    }

    public JobResponse(
            Long id,
            String title,
            String description,
            String location,
            String jobType,
            String experienceLevel,
            Double salaryMin,
            Double salaryMax,
            String skills,
            Long companyId,
            String companyName) {

        this.id = id;
        this.title = title;
        this.description = description;
        this.location = location;
        this.jobType = jobType;
        this.experienceLevel = experienceLevel;
        this.salaryMin = salaryMin;
        this.salaryMax = salaryMax;
        this.skills = skills;
        this.companyId = companyId;
        this.companyName = companyName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getJobType() {
        return jobType;
    }

    public void setJobType(String jobType) {
        this.jobType = jobType;
    }

    public String getExperienceLevel() {
        return experienceLevel;
    }

    public void setExperienceLevel(String experienceLevel) {
        this.experienceLevel = experienceLevel;
    }

    public Double getSalaryMin() {
        return salaryMin;
    }

    public void setSalaryMin(Double salaryMin) {
        this.salaryMin = salaryMin;
    }

    public Double getSalaryMax() {
        return salaryMax;
    }

    public void setSalaryMax(Double salaryMax) {
        this.salaryMax = salaryMax;
    }

    public String getSkills() {
        return skills;
    }

    public void setSkills(String skills) {
        this.skills = skills;
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
}