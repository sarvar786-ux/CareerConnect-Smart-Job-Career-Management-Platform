package com.careerai.dto;

public class CompanyResponse {

    private Long id;
    private String companyName;
    private String description;
    private String website;
    private String location;

    private Long recruiterId;
    private String recruiterName;

    public CompanyResponse() {
    }

    public CompanyResponse(
            Long id,
            String companyName,
            String description,
            String website,
            String location,
            Long recruiterId,
            String recruiterName) {

        this.id = id;
        this.companyName = companyName;
        this.description = description;
        this.website = website;
        this.location = location;
        this.recruiterId = recruiterId;
        this.recruiterName = recruiterName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Long getRecruiterId() {
        return recruiterId;
    }

    public void setRecruiterId(Long recruiterId) {
        this.recruiterId = recruiterId;
    }

    public String getRecruiterName() {
        return recruiterName;
    }

    public void setRecruiterName(String recruiterName) {
        this.recruiterName = recruiterName;
    }
}