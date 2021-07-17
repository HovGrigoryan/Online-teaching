package com.onlineteaching.rest;

import com.google.gson.Gson;
import com.onlineteaching.dto.*;
import com.onlineteaching.model.SubjectTaught;
import com.onlineteaching.model.User;
import com.onlineteaching.model.enums.UserType;
import com.onlineteaching.security.CurrentUser;
import com.onlineteaching.service.*;
import com.querydsl.core.types.Predicate;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.querydsl.binding.QuerydslPredicate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@Slf4j
@RestController
@RequestMapping("/pageData")
public class PageDataEndpoint {

    private final TeacherService teacherService;
    private final SubjectTaughtService subjectTaughtService;
    private final PreviewService previewService;
    private final PageDataService pageDataService;
    private final StudentService studentService;

    public PageDataEndpoint(TeacherService teacherService,
                            SubjectTaughtService subjectTaughtService,
                            PreviewService previewService,
                            PageDataService pageDataService,
                            StudentService studentService) {
        this.teacherService = teacherService;

        this.subjectTaughtService = subjectTaughtService;
        this.previewService = previewService;
        this.pageDataService = pageDataService;
        this.studentService = studentService;
    }


    @GetMapping("/teacher/registration")
    ResponseEntity<RegistrationPageDto> teacherRegPageData() {
        log.info("Teacher registration page data sent to frontend");
        return ResponseEntity.status(HttpStatus.OK).body(teacherService.getTeacherRegPageData());

    }


    @GetMapping("/all/popular")
    ResponseEntity<?> getAllPopular() {
        log.info("Send teacher top 4 by Rate");
        return ResponseEntity.status(HttpStatus.OK).body(teacherService.popularTeachers());
    }

    @GetMapping("/all/featuredCourses")
    ResponseEntity<?> getAllFeaturedCourses() {
        log.info("Send featuredCourses top 4 by Count");
        return ResponseEntity.status(HttpStatus.OK).body(subjectTaughtService.featuredCourses());
    }

    @GetMapping("/all/previews")
    ResponseEntity<?> getPreviews() {
        log.info("Send featuredCourses top 4 by Count");
        return ResponseEntity.status(HttpStatus.OK).body(previewService.previews());
    }

    @GetMapping("/all/latestCourses")
    ResponseEntity<?> getLatestCourses() {
        log.info("Send 3 latest courses by id");
        return ResponseEntity.status(HttpStatus.OK).body(subjectTaughtService.latestCourses());
    }

    @GetMapping("/all/countries")
    ResponseEntity<?> allCountries() {
        return ResponseEntity.status(HttpStatus.OK).body(pageDataService.getAllCountries());
    }

    @GetMapping("/all/subjectTaught")
    ResponseEntity<?> allSubjectTaught() {
        List<SubjectTaught> allSubjectTaughts = pageDataService.getAllSubjectTaughts();
        return ResponseEntity.ok(allSubjectTaughts);
    }


    @GetMapping("/filter")
    ResponseEntity<?> filter(@QuerydslPredicate(root = User.class) Predicate predicate) {
        Iterable<User> filter = pageDataService.filter(predicate);
        return ResponseEntity.ok(filter);
    }

    @GetMapping("/top/subjectTaught")
    ResponseEntity<?> topSubjectTaughts() {
        List<SubjectTaught> subjectTaughts = subjectTaughtService.topSubjectTaught();
        return ResponseEntity.ok(subjectTaughts);
    }

    @GetMapping("/search")
    ResponseEntity<?> searchTeachers(@RequestParam(name = "q") String name) {
        Set<User> search = pageDataService.search(name);
        return ResponseEntity.ok(search);
    }

