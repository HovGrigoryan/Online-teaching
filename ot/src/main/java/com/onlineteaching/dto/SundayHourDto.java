package com.onlineteaching.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SundayHourDto {

    private String sundayStartHour;
    private String sundayEndHour;

}
