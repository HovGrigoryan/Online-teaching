package com.onlineteaching.dto;

import com.onlineteaching.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StudentBookInfoDto {

    private User user;
    private String lessonHour;

}
