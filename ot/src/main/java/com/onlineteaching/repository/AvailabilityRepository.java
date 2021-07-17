package com.onlineteaching.repository;

import com.onlineteaching.model.Availability;
import com.onlineteaching.model.enums.WeekDays;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AvailabilityRepository extends JpaRepository<Availability, Long> {

    List<Availability> findAllByUserIdAndWeekDays(Long id, WeekDays weekDays);
    List<Availability> findAllByUserId(Long id);
}
