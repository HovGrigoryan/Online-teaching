package com.onlineteaching.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TeacherRegistrationDto {

    private Long userId;
    private String name;
    private String surname;
    private String phoneNumber;
    private String email;
    private String password;
    private String countryName;
    private List<SpokenLanguageDto> spokenLanguages;
    private String subjectTaught;
    private String descTitle;
    private String descText;
    private String vimeoVideo;
    private String avatarVideo;
    private String avatar;
    private String timezoneSelect;
    private MondayHourObjDto mondayHourObjDto;
    private TuesdayHourObjDto tuesdayHourObjDto;
    private WednesdayHourObjDto wednesdayHourObjDto;
    private ThursdayHourObjDto thursdayHourObjDto;
    private FridayHourObjDto fridayHourObjDto;
    private SaturdayHourObjDto saturdayHourObjDto;
    private SundayHourObjDto sundayHourObjDto;
    private String hourlyRate;

}
