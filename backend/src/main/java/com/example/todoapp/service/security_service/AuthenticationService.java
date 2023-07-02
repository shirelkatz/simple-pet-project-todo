package com.example.todoapp.service.security_service;


import com.example.todoapp.entity.Role;
import com.example.todoapp.entity.User;
import com.example.todoapp.repository.UserRepository;
import com.example.todoapp.security.dto.RegisterRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public AuthenticationService(JwtService jwtService, PasswordEncoder passwordEncoder, UserRepository userRepository) {
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    public User register(RegisterRequest request) {
        var user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        return userRepository.save(user);
    }

    public String login(Authentication authentication) {
        return jwtService.generateToken(authentication);
    }
}