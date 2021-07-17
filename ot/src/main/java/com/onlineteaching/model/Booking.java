package com.onlineteaching.model;

import com.onlineteaching.model.enums.BookType;
import com.onlineteaching.model.enums.BookingApprovedStatus;
import com.onlineteaching.model.enums.BookingStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    private User teacher;

    @ManyToOne
    private User student;

    @Column
    private String day;

    @ManyToOne
    private Availability trialLessonTime;

    @ManyToMany
    List<Availability> permanentLessonTimes;

    @Enumerated(EnumType.STRING)
    private BookType bookType;

    @Enumerated(EnumType.STRING)
    private BookingStatus bookingStatus;


    @Enumerated(EnumType.STRING)
    private BookingApprovedStatus bookingApprovedStatus;



}
