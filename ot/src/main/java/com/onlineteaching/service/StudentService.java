package com.onlineteaching.service;

import com.onlineteaching.dto.*;
import com.onlineteaching.model.User;

import java.util.List;

public interface StudentService {

    RegistrationPageDto getStudentRegPageData();

    boolean saveStudent(StudentRegistrationDto studentRegistrationDto);

    void bookCourse(User user, BookingDto bookingDto);

    List<StudentBookInfoDto> getUserByTeacherIdAndDate(long id, String date);

    EditStudentDto editStudentData(Long id);

    boolean editStudent(StudentRegistrationDto studentRegistrationDto);

    StudentDataDto getStudentById(long id);
}
