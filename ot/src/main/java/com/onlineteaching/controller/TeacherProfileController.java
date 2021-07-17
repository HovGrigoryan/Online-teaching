package com.onlineteaching.controller;

import com.onlineteaching.security.CurrentUser;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class TeacherProfileController {

    @GetMapping("/teacherProfile")
    public String login(@AuthenticationPrincipal CurrentUser currentUser,
                        ModelMap modelMap) {
        if (currentUser != null) {
            modelMap.addAttribute("user", currentUser.getUser());
            return "instructor-profile";
        } else {
            modelMap.addAttribute("user", null);
            return "redirect:/login";
        }
    }

}
