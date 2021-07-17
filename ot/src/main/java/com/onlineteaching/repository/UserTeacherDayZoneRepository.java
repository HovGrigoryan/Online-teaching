package com.onlineteaching.repository;

import com.onlineteaching.model.UserTeacherDayZone;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserTeacherDayZoneRepository extends JpaRepository<UserTeacherDayZone, Long> {
    List<UserTeacherDayZone> findByTeacherIdAndDay(Long teacherId, String date);
}
