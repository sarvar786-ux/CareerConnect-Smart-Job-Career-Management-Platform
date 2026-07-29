package com.careerai.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(
            JwtAuthenticationFilter jwtAuthenticationFilter) {

        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    // =====================================================
    // PASSWORD ENCODER
    // =====================================================

    @Bean
    public PasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();
    }

    // =====================================================
    // SECURITY FILTER CHAIN
    // =====================================================

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

        http

            // =================================================
            // DISABLE CSRF
            // =================================================

            .csrf(csrf -> csrf.disable())

            // Enable CORS
            .cors(cors -> {})

            // =================================================
            // JWT - STATELESS SESSION
            // =================================================

            .sessionManagement(session ->
                session.sessionCreationPolicy(
                    SessionCreationPolicy.STATELESS
                )
            )

            // =================================================
            // AUTHORIZATION RULES
            // =================================================

            .authorizeHttpRequests(auth -> auth

                // =============================================
                // PUBLIC AUTHENTICATION APIs
                // =============================================

                .requestMatchers(
                    "/api/auth/**"
                ).permitAll()


                // =============================================
                // PUBLIC TEST API
                // =============================================

                .requestMatchers(
                    "/api/users/test"
                ).permitAll()


                // =============================================
                // PUBLIC JOB GET APIs
                // =============================================

                .requestMatchers(
                    HttpMethod.GET,
                    "/api/jobs",
                    "/api/jobs/**"
                ).permitAll()


                // =============================================
                // PUBLIC COMPANY GET APIs
                // =============================================

                .requestMatchers(
                    HttpMethod.GET,
                    "/api/companies",
                    "/api/companies/**"
                ).permitAll()


                // =================================================
                // RECRUITER - CREATE JOB
                // =================================================

                .requestMatchers(
                    HttpMethod.POST,
                    "/api/jobs"
                ).hasRole("RECRUITER")


                // =================================================
                // RECRUITER - UPDATE JOB
                // =================================================

                .requestMatchers(
                    HttpMethod.PUT,
                    "/api/jobs/**"
                ).hasRole("RECRUITER")


                // =================================================
                // RECRUITER - DELETE OWN JOB
                // =================================================

                .requestMatchers(
                    HttpMethod.DELETE,
                    "/api/jobs/**"
                ).hasAnyRole(
                    "RECRUITER",
                    "ADMIN"
                )


                // =================================================
                // RECRUITER - CREATE COMPANY
                // =================================================

                .requestMatchers(
                    HttpMethod.POST,
                    "/api/companies"
                ).hasRole("RECRUITER")


                // =================================================
                // RECRUITER - UPDATE COMPANY
                // =================================================

                .requestMatchers(
                    HttpMethod.PUT,
                    "/api/companies/**"
                ).hasRole("RECRUITER")


                // =================================================
                // RECRUITER / ADMIN - DELETE COMPANY
                // =================================================

                .requestMatchers(
                    HttpMethod.DELETE,
                    "/api/companies/**"
                ).hasAnyRole(
                    "RECRUITER",
                    "ADMIN"
                )


                // =================================================
                // JOB SEEKER - APPLY FOR JOB
                // =================================================

                .requestMatchers(
                    HttpMethod.POST,
                    "/api/applications"
                ).hasRole("JOB_SEEKER")


                // =================================================
                // JOB SEEKER - GET OWN APPLICATIONS
                // =================================================

                .requestMatchers(
                    HttpMethod.GET,
                    "/api/applications/my"
                ).hasRole("JOB_SEEKER")


                // =================================================
                // RECRUITER - VIEW APPLICATIONS FOR OWN JOBS
                // =================================================

                .requestMatchers(
                    HttpMethod.GET,
                    "/api/applications/job/my"
                ).hasRole("RECRUITER")


                // =================================================
                // RECRUITER - UPDATE APPLICATION STATUS
                // =================================================

                .requestMatchers(
                    HttpMethod.PUT,
                    "/api/applications/*/status"
                ).hasRole("RECRUITER")


                // =================================================
                // RECRUITER / ADMIN - DELETE APPLICATION
                // =================================================

                .requestMatchers(
                    HttpMethod.DELETE,
                    "/api/applications/**"
                ).hasAnyRole(
                    "JOB_SEEKER",
                    "ADMIN"
                )


                // =================================================
                // ADMIN - USER MANAGEMENT
                // =================================================

                .requestMatchers(
                    "/api/users/**"
                ).hasRole("ADMIN")


                // =================================================
                // ADMIN - GET ALL APPLICATIONS
                // =================================================

                .requestMatchers(
                    HttpMethod.GET,
                    "/api/applications"
                ).hasRole("ADMIN")


                // =================================================
                // ADMIN - GET APPLICATION BY ID
                // =================================================

                .requestMatchers(
                    HttpMethod.GET,
                    "/api/applications/{id}"
                ).hasRole("ADMIN")


                // =================================================
                // ALL OTHER APPLICATION APIs
                // =================================================

                .requestMatchers(
                    "/api/applications/**"
                ).authenticated()


                // =================================================
                // EVERYTHING ELSE
                // =================================================

                .anyRequest()
                .authenticated()
            )

            // =================================================
            // ADD JWT FILTER
            // =================================================

            .addFilterBefore(
                jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }
}