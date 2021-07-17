package com.onlineteaching.dto;

import com.onlineteaching.model.Country;
import com.onlineteaching.model.Language;
import com.onlineteaching.model.SubjectTaught;
import com.onlineteaching.model.UserTimeZone;
import com.onlineteaching.model.enums.LanguageLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegistrationPageDto {

    List<Country> countryList;
    List<Language> languageList;
    String[] languageLevels;
    List<SubjectTaught> subjectTaughts;
    List<UserTimeZone> userTimeZones;

}
