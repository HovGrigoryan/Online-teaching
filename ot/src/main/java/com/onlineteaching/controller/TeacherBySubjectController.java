package com.onlineteaching.controller;

import com.onlineteaching.dto.TeacherByCatDto;
import com.onlineteaching.service.TeacherService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class TeacherBySubjectController {


    private final TeacherService teacherService;

    public TeacherBySubjectController(TeacherService teacherService) {
        this.teacherService = teacherService;
    }

    @GetMapping("/subjectTaught/{id}")
    public String subjectTaughtById(@PathVariable long id,
                                    ModelMap modelMap) {


        TeacherByCatDto teacherByCatDto = teacherService.teachersByCategory(id);

        modelMap.addAttribute("teachersByCategory", teacherByCatDto);
        return "teacherBySubject";


    }

}
