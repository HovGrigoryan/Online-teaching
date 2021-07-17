package com.onlineteaching.repository;

import com.onlineteaching.model.UserLanguageLevel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserLanguageLevelRepository extends JpaRepository<UserLanguageLevel, Long> {
    List<UserLanguageLevel> findAllByLanguageId(long languageId);

    List<UserLanguageLevel> findAllByUserId(Long id);

    List<UserLanguageLevel> findAllByUserIdAndLanguageId(Long userId, Long languageId);

}
