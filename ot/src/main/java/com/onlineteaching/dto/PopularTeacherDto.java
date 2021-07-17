package com.onlineteaching.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PopularTeacherDto {

private String teacherName;
private String teacherAvatar;
private String subjectTaugth;
private String description;
private int bookingCount;
private long teacherId;

}
