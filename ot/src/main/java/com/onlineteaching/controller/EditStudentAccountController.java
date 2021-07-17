package com.onlineteaching.controller;

import com.onlineteaching.security.CurrentUser;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class EditStudentAccountController {


    @GetMapping("/editStudentAccount/{id}")
    public String editAccount(@PathVariable long id,
                              @AuthenticationPrincipal CurrentUser currentUser,
                              ModelMap modelMap){
        if(currentUser!=null){
            modelMap.addAttribute("user", currentUser.getUser());
            return "edit-student-course";
        }else{
            return "redirect:/login";
        }
    }

}