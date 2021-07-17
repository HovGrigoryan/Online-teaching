package com.onlineteaching.service;

import com.onlineteaching.model.SubjectTaught;

import java.util.List;

public interface SubjectTaughtService {

    List<SubjectTaught> featuredCourses();

    List<SubjectTaught> latestCourses();

    List<SubjectTaught> topSubjectTaught();

}
