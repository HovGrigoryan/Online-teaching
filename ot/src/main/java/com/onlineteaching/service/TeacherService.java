package com.onlineteaching.service;

import com.onlineteaching.dto.*;
import com.onlineteaching.model.*;
import com.onlineteaching.model.enums.BookingApprovedStatus;
import org.springframework.data.domain.Pageable;

import java.awt.print.Book;
import java.util.List;
import java.util.Set;

public interface TeacherService {

    RegistrationPageDto getTeacherRegPageData();


    boolean saveTeacher(TeacherRegistrationDto teacherRegistrationDto);

    void activateUser(String token, long userId);

    List<PopularTeacherDto> popularTeachers();

    TeacherByCatDto teachersByCategory(Long id);

    PageableUserDto findAllPageable(Pageable pageable);

    PageableSubjectTaughtDto findAllCoursesPageable(Pageable pageable);

    TeacherInfoDto getTeacherById(long id);

    boolean checkLessonAvailability(long teacherId, String date, String timeZone);

    List<Availability> getAvailableHours(AvailableHoursDto availableHoursDto, String timeZone);

    User getTeacherEntityById(long id);

    EditUserDto editUserData(Long id);

    boolean editTeacher(TeacherRegistrationDto teacherRegistrationDto);

    List<Booking> suggestBooking(long id, BookingApprovedStatus bookingApprovedStatus);

    Booking acceptBooking(long bookingId);

    Booking declineBooking(long bookingId);


//    List<SubjectTaught> findAllCoursesPageable(Pageable pageable);

//    List<User> findExample(Predicate predicate);
}
