package org.astronity.todo.service;

import org.springframework.security.core.Authentication;

public interface AuthService {
    Boolean authenticate(Authentication authentication);
}
