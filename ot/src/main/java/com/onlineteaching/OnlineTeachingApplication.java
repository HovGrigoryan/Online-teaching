package com.onlineteaching;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
public class OnlineTeachingApplication {

    public static void main(String[] args) {
        SpringApplication.run(OnlineTeachingApplication.class, args);
    }

}
