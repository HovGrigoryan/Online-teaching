package com.onlineteaching.service.impl;

import com.onlineteaching.dto.MessageDto;
import com.onlineteaching.model.*;
import com.onlineteaching.model.enums.UserStatus;
import com.onlineteaching.model.enums.UserType;
import com.onlineteaching.repository.*;
import com.onlineteaching.service.PageDataService;
import com.onlineteaching.service.mail.EmailService;
import com.querydsl.core.types.Predicate;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
public class PageDataServiceImpl implements PageDataService {

    private final CountryRepository countryRepository;
    private final SubjectTaughtRepository subjectTaughtRepository;
    private final LanguageRepository languageRepository;
    private final UserRepository userRepository;
    private final UserLanguageLevelRepository userLanguageLevelRepository;
    private final EmailService emailService;
    private final PreviewRepository previewRepository;
    private final BookingRepository bookingRepository;

    @Value("${spring.mail.username}")
    private String adminEmail;

    public PageDataServiceImpl(CountryRepository countryRepository,
                               SubjectTaughtRepository subjectTaughtRepository,
                               LanguageRepository languageRepository,
                               UserRepository userRepository,
                               UserLanguageLevelRepository userLanguageLevelRepository,
                               EmailService emailService,
                               PreviewRepository previewRepository, BookingRepository bookingRepository) {
        this.countryRepository = countryRepository;
        this.subjectTaughtRepository = subjectTaughtRepository;
        this.languageRepository = languageRepository;
        this.userRepository = userRepository;
        this.userLanguageLevelRepository = userLanguageLevelRepository;
        this.emailService = emailService;
        this.previewRepository = previewRepository;
        this.bookingRepository = bookingRepository;
    }

    @Override
    public List<Country> getAllCountries() {
        log.info("Country list has been successfully loaded");
        List<Country> all = countryRepository.findAll();
        all.sort(Comparator.comparing(Country::getCountryName));
        return all;


    }

    @Override
    public List<SubjectTaught> getAllSubjectTaughts() {
        List<SubjectTaught> all = subjectTaughtRepository.findAll();
        all.sort(Comparator.comparing(SubjectTaught::getSubjectTaught));
        return all;
    }

    @Override
    public Iterable<User> filter(Predicate predicate) {

        Iterable<User> all = userRepository.findAll(predicate);
        List<User> userList = new ArrayList<>();
        for (User user : all) {
            userList.add(user);
        }

        List<User> collect = userList.stream()
                .filter(user -> user.getUserStatus().equals(UserStatus.VERIFIED))
                .collect(Collectors.toList());

        return collect;
    }

    @Override
    public Set<User> search(String name) {
        Set<User> returnableUsers = new HashSet<>();
        String[] s = name.split(" ");
        for (int i = 0; i < s.length; i++) {
            List<User> userList = userRepository.findAllByUserTypeAndNameContainingOrSurnameContainingOrSubjectTaughtSubjectTaughtContainingIgnoreCase(UserType.TEACHER, s[i], s[i], s[i]);

            List<User> collect = userList.stream()
                    .filter(user -> user.getUserStatus().equals(UserStatus.VERIFIED))
                    .collect(Collectors.toList());

            for (User user : collect) {

                returnableUsers.add(user);
            }
        }
        return returnableUsers;
    }

    @Override
    public void sendMessage(User user, MessageDto messageDto) {

        String content = "Message from " + user.getEmail() + "\n Content: " + messageDto.getContent();

        Mail mail = Mail.builder()
                .content(content)
                .subject(messageDto.getSubject())
                .from(user.getEmail())
                .to(adminEmail)
                .build();
        emailService.sendEmail(mail);
    }

    @Override
    public Integer getMaxHourRate(UserType teacher) {
        List<User> allTeachers = userRepository.findAllByUserType(teacher);
        Integer max = 0;
        for (User user : allTeachers) {
            if (user.getHourlyRate() > max) {
                max = user.getHourlyRate();
            }
        }
        return max;
    }

    @Override
    public double rate(long rate, User user, long id) {


        if (userRepository.findById(id).isPresent()) {
            User teacher = userRepository.findById(id).get();
            if (teacher.getUserType().equals(UserType.TEACHER)) {
                List<Preview> allByTeacherId = previewRepository.findAllByTeacherId(teacher.getId());
                int count = allByTeacherId.size();
                double sum = 0;
                if (previewRepository.findAllByTeacherIdAndUserId(teacher.getId(), user.getId()).size() < 1) {
                    Preview preview = Preview.builder()
                            .content(null)
                            .createdDate(new Date())
                            .teacher(teacher)
                            .user(user)
                            .rate(rate)
                            .build();
                    previewRepository.save(preview);
                }

                for (Preview preview : allByTeacherId) {
                    sum = sum + preview.getRate();
                }
                return sum / count;
            }

        }
        return 0;
    }


    @Override
    public double feedBack(String feedBack, User user, long id) {


        if (userRepository.findById(id).isPresent()) {
            User teacher = userRepository.findById(id).get();

            if (previewRepository.findAllByTeacherIdAndUserId(teacher.getId(), user.getId()).size() != 0) {
                List<Preview> allByTeacherIdAndUserId = previewRepository.findAllByTeacherIdAndUserId(teacher.getId(), user.getId());
                if (allByTeacherIdAndUserId.get(0).getContent() == null || allByTeacherIdAndUserId.get(0).getContent().length() == 0) {
                    allByTeacherIdAndUserId.get(0).setContent(feedBack);
                    previewRepository.save(allByTeacherIdAndUserId.get(0));
                    return 1;
                }
            }

        }
        return 0;
    }


    @Override
    public double feedBackUpdate(User user, long id) {


        if (userRepository.findById(id).isPresent()) {
            User teacher = userRepository.findById(id).get();

            List<Booking> allByTeacherIdAndStudentId = bookingRepository.findAllByTeacherIdAndStudentId(teacher.getId(), user.getId());
            User user1 = userRepository.findById(user.getId()).get();
            if (previewRepository.findAllByTeacherIdAndUserId(teacher.getId(), user.getId()).size() != 0 && allByTeacherIdAndStudentId.size() != 0 && user1.getUserType().equals(UserType.STUDENT)) {
                List<Preview> allByTeacherIdAndUserId = previewRepository.findAllByTeacherIdAndUserId(teacher.getId(), user.getId());
                if (allByTeacherIdAndUserId.get(0).getContent() == null || allByTeacherIdAndUserId.get(0).getContent().length() == 0) {
                    return 1;
                }
            }

        }
        return 0;
    }
}
