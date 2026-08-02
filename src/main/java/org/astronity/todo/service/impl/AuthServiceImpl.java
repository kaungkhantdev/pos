package org.astronity.todo.service.impl;

import org.astronity.todo.service.AuthService;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {
    @Override
    public Boolean authenticate(Authentication authentication) {
        return authentication != null && authentication.isAuthenticated();
    }
}
