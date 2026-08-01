package org.astronity.todo.service;

import org.astronity.todo.dto.UserDto;
import org.astronity.todo.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    User saveUser(UserDto userDto);
    User saveAdmin(UserDto userDto);

    Optional<User> findByEmail(String email);
    List<UserDto> findAllUsers();
}
