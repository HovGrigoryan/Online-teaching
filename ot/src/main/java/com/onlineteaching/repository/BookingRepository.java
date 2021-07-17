package com.onlineteaching.repository;

import com.onlineteaching.model.Booking;
import com.onlineteaching.model.enums.BookingApprovedStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findAllByTeacherIdAndStudentId(Long teacherId, Long userId);

    List<Booking> findAllByTeacherIdAndBookingApprovedStatus(Long teacherId, BookingApprovedStatus bookingApprovedStatus);
}
