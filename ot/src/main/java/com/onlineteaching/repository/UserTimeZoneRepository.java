package com.onlineteaching.repository;

import com.onlineteaching.model.UserTimeZone;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserTimeZoneRepository extends JpaRepository<UserTimeZone, Long> {
}
