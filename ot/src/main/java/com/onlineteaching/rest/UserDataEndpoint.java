package com.onlineteaching.rest;

import com.google.gson.Gson;

import com.onlineteaching.dto.StudentRegistrationDto;
import com.onlineteaching.dto.TeacherRegistrationDto;
import com.onlineteaching.service.StudentService;
import com.onlineteaching.service.TeacherService;
import com.onlineteaching.util.RandomStringGeneratorUtil;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FilenameUtils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

import java.io.IOException;


@RestController
@Slf4j
@RequestMapping("/user")
public class UserDataEndpoint {

    @Value("${images.user}")
    private String userImage;

    private final TeacherService teacherService;
    private final StudentService studentService;

    @Value("${video.user}")
    private String userVideo;

    public UserDataEndpoint(TeacherService teacherService,
                            StudentService studentService) {
        this.teacherService = teacherService;
        this.studentService = studentService;
    }

    @PostMapping("/avatar")
    public ResponseEntity<?> fileUpload(@RequestParam("avatar") MultipartFile multipartFile) {

        File filesdir = new File(userImage);
        if (!filesdir.exists()) {
            filesdir.mkdirs();
        }
        String responce = null;
        if (!multipartFile.isEmpty()) {
            log.info("Image is not empty");
            String originalFilename = multipartFile.getOriginalFilename();
            String extension = FilenameUtils.getExtension(originalFilename);
            originalFilename = RandomStringGeneratorUtil.uuId() + "." + extension;
            try {
                multipartFile.transferTo(new File(filesdir, originalFilename));
                log.info("Image trasfered *********************************");
                log.info("*************************************************");
                log.info("*************************************************");
                log.info("*************************************************");
                log.info("*************************************************");
                log.info("*************************************************");
                log.info("*************************************************");
                log.info("*************************************************");
                log.info("*************************************************");
                log.info("*************************************************");
                log.info("*************************************************");
            } catch (IOException e) {
                e.printStackTrace();
            }
            responce = originalFilename;
        }
        log.info(responce + " sent to front");
        if(responce == null){
            return ResponseEntity.status(HttpStatus.OK).body(null);
        }
        return ResponseEntity.status(HttpStatus.OK).body(new Gson().toJson(responce));
    }

    @PostMapping("/avatarVideo")
    public ResponseEntity<?> videoUpload(@RequestParam("avatarVideo") MultipartFile multipartFile) {

        String responce = null;

        File filesdir = new File(userVideo);
        if (!filesdir.exists()) {
            filesdir.mkdirs();
        }
        if (!multipartFile.isEmpty()) {
            log.info("Video is not empty");

            String originalFilename = multipartFile.getOriginalFilename();
            String extension = FilenameUtils.getExtension(originalFilename);
            originalFilename = RandomStringGeneratorUtil.uuId() + "." + extension;
            try {
                multipartFile.transferTo(new File(filesdir, originalFilename));
                log.info("Video transferred ******************************");
                log.info("*************************************************");
                log.info("*************************************************");
                log.info("*************************************************");
                log.info("*************************************************");
                log.info("*************************************************");
                log.info("*************************************************");
                log.info("*************************************************");
                log.info("*************************************************");
                log.info("*************************************************");
                log.info("*************************************************");
                log.info("*************************************************");
                log.info("file dir  = " + filesdir );
            } catch (IOException e) {
                e.printStackTrace();
            }
            responce = originalFilename;
        }
        log.info(responce +" sent to front");
        if(responce == null){
            return ResponseEntity.status(HttpStatus.OK).body(null);
        }
        return ResponseEntity.status(HttpStatus.OK).body(new Gson().toJson(responce));
    }

    @PostMapping
    public ResponseEntity<?> saveTeacher(@RequestBody TeacherRegistrationDto teacherRegistrationDto) {
        if (teacherService.saveTeacher(teacherRegistrationDto)) {
            log.info("Teacher saved successfully");
            return ResponseEntity.status(HttpStatus.OK).body(new Gson().toJson("Created"));
        }
        log.warn("Duplicate email");
        return ResponseEntity.status(HttpStatus.OK).body(new Gson().toJson("Conflict"));
    }

    @PostMapping("/editUser")
    ResponseEntity<?> editUser(@RequestBody TeacherRegistrationDto teacherRegistrationDto){

        if(teacherService.editTeacher(teacherRegistrationDto)){
            log.info("Teacher updated successfully");
            return ResponseEntity.status(HttpStatus.OK).body(new Gson().toJson("Created"));
        }
        log.warn("Duplicate email");
        return ResponseEntity.status(HttpStatus.OK).body(new Gson().toJson("ERROR"));
    }

    @PostMapping("/editStudent")
    ResponseEntity<?> editStudent(@RequestBody StudentRegistrationDto studentRegistrationDto) {

        if (studentService.editStudent(studentRegistrationDto)) {
            log.info("Student updated successfully");
            return ResponseEntity.status(HttpStatus.OK).body(new Gson().toJson("Created"));
        }
        log.warn("Duplicate email");
        return ResponseEntity.status(HttpStatus.OK).body(new Gson().toJson("ERROR"));
    }

}
