package com.onlineteaching.dto;

import com.onlineteaching.model.Availability;
import com.onlineteaching.model.User;
import com.onlineteaching.model.UserLanguageLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EditUserDto {

    private User user;
    private List<UserLanguageLevel> userLanguageLevelList;
    private List<Availability> availabilityList;

}
