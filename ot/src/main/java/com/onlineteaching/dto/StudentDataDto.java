package com.onlineteaching.dto;


import com.onlineteaching.model.Country;
import com.onlineteaching.model.Language;
import com.onlineteaching.model.UserTimeZone;
import com.onlineteaching.model.enums.LanguageLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class StudentDataDto {

    private Long id;
    private String userName;
    private String userSurname;
    private String phoneNumber;
    private String email;
    private Country country;
    private Language language;
    private LanguageLevel languageLevel;
    private UserTimeZone userTimeZone;
    private String imageUrl;
    private double studentBalance;

}