    @GetMapping("/courses/")
    ResponseEntity<?> pageableCourses(@RequestParam(value = "page", required = false) Integer page,
                                      @RequestParam(value = "pageSize", required = false) Integer pageSize) {

        Sort sort = Sort.by(
                Sort.Order.desc("id"));
        Pageable pageable = PageRequest.of(page, pageSize, sort);
        return ResponseEntity.ok(teacherService.findAllCoursesPageable(pageable));
    }

    @GetMapping("/instructors")
    ResponseEntity<?> pagableInstructors(@RequestParam(value = "page", required = false) Integer page,
                                         @RequestParam(value = "pageSize", required = false) Integer pageSize) {

        Sort sort = Sort.by(
                Sort.Order.desc("id"));
        Pageable pageable = PageRequest.of(page, pageSize, sort);

        PageableUserDto allInstructorsPageable = teacherService.findAllPageable(pageable);
        return ResponseEntity.ok(allInstructorsPageable);

    }

    @PostMapping("/sendMessage")
    public ResponseEntity<?> sendMessage(@AuthenticationPrincipal CurrentUser currentUser, @RequestBody MessageDto messageDto) {
        if (currentUser != null) {
            pageDataService.sendMessage(currentUser.getUser(), messageDto);
            return ResponseEntity.status(HttpStatus.OK).body(new Gson().toJson("1"));
        }
        return ResponseEntity.status(HttpStatus.OK).body(new Gson().toJson("0"));

    }

    @GetMapping("/getMaxHourRate")
    ResponseEntity<?> getMaxHourRate() {
        Integer maxValue = pageDataService.getMaxHourRate(UserType.TEACHER);
        return ResponseEntity.status(HttpStatus.OK).body(new Gson().toJson(maxValue));
    }


    @PostMapping("/bookCourse")
    ResponseEntity<?> bookCourse(@RequestBody BookingDto bookingDto, @AuthenticationPrincipal CurrentUser currentUser) {

        if (currentUser != null) {
            studentService.bookCourse(currentUser.getUser(), bookingDto);
            return ResponseEntity.status(HttpStatus.OK).body(new Gson().toJson("1"));
        }
        return ResponseEntity.status(HttpStatus.OK).body(new Gson().toJson("0"));
    }

    @GetMapping("/rate")
    ResponseEntity<?> rate(@RequestParam(name = "rate") long rate,
                           @RequestParam(name = "teacherId") long id,
                           @AuthenticationPrincipal CurrentUser currentUser) {
        if (currentUser != null) {
            return ResponseEntity.status(HttpStatus.OK).body(new Gson().toJson(pageDataService.rate(rate, currentUser.getUser(), id)));
        }
        return ResponseEntity.status(HttpStatus.OK).body(new Gson().toJson("0"));
    }

    @GetMapping("/feedBack")
    ResponseEntity<?> feedBack(@RequestParam(name = "feedBack") String feedBack,
                               @RequestParam(name = "teacherId") long id,
                               @AuthenticationPrincipal CurrentUser currentUser) {
        if (currentUser != null) {
            return ResponseEntity.status(HttpStatus.OK).body(new Gson().toJson(pageDataService.feedBack(feedBack, currentUser.getUser(), id)));
        }
        return ResponseEntity.status(HttpStatus.OK).body(new Gson().toJson("0"));
    }

    @GetMapping("/student/registration")
    ResponseEntity<RegistrationPageDto> studentRegPageData() {
        log.info("Student registration page data sent to frontend");
        return ResponseEntity.status(HttpStatus.OK).body(studentService.getStudentRegPageData());

    }


    @GetMapping("/feedBackUpdate")
    ResponseEntity<?> feedBackUpdate(
            @RequestParam(name = "teacherId") long id,
            @AuthenticationPrincipal CurrentUser currentUser) {
        if (currentUser != null) {
            return ResponseEntity.status(HttpStatus.OK).body(new Gson().toJson(pageDataService.feedBackUpdate(currentUser.getUser(), id)));
        }
        return ResponseEntity.status(HttpStatus.OK).body(new Gson().toJson("0"));
    }

}
