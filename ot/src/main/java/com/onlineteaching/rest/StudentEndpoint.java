package com.onlineteaching.rest;

import com.onlineteaching.service.StudentService;
import com.onlineteaching.service.TeacherService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/studentData")
@Slf4j
public class StudentEndpoint {

    private final StudentService studentService;

    public StudentEndpoint(TeacherService teacherService, StudentService studentService) {
        this.studentService = studentService;

    }

    @GetMapping("/student")
    ResponseEntity<?> student (@RequestParam(name = "id") long id){

        return ResponseEntity.status(HttpStatus.OK).body(studentService.getStudentById(id));
    }

    @GetMapping("/studentEntity")
    ResponseEntity<?> studentEntity (@RequestParam(name = "id") long id){

        return ResponseEntity.status(HttpStatus.OK).body(studentService.editStudentData(id));
    }
}