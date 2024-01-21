package it.campominosi.springbackend.entity;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name="user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String mobile;
    private String password;
    private LocalDateTime registration_date = LocalDateTime.now();

    @Transient
    private DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    public User() {

    }
/*
    public User(String name, String email, String mobile, String password) {
        this.name = name;
        this.email = email;
        this.mobile = mobile;
        this.password = password;
    }
*/
    public User(@JsonProperty("name") String name,
                @JsonProperty("primaryEmail") String email,
                @JsonProperty("mobile") String mobile,
                @JsonProperty("primaryPassword") String password) {
                    
        this.name = name;
        this.email = email;
        this.mobile = mobile;
        this.password = password;
        
    }

    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public LocalDateTime getRegistration_date() {
        return registration_date;
    }

    public String getRegistration_date_formatted() {
        return registration_date.format(formatter);
    }

    public void setRegistration_date(LocalDateTime registration_date) {
        this.registration_date = registration_date;
    }

    @Override
    public String toString() {
        return "[" + id + "] - Name: " + name + " - Email: " + email + " - Mobile: " + mobile + " - Password: " + password + " - Registration Date: " + getRegistration_date_formatted();
    }
}

