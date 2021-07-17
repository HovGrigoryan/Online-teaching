package com.onlineteaching.util;

import com.onlineteaching.model.Booking;
import com.onlineteaching.model.User;
import com.onlineteaching.model.enums.BookType;
import com.onlineteaching.model.enums.BookingStatus;
import com.onlineteaching.model.enums.UserType;
import com.onlineteaching.repository.BookingRepository;
import com.onlineteaching.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.List;

//@Component
@Slf4j
public class BookingUtil {

    private final UserRepository userRepository;
    private final BookingRepository bookingRepository;


    public BookingUtil(UserRepository userRepository,
                       BookingRepository bookingRepository) {
        this.userRepository = userRepository;
        this.bookingRepository = bookingRepository;
    }


    @PostConstruct
    private void init() {
        createBookings();
    }

    private void createBookings() {

        long count = userRepository.count();
        if (count >= 2) {

            List<User> allUsers = userRepository.findAll();
            User user = allUsers.get(0);
            log.info(user.getName());
            User user1 = allUsers.get(1);
            log.info(user1.getName());

            User teacher = null;
            User student = null;

            if (user.getUserType().equals(UserType.TEACHER)) {
                teacher = user;
            } else {
                student = user;
            }

            if (user1.getUserType().equals(UserType.TEACHER)) {
                teacher = user1;
            } else {
                student = user1;
            }

            if (bookingRepository.count() < 1) {

                Booking booking = Booking.builder()
                        .bookingStatus(BookingStatus.PAYED)
                        .bookType(BookType.PERMANENT)
                        .permanentLessonTimes(null)
                        .student(student)
                        .teacher(teacher)
                        .trialLessonTime(null)
                        .build();
                bookingRepository.save(booking);
            }
        }
    }
}