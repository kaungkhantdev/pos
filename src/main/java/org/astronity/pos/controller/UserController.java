package org.astronity.pos.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/users")
public class UserController {
    @GetMapping()
    public String index()
    {
        return "pages/user/list";
    }

    @GetMapping("/{id}")
    public String show()
    {
        return "pages/user/show";
    }

    @GetMapping("/new")
    public String create()
    {
        return "pages/user/create";
    }

    @GetMapping("/{id}/edit")
    public String edit()
    {
        return "pages/user/edit";
    }
}
