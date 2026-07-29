package com.careerai.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(
    name = "skills",
    uniqueConstraints = {
        @UniqueConstraint(
            columnNames = {"user_id", "skill_name"}
        )
    }
)
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(
        name = "user_id",
        nullable = false
    )
    private User user;

    @Column(
        name = "skill_name",
        nullable = false
    )
    private String skillName;

    @Column
    private String proficiency;

    public Skill() {
    }

    public Skill(
            User user,
            String skillName,
            String proficiency) {

        this.user = user;
        this.skillName = skillName;
        this.proficiency = proficiency;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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