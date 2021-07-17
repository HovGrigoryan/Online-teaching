package com.onlineteaching.controller;

import com.onlineteaching.security.CurrentUser;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class StudentProfileController {

    @GetMapping("/studentProfile")
    public String login(@AuthenticationPrincipal CurrentUser currentUser,
                        ModelMap modelMap) {
        if (currentUser != null) {
            modelMap.addAttribute("user", currentUser.getUser());
            return "instructor-student-profile";
        } else {
            modelMap.addAttribute("user", null);
            return "redirect:/login";
        }
    }


}