package com.onlineteaching.dto;

import com.onlineteaching.model.SubjectTaught;
import com.onlineteaching.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PageableSubjectTaughtDto {

    int totalPages;
    Set<SubjectTaught> subjectTaughtsList;

}
