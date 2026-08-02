package org.astronity.todo.controller;

import org.astronity.todo.service.AuthService;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AuthController {
    private final AuthService authService;
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @GetMapping("/login")
    public String login(Authentication authentication, Model model) {
        return authService.authenticate(authentication) ? "redirect:/tasks" : "pages/auth/login";
    }
}
