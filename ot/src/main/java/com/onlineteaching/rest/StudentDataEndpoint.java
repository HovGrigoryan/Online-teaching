package com.onlineteaching.rest;

import com.google.gson.Gson;
import com.onlineteaching.dto.StudentRegistrationDto;
import com.onlineteaching.dto.TeacherRegistrationDto;
import com.onlineteaching.service.StudentService;
import com.onlineteaching.util.RandomStringGeneratorUtil;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;


@RestController
@RequestMapping("/student")
public class StudentDataEndpoint {

    @Value("${images.user}")
    private String userImage;

    private final StudentService studentService;

    public StudentDataEndpoint(StudentService studentService) {
        this.studentService = studentService;
    }


    @PostMapping("/avatar")
    public ResponseEntity<?> fileUpload(@RequestParam("avatar") MultipartFile multipartFile) {

        File filesdir = new File(userImage);
        if (!filesdir.exists()) {
            filesdir.mkdirs();
        }
        String responce = "";
        if (!multipartFile.isEmpty()) {

            String originalFilename = multipartFile.getOriginalFilename();
            String extension = FilenameUtils.getExtension(originalFilename);
            originalFilename = RandomStringGeneratorUtil.uuId() + "." + extension;
            try {
                multipartFile.transferTo(new File(filesdir, originalFilename));
            } catch (IOException e) {
                e.printStackTrace();
            }
            responce = originalFilename;
        }
        return ResponseEntity.status(HttpStatus.OK).body(new Gson().toJson(responce));
    }


    @PostMapping
    public ResponseEntity<?> saveStudent(@RequestBody StudentRegistrationDto studentRegistrationDto){
        System.out.println(studentRegistrationDto);
        if(studentService.saveStudent(studentRegistrationDto)){
            return ResponseEntity.status(HttpStatus.OK).body(new Gson().toJson("Created"));
        }
        return ResponseEntity.status(HttpStatus.OK).body(new Gson().toJson("Conflict"));
    }


    @GetMapping("/getUserByTeacherIdAndDate")
    ResponseEntity<?> getUserByTeacherIdAndDate(@RequestParam(name = "id") long id, @RequestParam(name = "date") String date){
        return ResponseEntity.status(HttpStatus.OK).body(studentService.getUserByTeacherIdAndDate(id, date));
    }


}
