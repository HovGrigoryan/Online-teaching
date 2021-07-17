package com.onlineteaching.service.impl;

import com.onlineteaching.dto.*;
import com.onlineteaching.model.*;
import com.onlineteaching.model.enums.*;
import com.onlineteaching.repository.*;
import com.onlineteaching.service.StudentService;
import com.onlineteaching.service.mail.EmailService;
import com.onlineteaching.util.RandomStringGeneratorUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@Service
@Slf4j
public class StudentServiceImpl implements StudentService {

    private final CountryRepository countryRepository;
    private final LanguageRepository languageRepository;
    private final UserTimeZoneRepository userTimeZoneRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final AvailabilityRepository availabilityRepository;
    private final BookingRepository bookingRepository;
    private final UserTeacherDayZoneRepository userTeacherDayZoneRepository;
    private final UserLanguageLevelRepository userLanguageLevelRepository;

    @Value("${baseUrl}")
    private String baseUrl;


    public StudentServiceImpl(CountryRepository countryRepository,
                              LanguageRepository languageRepository,
                              UserTimeZoneRepository userTimeZoneRepository,
                              PasswordEncoder passwordEncoder,
                              UserRepository userRepository,
                              EmailService emailService,
                              AvailabilityRepository availabilityRepository,
                              BookingRepository bookingRepository,
                              UserTeacherDayZoneRepository userTeacherDayZoneRepository,
                              UserLanguageLevelRepository userLanguageLevelRepository) {
        this.countryRepository = countryRepository;
        this.languageRepository = languageRepository;
        this.userTimeZoneRepository = userTimeZoneRepository;
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.emailService = emailService;
        this.availabilityRepository = availabilityRepository;
        this.bookingRepository = bookingRepository;
        this.userTeacherDayZoneRepository = userTeacherDayZoneRepository;
        this.userLanguageLevelRepository = userLanguageLevelRepository;
    }

    @Override
    public RegistrationPageDto getStudentRegPageData() {

        List<Country> countries = countryRepository.findAll();
        countries.sort(Comparator.comparing(Country::getCountryName));
        List<Language> languages = languageRepository.findAll();
        languages.sort(Comparator.comparing(Language::getLanguage));
        List<UserTimeZone> userTimeZones = userTimeZoneRepository.findAll();
        userTimeZones.sort(Comparator.comparing(UserTimeZone::getDisplayTimeZone));
        String[] languageLevelList = Stream.of(LanguageLevel.values()).map(LanguageLevel::getValue).toArray(String[]::new);

        log.info("Student registration page data loaded");
        return RegistrationPageDto.builder()
                .countryList(countries)
                .languageList(languages)
                .languageLevels(languageLevelList)
                .userTimeZones(userTimeZones)
                .build();
    }

    @Override
    public boolean saveStudent(StudentRegistrationDto studentRegistrationDto) {
//        String countryName = studentRegistrationDto.getCountryName();
//        Optional<Country> optionalCountry = countryRepository.findById(Long.parseLong(countryName));
        String email = studentRegistrationDto.getEmail();
        if (existsByEmail(email)) {
            log.warn("Email is not unique");
            return false;
        }
//        if (optionalCountry.isPresent()) {
//            Country country = optionalCountry.get();


        Optional<UserTimeZone> optionalUserTimeZone = userTimeZoneRepository.findById(Long.parseLong(studentRegistrationDto.getTimezoneSelect()));
        if (optionalUserTimeZone.isPresent()) {
            UserTimeZone userTimeZone = optionalUserTimeZone.get();

            User user = User.builder()
                    .avatar(studentRegistrationDto.getAvatar())
//                    .country(country)
                    .email(studentRegistrationDto.getEmail())
                    .name(studentRegistrationDto.getName())
                    .password(passwordEncoder.encode(studentRegistrationDto.getPassword()))
                    .phoneNumber(studentRegistrationDto.getPhoneNumber())
                    .surname(studentRegistrationDto.getSurname())
                    .userStatus(UserStatus.PENDING)
                    .userTimeZone(userTimeZone)
                    .verifyPicture(null)
                    .userType(UserType.STUDENT)
                    .token(RandomStringGeneratorUtil.uuId())
                    .build();
            userRepository.save(user);
//            setStudentRelationsForSave(studentRegistrationDto, user, userTimeZone);
            emailService.sendUserActivationEmail(user.getEmail(), baseUrl + "user/activate?token=" + user.getToken() + "&userId=" + user.getId());
            log.info("User saved, activation email has been sent successfully");
        }
//    }
        return true;
    }

