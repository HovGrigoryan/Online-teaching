package com.onlineteaching.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ThursdayHourDto {

    private String thursdayStartHour;
    private String thursdayEndHour;

}
