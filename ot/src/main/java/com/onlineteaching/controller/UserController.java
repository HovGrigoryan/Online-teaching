package com.onlineteaching.controller;

import com.onlineteaching.dto.TeacherRegistrationDto;
import com.onlineteaching.service.TeacherService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/user")
public class UserController {

    private final TeacherService teacherService;

    public UserController(TeacherService teacherService) {
        this.teacherService = teacherService;
    }



    @GetMapping("/activate")
    public String activate(@RequestParam(name = "token") String token, @RequestParam(name = "userId") long userId){
        teacherService.activateUser(token, userId);
        return "redirect:/";
    }

}
