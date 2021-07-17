package com.onlineteaching.service.impl;

import com.onlineteaching.model.SubjectTaught;
import com.onlineteaching.repository.SubjectTaughtRepository;
import com.onlineteaching.service.SubjectTaughtService;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class SubjectTaughtServiceImpl implements SubjectTaughtService {

    private final SubjectTaughtRepository subjectTaughtRepository;

    public SubjectTaughtServiceImpl(SubjectTaughtRepository subjectTaughtRepository) {
        this.subjectTaughtRepository = subjectTaughtRepository;
    }

    @Override
    public List<SubjectTaught> featuredCourses() {

        return subjectTaughtRepository.findTop4ByOrderByCountDesc();


    }

    @Override
    public List<SubjectTaught> latestCourses() {
        return subjectTaughtRepository.findTop3ByOrderByCountDesc();
    }

    @Override
    public List<SubjectTaught> topSubjectTaught() {
        return subjectTaughtRepository.findTop6ByOrderByCountDesc();
    }
}
