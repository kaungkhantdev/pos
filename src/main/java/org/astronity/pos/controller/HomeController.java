package org.astronity.pos.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/home")
    public String home(Model model) {
        return "pos/home";
    }

    @GetMapping("/")
    public String index(Model model) {
        return "pages/dashboard/index";
    }

    @GetMapping("/hello")
    public String hello(Model model) {
        return "pos/hello";
    }
}
