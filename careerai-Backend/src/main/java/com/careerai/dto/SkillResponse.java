package com.careerai.dto;

public class SkillResponse {

    private Long id;

    private Long userId;

    private String userName;

    private String skillName;

    private String proficiency;

    public SkillResponse() {
    }

    public SkillResponse(
            Long id,
            Long userId,
            String userName,
            String skillName,
            String proficiency) {

        this.id = id;
        this.userId = userId;
        this.userName = userName;
        this.skillName = skillName;
        this.proficiency = proficiency;
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

    public String getSkillName() {
        return skillName;
    }

    public void setSkillName(String skillName) {
        this.skillName = skillName;
    }

    public String getProficiency() {
        return proficiency;
    }

    public void setProficiency(String proficiency) {
        this.proficiency = proficiency;
    }
}