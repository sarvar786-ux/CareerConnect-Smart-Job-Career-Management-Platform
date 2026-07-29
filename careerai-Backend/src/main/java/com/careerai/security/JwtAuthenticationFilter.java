package com.careerai.security;

import java.io.IOException;
import java.util.Collections;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.careerai.entity.User;
import com.careerai.repository.UserRepository;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter
        extends OncePerRequestFilter {

    private final JwtService jwtService;

    private final UserRepository userRepository;

    // Constructor
    public JwtAuthenticationFilter(
            JwtService jwtService,
            UserRepository userRepository) {

        this.jwtService = jwtService;

        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        // Get Authorization Header
        String authHeader =
                request.getHeader("Authorization");

        // Check if Authorization Header exists
        if (authHeader == null ||
                !authHeader.startsWith("Bearer ")) {

            filterChain.doFilter(
                    request,
                    response
            );

            return;
        }

        // Extract JWT Token
        String token =
                authHeader.substring(7);

        try {

            // Extract Email from JWT
            String email =
                    jwtService.extractEmail(token);

            // Check if Email exists
            if (email != null &&
                    SecurityContextHolder
                            .getContext()
                            .getAuthentication() == null) {

                // Find User in Database
                User user =
                        userRepository
                                .findByEmail(email)
                                .orElse(null);

                // Check User exists
                if (user != null) {

                    // Validate JWT
                    boolean isValid =
                            jwtService.isTokenValid(
                                    token,
                                    user.getEmail()
                            );

                    if (isValid) {

                        // Create Authority from Role
                        SimpleGrantedAuthority authority =
                                new SimpleGrantedAuthority(
                                        "ROLE_" +
                                        user.getRole().name()
                                );

                        // Create Authentication Object
                        UsernamePasswordAuthenticationToken authentication =
                                new UsernamePasswordAuthenticationToken(
                                        user.getEmail(),
                                        null,
                                        Collections.singletonList(
                                                authority
                                        )
                                );

                        // Set Authentication
                        SecurityContextHolder
                                .getContext()
                                .setAuthentication(
                                        authentication
                                );
                    }
                }
            }

        } catch (Exception e) {

            // Invalid JWT
            System.out.println(
                    "Invalid JWT Token: "
                            + e.getMessage()
            );
        }

        // Continue Filter Chain
        filterChain.doFilter(
                request,
                response
        );
    }
}