    @Override
    public void bookCourse(User user, BookingDto bookingDto) {

        String date = bookingDto.getDate();
        long teacherId = bookingDto.getTeacherId();

        Optional<User> byId = userRepository.findById(teacherId);
        if (byId.isPresent()) {

            String[] split = date.split("-");
            String year = split[0];
            String month = split[1];
            String day = split[2];

            LocalDate localDate = LocalDate.of(Integer.parseInt(year), Integer.parseInt(month), Integer.parseInt(day));
            java.time.DayOfWeek dayOfWeek = localDate.getDayOfWeek();
            WeekDays weekDay = null;
            switch (dayOfWeek) {
                case FRIDAY:
                    weekDay = WeekDays.FRIDAY;
                    break;
                case MONDAY:
                    weekDay = WeekDays.MONDAY;
                    break;
                case SUNDAY:
                    weekDay = WeekDays.SUNDAY;
                    break;
                case TUESDAY:
                    weekDay = WeekDays.TUESDAY;
                    break;
                case SATURDAY:
                    weekDay = WeekDays.SATURDAY;
                    break;
                case THURSDAY:
                    weekDay = WeekDays.THURSDAY;
                    break;
                case WEDNESDAY:
                    weekDay = WeekDays.WEDNESDAY;

            }

            user.setUserBalance(user.getUserBalance() - byId.get().getHourlyRate());
            userRepository.save(user);

            byId.get().setUserBalance(byId.get().getUserBalance() + byId.get().getHourlyRate());
            List<Availability> newAvailabilityList = availabilityRepository.findAllByUserIdAndWeekDays(byId.get().getId(), weekDay);
            if (newAvailabilityList.size() > 0) {
                Availability newAvailability = newAvailabilityList.get(0);
                List<Availability> availabilities = new ArrayList<>();
                availabilities.add(newAvailability);

                Booking booking = Booking.builder()
                        .bookingStatus(BookingStatus.PENDING)
                        .bookType(BookType.PERMANENT)
                        .bookingApprovedStatus(BookingApprovedStatus.PENDING)
                        .student(user)
                        .day(date)
                        .teacher(byId.get())
                        .permanentLessonTimes(availabilities)
                        .build();
                bookingRepository.save(booking);

//                Optional<Availability> optionalAvailability = availabilityRepository.findById(bookingDto.getAvailabilityId());
//                if (optionalAvailability.isPresent()) {
//                    UserTeacherDayZone userTeacherDayZone = UserTeacherDayZone.builder()
//                            .teacher(byId.get())
//                            .startTime(optionalAvailability.get().getFromTime())
//                            .endTime(optionalAvailability.get().getToTime())
//                            .user(user)
//                            .day(date)
//                            .build();
//                    userTeacherDayZoneRepository.save(userTeacherDayZone);
//                }
            }
        }
    }

    @Override
    public List<StudentBookInfoDto> getUserByTeacherIdAndDate(long id, String date) {
        List<UserTeacherDayZone> byTeacherIdAndDay = userTeacherDayZoneRepository.findByTeacherIdAndDay(id, date);
        List<StudentBookInfoDto> userList = new ArrayList<>();
        for (UserTeacherDayZone userTeacherDayZone : byTeacherIdAndDay) {

            StudentBookInfoDto studentBookInfoDto = StudentBookInfoDto.builder()
                    .user(userTeacherDayZone.getUser())
                    .lessonHour(userTeacherDayZone.getStartTime() + ":00 - " + userTeacherDayZone.getEndTime() + ":00")
                    .build();
            userList.add(studentBookInfoDto);
        }
        return userList;
    }

    @Override
    public EditStudentDto editStudentData(Long id) {
        if (userRepository.findById(id).isPresent()) {
            return EditStudentDto.builder()
                    .user(userRepository.findById(id).get())
                    .userLanguageLevelList(userLanguageLevelRepository.findAllByUserId(id))
                    .build();
        }

        return null;
    }

