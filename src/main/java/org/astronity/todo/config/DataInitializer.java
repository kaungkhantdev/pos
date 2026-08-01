package org.astronity.todo.config;

import org.astronity.todo.dto.UserDto;
import org.astronity.todo.model.Role;
import org.astronity.todo.model.User;
import org.astronity.todo.repository.RoleRepository;
import org.astronity.todo.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {
    private final RoleRepository roleRepository;
    private final UserService userService;

    public DataInitializer(
            RoleRepository roleRepository,
            UserService userService
    )
    {
        this.roleRepository = roleRepository;
        this.userService = userService;
    }

    @Override
    public void run(String... args) {
        this.createRole("ROLE_USER");
        this.createRole("ROLE_ADMIN");
        this.createAdmin("admin@pos.com", "Abcd@1234");
    }

    private void createRole(String name) {
        if (roleRepository.findByName(name).isEmpty()) {
            Role role = new Role();
            role.setName(name);
            roleRepository.save(role);
        }
    }

    private void createAdmin(String email, String password)
    {
        if (this.userService.findByEmail(email).isEmpty())
        {
            UserDto userDto = new UserDto();
            userDto.setFirstName("admin");
            userDto.setLastName(email);
            userDto.setEmail(email);
            userDto.setPassword(password);

            User savedAdmin = this.userService.saveAdmin(userDto);
        }
    }
}
