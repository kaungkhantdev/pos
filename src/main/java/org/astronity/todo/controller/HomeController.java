package org.astronity.todo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/home")
    public String home(Model model) {
        return "pages/home/index";
    }

    @GetMapping("/")
    public String index(Model model) {
        return "pages/home/index";
    }

    @GetMapping("/hello")
    public String hello(Model model) {
        return "pos/hello";
    }
}