    @Override
    public boolean editStudent(StudentRegistrationDto studentRegistrationDto) {
        Long userId = studentRegistrationDto.getUserId();
        Optional<User> optionalStudent = userRepository.findById(userId);
        if (optionalStudent.isPresent()) {

            User user = optionalStudent.get();
            if (!studentRegistrationDto.getAvatar().equals("")) {
                user.setAvatar(studentRegistrationDto.getAvatar());
            }
//            if (!studentRegistrationDto.getCountryName().equals("")) {
//                Optional<Country> optionalCountry = countryRepository.findById(Long.parseLong(studentRegistrationDto.getCountryName()));
//                optionalCountry.ifPresent(user::setCountry);
//            } else {
//                return false;
//            }
            if (!studentRegistrationDto.getName().equals("")) {

                user.setName(studentRegistrationDto.getName());

            } else {
                return false;
            }
            if (!studentRegistrationDto.getSurname().equals("")) {

                user.setSurname(studentRegistrationDto.getSurname());

            } else {
                return false;
            }
            if (!studentRegistrationDto.getPhoneNumber().equals("")) {

                user.setPhoneNumber(studentRegistrationDto.getPhoneNumber());

            } else {
                return false;
            }

            if (!studentRegistrationDto.getTimezoneSelect().equals("")) {
                Optional<UserTimeZone> timeZoneOptional = userTimeZoneRepository.findById(Long.parseLong(studentRegistrationDto.getTimezoneSelect()));
//                timeZoneOptional.ifPresent(userTimeZone -> setStudentRelationsForUpdate(studentRegistrationDto, user, userTimeZone));
                timeZoneOptional.ifPresent(user::setUserTimeZone);
                userRepository.save(user);
            } else {
                userRepository.save(user);
                return false;
            }
        }
        return true;

    }

//    private void setStudentRelationsForSave(StudentRegistrationDto studentRegistrationDto, User user, UserTimeZone userTimeZone) {
//
//        List<SpokenLanguageDto> spokenLanguages = studentRegistrationDto.getSpokenLanguages();
//
//        for (SpokenLanguageDto spokenLanguage : spokenLanguages) {
//
//            Optional<Language> optionalLanguage = languageRepository.findById(spokenLanguage.getLanguage());
//            if (optionalLanguage.isPresent()) {
//
//
//                LanguageLevel languageLevel = null;
//
//                String level = spokenLanguage.getLevel();
//
//
//                switch (level) {
//
//                    case "A1":
//                        languageLevel = LanguageLevel.A1;
//                        break;
//                    case "A2":
//                        languageLevel = LanguageLevel.A2;
//                        break;
//                    case "B1":
//                        languageLevel = LanguageLevel.B1;
//                        break;
//                    case "B2":
//                        languageLevel = LanguageLevel.B2;
//                        break;
//                    case "C1":
//                        languageLevel = LanguageLevel.C1;
//                        break;
//                    case "C2":
//                        languageLevel = LanguageLevel.C2;
//                        break;
//                    case "NATIVE":
//                        languageLevel = LanguageLevel.NATIVE;
//                        break;
//                }
//
//                UserLanguageLevel userLanguageLevel = UserLanguageLevel.builder()
//                        .language(optionalLanguage.get())
//                        .languageLevel(languageLevel)
//                        .user(user)
//                        .build();
//                userLanguageLevelRepository.save(userLanguageLevel);
//            }
//        }
//    }

//    private void setStudentRelationsForUpdate(StudentRegistrationDto studentRegistrationDto, User user, UserTimeZone userTimeZone) {
//
//        List<SpokenLanguageDto> spokenLanguages = studentRegistrationDto.getSpokenLanguages();
//
//        for (SpokenLanguageDto spokenLanguage : spokenLanguages) {
//
//            Optional<Language> optionalLanguage = languageRepository.findById(spokenLanguage.getLanguage());
//
//            List<UserLanguageLevel> allByUserIdAndLanguageId = userLanguageLevelRepository.findAllByUserIdAndLanguageId(user.getId(), spokenLanguage.getLanguage());
//            if (allByUserIdAndLanguageId!=null) {
//
//                for (UserLanguageLevel userLanguageLevel : allByUserIdAndLanguageId) {
//
//
//                    LanguageLevel languageLevel = null;
//
//                    String level = spokenLanguage.getLevel();
//
//
//                    switch (level) {
//
//                        case "A1":
//                            languageLevel = LanguageLevel.A1;
//                            break;
//                        case "A2":
//                            languageLevel = LanguageLevel.A2;
//                            break;
//                        case "B1":
//                            languageLevel = LanguageLevel.B1;
//                            break;
//                        case "B2":
//                            languageLevel = LanguageLevel.B2;
//                            break;
//                        case "C1":
//                            languageLevel = LanguageLevel.C1;
//                            break;
//                        case "C2":
//                            languageLevel = LanguageLevel.C2;
//                            break;
//                        case "NATIVE":
//                            languageLevel = LanguageLevel.NATIVE;
//                            break;
//                    }
//
//                    userLanguageLevel.setLanguageLevel(languageLevel);
//                    userLanguageLevel.setUser(user);
//                    userLanguageLevel.setLanguage(optionalLanguage.get());
//
//
//                }
//            }
//        }
//    }


    @Override
    public StudentDataDto getStudentById(long id) {
        User user = userRepository.findByIdAndUserType(id, UserType.STUDENT);
        List<UserLanguageLevel> allByLanguageId = userLanguageLevelRepository.findAllByUserId(id);
        return StudentDataDto.builder()
                .id(user.getId())
                .imageUrl(user.getAvatar())
                .userName(user.getName())
                .userSurname(user.getSurname())
                .phoneNumber(user.getPhoneNumber())
                .email(user.getEmail())
//                .country(user.getCountry())
//                .language(allByLanguageId.get(0).getLanguage())
//                .languageLevel(allByLanguageId.get(0).getLanguageLevel())
                .userTimeZone(user.getUserTimeZone())
                .studentBalance(user.getUserBalance())
                .build();
    }

    private boolean existsByEmail(String email) {
        Optional<User> byEmail = userRepository.findByEmail(email);
        return byEmail.isPresent();
    }
}
