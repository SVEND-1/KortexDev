package org.example.kortexdev.config;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class Page {

    @GetMapping("/")
    public String index() {
        return "forward:/index.html";
    }
    @GetMapping("/admin")
    public String adminPage() {
        return "forward:/admin.html";
    }

    @GetMapping("/login")
    public String login() {
        return "forward:/login.html";
    }

}
