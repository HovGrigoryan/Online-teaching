package com.onlineteaching.repository;

import com.onlineteaching.model.SubjectTaught;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubjectTaughtRepository extends JpaRepository<SubjectTaught, Long> {

    List<SubjectTaught> findTop4ByOrderByCountDesc();

    List<SubjectTaught> findTop3ByOrderByCountDesc();

    List<SubjectTaught> findTop6ByOrderByCountDesc();

}
