package com.onlineteaching.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import java.util.concurrent.TimeUnit;

@Configuration
public class StaticResourceConfiguration extends WebMvcConfigurerAdapter {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        registry.addResourceHandler("/js/**").addResourceLocations("file:C:\\Users\\Hov\\Desktop\\GIT JAVA\\WorkPlace\\ot\\src\\main\\resources\\static\\js\\").setCacheControl(CacheControl.maxAge(6000L, TimeUnit.MINUTES));
        registry.addResourceHandler("/css/**").addResourceLocations("file:C:\\Users\\Hov\\Desktop\\GIT JAVA\\WorkPlace\\ot\\src\\main\\resources\\static\\css\\").setCacheControl(CacheControl.maxAge(6000L, TimeUnit.MINUTES));


        super.addResourceHandlers(registry);
    }
}