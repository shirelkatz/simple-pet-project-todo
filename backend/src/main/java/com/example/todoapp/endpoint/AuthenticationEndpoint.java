package com.example.todoapp.endpoint;


import com.example.todoapp.entity.User;
import com.example.todoapp.security.dto.RegisterRequest;
import com.example.todoapp.service.security_service.AuthenticationService;
import com.example.todoapp.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/authentication")
public class AuthenticationEndpoint {

    private final AuthenticationService authenticationService;
    private final UserRepository userRepository;

    public AuthenticationEndpoint(AuthenticationService authenticationService, UserRepository userRepository) {
        this.authenticationService = authenticationService;
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            User registeredUser = authenticationService.register(request);
            Optional<User> savedUser = userRepository.findByEmail(request.getEmail());

            if (savedUser.isPresent()) {
                return ResponseEntity.ok(savedUser.get());
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("User not saved.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }


    @PostMapping("/login")
    public String login(Authentication authentication) {
        return authenticationService.login(authentication);
    }
}
