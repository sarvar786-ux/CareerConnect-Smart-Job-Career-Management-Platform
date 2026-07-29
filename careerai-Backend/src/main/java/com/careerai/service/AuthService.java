package com.careerai.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.careerai.dto.LoginRequest;
import com.careerai.dto.LoginResponse;
import com.careerai.dto.RegisterRequest;
import com.careerai.entity.User;
import com.careerai.enums.Role;
import com.careerai.repository.UserRepository;
import com.careerai.security.JwtService;

@Service
public class AuthService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    // Constructor
    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {

        this.userRepository =
                userRepository;

        this.passwordEncoder =
                passwordEncoder;

        this.jwtService =
                jwtService;
    }

    // =====================================================
    // REGISTER USER
    // =====================================================

    public LoginResponse register(
            RegisterRequest request) {

        // Check if email already exists
        if (userRepository
                .existsByEmail(
                        request.getEmail()
                )) {

            throw new RuntimeException(
                    "Email already registered"
            );
        }

        // Get Role from Request
        Role role =
                request.getRole();

        // Set Default Role
        if (role == null) {

            role = Role.JOB_SEEKER;
        }

        // Create User
        User user =
                new User();

        user.setName(
                request.getName()
        );

        user.setEmail(
                request.getEmail()
        );

        // Encrypt Password using BCrypt
        user.setPassword(
                passwordEncoder.encode(
                        request.getPassword()
                )
        );

        // Set Role
        user.setRole(role);

        // Save User
        User savedUser =
                userRepository.save(user);

        // Generate JWT
        String token =
                jwtService.generateToken(
                        savedUser.getEmail(),
                        savedUser
                                .getRole()
                                .name()
                );

        // Return Response
        return new LoginResponse(
                token,
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getEmail(),
                savedUser
                        .getRole()
                        .name()
        );
    }

    // =====================================================
    // LOGIN USER
    // =====================================================

    public LoginResponse login(
            LoginRequest request) {

        // Find User by Email
        User user =
                userRepository
                        .findByEmail(
                                request.getEmail()
                        )
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Invalid email or password"
                                )
                        );

        // Verify Password
        boolean passwordMatches =
                passwordEncoder.matches(
                        request.getPassword(),
                        user.getPassword()
                );

        // If Password is Incorrect
        if (!passwordMatches) {

            throw new RuntimeException(
                    "Invalid email or password"
            );
        }

        // Generate JWT
        String token =
                jwtService.generateToken(
                        user.getEmail(),
                        user.getRole()
                                .name()
                );

        // Return Login Response
        return new LoginResponse(
                token,
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole()
                        .name()
        );
    }
}