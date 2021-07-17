package com.onlineteaching.repository;

import com.onlineteaching.model.Preview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PreviewRepository extends JpaRepository<Preview, Long> {


//    List<Preview> findTop4ByOrderByDesc();

//    List<Preview> getUseByTop4ByRateOrderByDesc();


//@Query(value = "SELECT * FROM previews u WHERE u.rate = ?1 ORDER BY RAND() LIMIT 3",
//            nativeQuery = true)


    @Query(value = "select * from preview order by rand() limit 3",
            nativeQuery = true)
    List<Preview> findTop3ByOrderByRateDesc();

    List<Preview> findAllByTeacherId(Long id);

    List<Preview> findAllByTeacherIdAndUserId(Long teacherId, Long userId);

}
