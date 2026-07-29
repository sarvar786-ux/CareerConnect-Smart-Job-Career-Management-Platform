package com.careerai.security;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long expiration;

    // Get Secret Key
    private SecretKey getSigningKey() {

        return Keys.hmacShaKeyFor(
                secret.getBytes(
                        StandardCharsets.UTF_8
                )
        );
    }

    // Generate JWT Token
    public String generateToken(
            String email,
            String role) {

        Map<String, Object> claims =
                new HashMap<>();

        claims.put("role", role);

        return Jwts.builder()
                .claims(claims)
                .subject(email)
                .issuedAt(new Date())
                .expiration(
                        new Date(
                                System.currentTimeMillis()
                                        + expiration
                        )
                )
                .signWith(
                        getSigningKey()
                )
                .compact();
    }

    // Extract Email
    public String extractEmail(
            String token) {

        return extractClaim(
                token,
                Claims::getSubject
        );
    }

    // Extract Role
    public String extractRole(
            String token) {

        Claims claims =
                extractAllClaims(token);

        return claims.get(
                "role",
                String.class
        );
    }

    // Extract Claim
    public <T> T extractClaim(
            String token,
            Function<Claims, T> resolver) {

        Claims claims =
                extractAllClaims(token);

        return resolver.apply(claims);
    }

    // Extract All Claims
    private Claims extractAllClaims(
            String token) {

        return Jwts.parser()
                .verifyWith(
                        getSigningKey()
                )
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    // Validate Token
    public boolean isTokenValid(
            String token,
            String email) {

        String tokenEmail =
                extractEmail(token);

        return tokenEmail.equals(email)
                && !isTokenExpired(token);
    }

    // Check Token Expiration
    private boolean isTokenExpired(
            String token) {

        Date expirationDate =
                extractClaim(
                        token,
                        Claims::getExpiration
                );

        return expirationDate
                .before(new Date());
    }
}