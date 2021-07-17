package com.onlineteaching.controller;

import com.onlineteaching.model.enums.LanguageLevel;
import com.onlineteaching.security.CurrentUser;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.stream.Stream;

@Controller
@Slf4j
public class IndexPageController {


    @Value("${images.user}")
    private String userImages;

    @Value("${video.user}")
    private String userVideo;

    @GetMapping
    public String indexPage(ModelMap modelMap,
                            @AuthenticationPrincipal CurrentUser currentUser) {
        if(currentUser!=null){
            modelMap.addAttribute("user", currentUser.getUser());
        }else{
            modelMap.addAttribute("user", null);
        }
        log.info("Index page loaded");
        return "index";
    }

    @GetMapping("/userImage")
    public @ResponseBody
    ResponseEntity<?> mainSliderImage(@RequestParam("image") String image) throws IOException {
        InputStream in = new FileInputStream(userImages + image);
        log.info("User image loaded");
        return ResponseEntity.status(HttpStatus.OK).body(IOUtils.toByteArray(in));
    }

    @GetMapping("/userVideo")
    public @ResponseBody
    ResponseEntity<?> video(@RequestParam("video") String videoUrl) throws IOException {
        InputStream in = new FileInputStream(userVideo + videoUrl);
        log.info("video loaded");
        return ResponseEntity.status(HttpStatus.OK).body(IOUtils.toByteArray(in));
    }

}
