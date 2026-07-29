package com.careerai.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.careerai.dto.LoginRequest;
import com.careerai.dto.LoginResponse;
import com.careerai.dto.RegisterRequest;
import com.careerai.service.AuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    // Constructor
    public AuthController(
            AuthService authService) {

        this.authService =
                authService;
    }

    // =====================================================
    // REGISTER
    // =====================================================

    @PostMapping("/register")
    public ResponseEntity<LoginResponse>
    register(
            @RequestBody RegisterRequest request) {

        LoginResponse response =
                authService.register(
                        request
                );

        return new ResponseEntity<>(
                response,
                HttpStatus.CREATED
        );
    }

    // =====================================================
    // LOGIN
    // =====================================================

    @PostMapping("/login")
    public ResponseEntity<LoginResponse>
    login(
            @RequestBody LoginRequest request) {

        LoginResponse response =
                authService.login(
                        request
                );

        return ResponseEntity.ok(
                response
        );
    }
}