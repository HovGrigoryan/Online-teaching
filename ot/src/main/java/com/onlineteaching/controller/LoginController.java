package com.onlineteaching.controller;

import com.onlineteaching.security.CurrentUser;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@Slf4j
public class LoginController {

    @GetMapping("/login")
    public String login(@AuthenticationPrincipal CurrentUser currentUser,
                        ModelMap modelMap){
        if(currentUser!=null){
            modelMap.addAttribute("user", currentUser.getUser());
        }else{
            modelMap.addAttribute("user", null);
        }
        return "login";
    }

}
