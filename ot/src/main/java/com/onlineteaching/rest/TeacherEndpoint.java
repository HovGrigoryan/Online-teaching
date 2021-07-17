package com.onlineteaching.rest;

import com.google.gson.Gson;
import com.onlineteaching.dto.AvailableHoursDto;
import com.onlineteaching.dto.TeacherIdDateDto;
import com.onlineteaching.model.Availability;
import com.onlineteaching.model.enums.BookingApprovedStatus;
import com.onlineteaching.service.TeacherService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/teacherData")
@Slf4j
public class TeacherEndpoint {
    private final TeacherService teacherService;

    public TeacherEndpoint(TeacherService teacherService) {
        this.teacherService = teacherService;
    }

    @GetMapping("/teacher")
    ResponseEntity<?> teacher (@RequestParam(name = "id") long id){

        return ResponseEntity.status(HttpStatus.OK).body(teacherService.getTeacherById(id));
    }

    @GetMapping("/teacherEntity")
    ResponseEntity<?> teacherEntity (@RequestParam(name = "id") long id){

        return ResponseEntity.status(HttpStatus.OK).body(teacherService.editUserData(id));
    }

    @PostMapping("/checkLessonAvailability")
    public ResponseEntity<?> checkLessonAvailability(@RequestBody TeacherIdDateDto teacherDataDto,
                                                     @RequestHeader("timeZone") String timezone){



        if(!teacherService.checkLessonAvailability(teacherDataDto.getTeacherId(), teacherDataDto.getDate(), timezone)){
            return ResponseEntity.status(HttpStatus.OK).body(new Gson().toJson("0"));
        }else{
            return ResponseEntity.status(HttpStatus.OK).body(new Gson().toJson("1"));
        }

    }

    @PostMapping("/suggestBooking")
    ResponseEntity<?> suggestBooking(@RequestParam(name = "teacherId") long id){
        return ResponseEntity.status(HttpStatus.OK).body(teacherService.suggestBooking(id, BookingApprovedStatus.PENDING));
    }

    @PostMapping("/getAvailableHours")
    ResponseEntity<?> getAvailableHours(@RequestBody AvailableHoursDto availableHoursDto,
                                        @RequestHeader("timeZone") String timeZone) {
        return ResponseEntity.status(HttpStatus.OK).body(teacherService.getAvailableHours(availableHoursDto, timeZone));
    }

    @GetMapping("/acceptBooking")
    ResponseEntity<?> acceptBooking(@RequestParam(name = "bookingId") long bookingId){
        return ResponseEntity.status(HttpStatus.OK).body(teacherService.acceptBooking(bookingId));
    }

    @GetMapping("/declineBooking")
    ResponseEntity<?> declineBooking(@RequestParam(name = "bookingId") long bookingId) {
        return ResponseEntity.status(HttpStatus.OK).body(teacherService.declineBooking(bookingId));
    }

}
