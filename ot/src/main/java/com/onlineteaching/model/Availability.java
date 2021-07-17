package com.onlineteaching.model;

import com.onlineteaching.model.enums.WeekDays;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Availability {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    private User user;

    @Enumerated(EnumType.STRING)
    private WeekDays weekDays;

    @Column
    private String fromTime;

    @Column
    private String toTime;

    @ManyToOne
    private UserTimeZone userTimeZone;


}
