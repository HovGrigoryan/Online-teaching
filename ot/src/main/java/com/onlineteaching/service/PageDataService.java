package com.onlineteaching.service;

import com.onlineteaching.dto.FilterDto;
import com.onlineteaching.dto.MessageDto;
import com.onlineteaching.dto.PopularTeacherDto;
import com.onlineteaching.model.Country;
import com.onlineteaching.model.SubjectTaught;
import com.onlineteaching.model.User;
import com.onlineteaching.model.enums.UserType;
import com.querydsl.core.types.Predicate;

import java.util.List;
import java.util.Set;

public interface PageDataService {

    List<Country> getAllCountries();

    List<SubjectTaught> getAllSubjectTaughts();

    Iterable<User> filter(Predicate predicate);

    Set<User> search(String name);

    void sendMessage(User user, MessageDto messageDto);

    Integer getMaxHourRate(UserType teacher);

    double rate(long rate, User user, long id);

    double feedBack(String feedback, User user, long id);

    double feedBackUpdate(User user, long id);
}
