package com.onlineteaching.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StudentRegistrationDto {

    private Long userId;
    private String name;
    private String surname;
    private String phoneNumber;
    private String email;
    private String password;
    private String timezoneSelect;
//    private List<SpokenLanguageDto> spokenLanguages;
//    private String countryName;
    private String avatar;
    private String avatar1;


}
