package com.onlineteaching.dto;


import com.onlineteaching.model.Preview;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class TeacherInfoDto {

    private String videoUrl;
    private Long id;
    private String subjectTitle;
    private String subjectDescription;
    private double rate;
    private int previewCount;
    private List<Preview> previews;
    private Integer hourlyRate;
    private String userDescription;
    private String userName;
    private String userSurname;
    private String country;
    private String imageUrl;

}
