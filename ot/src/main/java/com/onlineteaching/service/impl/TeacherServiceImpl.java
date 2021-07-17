package com.onlineteaching.service.impl;

import com.onlineteaching.dto.*;
import com.onlineteaching.model.*;
import com.onlineteaching.model.enums.*;
import com.onlineteaching.repository.*;
import com.onlineteaching.service.TeacherService;
import com.onlineteaching.service.mail.EmailService;
import com.onlineteaching.util.RandomStringGeneratorUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@Slf4j

public class TeacherServiceImpl implements TeacherService {

    private final CountryRepository countryRepository;
    private final LanguageRepository languageRepository;
    private final UserTimeZoneRepository userTimeZoneRepository;
    private final SubjectTaughtRepository subjectTaughtRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final PreviewRepository previewRepository;
    private final AvailabilityRepository availabilityRepository;
    private final UserTeacherDayZoneRepository userTeacherDayZoneRepository;
    private final UserLanguageLevelRepository userLanguageLevelRepository;
    private final BookingRepository bookingRepository;

    @Value("${baseUrl}")
    private String baseUrl;

    public TeacherServiceImpl(CountryRepository countryRepository,
                              LanguageRepository languageRepository,
                              UserTimeZoneRepository userTimeZoneRepository,
                              SubjectTaughtRepository subjectTaughtRepository,
                              PasswordEncoder passwordEncoder,
                              UserRepository userRepository,
                              EmailService emailService,
                              PreviewRepository previewRepository,
                              AvailabilityRepository availabilityRepository,
                              UserTeacherDayZoneRepository userTeacherDayZoneRepository,
                              UserLanguageLevelRepository userLanguageLevelRepository,
                              BookingRepository bookingRepository) {
        this.countryRepository = countryRepository;
        this.languageRepository = languageRepository;
        this.userTimeZoneRepository = userTimeZoneRepository;
        this.subjectTaughtRepository = subjectTaughtRepository;
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.emailService = emailService;
        this.previewRepository = previewRepository;
        this.availabilityRepository = availabilityRepository;
        this.userTeacherDayZoneRepository = userTeacherDayZoneRepository;
        this.userLanguageLevelRepository = userLanguageLevelRepository;
        this.bookingRepository = bookingRepository;
    }

    @Override
    public RegistrationPageDto getTeacherRegPageData() {

        List<Country> countries = countryRepository.findAll();
        countries.sort(Comparator.comparing(Country::getCountryName));
        List<Language> languages = languageRepository.findAll();
        languages.sort(Comparator.comparing(Language::getLanguage));
        List<UserTimeZone> userTimeZones = userTimeZoneRepository.findAll();
        userTimeZones.sort(Comparator.comparing(UserTimeZone::getDisplayTimeZone));
        List<SubjectTaught> subjectTaughts = subjectTaughtRepository.findAll();
        subjectTaughts.sort(Comparator.comparing(SubjectTaught::getSubjectTaught));
        String[] languageLevelList = Stream.of(LanguageLevel.values()).map(LanguageLevel::getValue).toArray(String[]::new);

        log.info("Teacher registration page data loaded");
        return RegistrationPageDto.builder()
                .countryList(countries)
                .languageList(languages)
                .languageLevels(languageLevelList)
                .subjectTaughts(subjectTaughts)
                .userTimeZones(userTimeZones)
                .build();
    }

    @Override
    public boolean saveTeacher(TeacherRegistrationDto teacherRegistrationDto) {

        String countryName = teacherRegistrationDto.getCountryName();
        Optional<Country> optionalCountry = countryRepository.findById(Long.parseLong(countryName));
        String email = teacherRegistrationDto.getEmail();
        if (existsByEmail(email)) {
            log.warn("Email is not unique");
            return false;
        }
        if (optionalCountry.isPresent()) {
            Country country = optionalCountry.get();
            Optional<SubjectTaught> subjectTaughtOptional = subjectTaughtRepository.findById(Long.parseLong(teacherRegistrationDto.getSubjectTaught()));
            if (subjectTaughtOptional.isPresent()) {
                SubjectTaught subjectTaught = subjectTaughtOptional.get();
                int count = subjectTaught.getCount();
                int newCount = count++;
                subjectTaught.setCount(newCount);
                subjectTaughtRepository.save(subjectTaught);
                Optional<UserTimeZone> optionalUserTimeZone = userTimeZoneRepository.findById(Long.parseLong(teacherRegistrationDto.getTimezoneSelect()));
                if (optionalUserTimeZone.isPresent()) {
                    UserTimeZone userTimeZone = optionalUserTimeZone.get();
                    String userVideo;
                    if (teacherRegistrationDto.getVimeoVideo().equals("")) {
                        userVideo = teacherRegistrationDto.getAvatarVideo();
                    } else {
                        userVideo = teacherRegistrationDto.getVimeoVideo();
                    }

                    User user = User.builder()
                            .avatar(teacherRegistrationDto.getAvatar())
                            .country(country)
                            .email(teacherRegistrationDto.getEmail())
                            .hourlyRate(Integer.parseInt(teacherRegistrationDto.getHourlyRate()))
                            .name(teacherRegistrationDto.getName())
                            .password(passwordEncoder.encode(teacherRegistrationDto.getPassword()))
                            .phoneNumber(teacherRegistrationDto.getPhoneNumber())
                            .subjectTaught(subjectTaught)
                            .surname(teacherRegistrationDto.getSurname())
                            .userDescription(teacherRegistrationDto.getDescText())
                            .userDescriptionTitle(teacherRegistrationDto.getDescTitle())
                            .userStatus(UserStatus.PENDING)
                            .userTimeZone(userTimeZone)
                            .verifyPicture(null)
                            .userType(UserType.TEACHER)
                            .videoUrl(userVideo)
                            .token(RandomStringGeneratorUtil.uuId())
                            .build();
                    userRepository.save(user);
                    setUserRelationsForSave(teacherRegistrationDto, user, userTimeZone);
                    emailService.sendUserActivationEmail(user.getEmail(), baseUrl + "user/activate?token=" + user.getToken() + "&userId=" + user.getId());
                    log.info("User saved, activation email has been sent successfully");
                }
            }
        }
        return true;
    }

    @Override
    public void activateUser(String token, long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (user.getToken() != null) {
                String tokenFromDb = user.getToken();
                if (tokenFromDb.equals(token)) {
                    user.setToken(null);
                    user.setUserStatus(UserStatus.VERIFIED);
                    userRepository.save(user);
                    log.info("User activated his account successfully");
                }
            }

        }
    }

    @Override
    public List<PopularTeacherDto> popularTeachers() {

        List<PopularTeacherDto> popularTeacherDtoList = new ArrayList<>();
        List<User> userList = userRepository.findTop4ByOrderByCourseDesc();

        List<User> collect = userList.stream()
                .filter(user -> user.getUserStatus().equals(UserStatus.VERIFIED))
                .collect(Collectors.toList());
        List<User> collection = collect.stream()
                .filter(user -> user.getUserType().equals(UserType.TEACHER))
                .collect(Collectors.toList());

        for (User user : collection) {

            if (user.getCourse() != null) {
                PopularTeacherDto popularTeacherDto = PopularTeacherDto.builder()
                        .teacherAvatar(user.getAvatar())
                        .teacherName(user.getName() + " " + user.getSurname())
                        .subjectTaugth(user.getSubjectTaught().getSubjectTaught())
                        .description(user.getUserDescriptionTitle())
                        .bookingCount(user.getCourse())
                        .teacherId(user.getId())
                        .build();
                popularTeacherDtoList.add(popularTeacherDto);
            }
        }
        return popularTeacherDtoList;
    }

    @Override
    public TeacherByCatDto teachersByCategory(Long id) {
        List<User> users = userRepository.findAllBySubjectTaughtId(id);

        List<User> collect = users.stream().filter(user -> user.getUserStatus().equals(UserStatus.VERIFIED))
                .collect(Collectors.toList());


        Optional<SubjectTaught> byId = subjectTaughtRepository.findById(id);
        if (byId.isPresent()) {
            String subjectTaught = byId.get().getSubjectTaught();

            List<PopularTeacherDto> popularTeacherDtoList = new ArrayList<>();
            for (User user : collect) {
                PopularTeacherDto popularTeacherDto = PopularTeacherDto.builder()
                        .bookingCount(user.getCourse())
                        .description(user.getSubjectTaught().getDescription())
                        .subjectTaugth(user.getSubjectTaught().getSubjectTaught())
                        .teacherAvatar(user.getAvatar())
                        .teacherId(user.getId())
                        .teacherName(user.getName())
                        .build();
                popularTeacherDtoList.add(popularTeacherDto);
            }

            return TeacherByCatDto.builder()
                    .popularTeacherDtoList(popularTeacherDtoList)
                    .catName(subjectTaught)
                    .build();

        }

        return null;
    }

    @Override
    public PageableUserDto findAllPageable(Pageable pageable) {

        Page<User> users = userRepository.findAllByUserType(UserType.TEACHER, pageable);
        Set<User> userSet = new HashSet<>(users.getContent());
        List<User> collect = userSet.stream()
                .filter(user -> user.getUserStatus().equals(UserStatus.VERIFIED))
                .collect(Collectors.toList());
        return PageableUserDto.builder()
                .totalPages(users.getTotalPages())
                .userList(collect)
                .build();
    }

    @Override
    public PageableSubjectTaughtDto findAllCoursesPageable(Pageable pageable) {
        Page<SubjectTaught> all = subjectTaughtRepository.findAll(pageable);
        int totalPages = all.getTotalPages();
        Set<SubjectTaught> subjectTaughtSet = new HashSet<>(all.getContent());

        return PageableSubjectTaughtDto.builder()
                .subjectTaughtsList(subjectTaughtSet)
                .totalPages(totalPages)
                .build();
    }

    @Override
    public TeacherInfoDto getTeacherById(long id) {

        User user = userRepository.findByIdAndUserType(id, UserType.TEACHER);
        List<Preview> previews = previewRepository.findAllByTeacherId(id);


        double sum = 0;
        for (Preview preview : previews) {
            sum += preview.getRate();
        }

        double avg = 0.0;
        if (previews.size() == 0) {
            avg = 0.0;
        } else {
            avg = sum / previews.size();
        }

        return TeacherInfoDto.builder()
                .hourlyRate(user.getHourlyRate())
                .id(user.getId())
                .imageUrl(user.getAvatar())
                .previewCount(previews.size())
                .previews(previews)
                .rate(avg)
                .subjectDescription(user.getSubjectTaught().getDescription())
                .subjectTitle(user.getSubjectTaught().getSubjectTaught())
                .userDescription(user.getUserDescription())
                .userName(user.getName())
                .userSurname(user.getSurname())
                .country(user.getCountry().getCountryName())
                .videoUrl(user.getVideoUrl())
                .build();
    }

    @Override
    public boolean checkLessonAvailability(long teacherId, String date, String timeZone) {

        List<UserTeacherDayZone> userIdAndDate = userTeacherDayZoneRepository.findByTeacherIdAndDay(teacherId, date);

        Date newDate = null;
        try {
            newDate = new SimpleDateFormat("yyyy-MM-dd").parse(date);
            SimpleDateFormat simpleDateformat = new SimpleDateFormat("E"); // the day of the week abbreviated
            System.out.println(simpleDateformat.format(newDate));

            simpleDateformat = new SimpleDateFormat("EEEE"); // the day of the week spelled out completely
            System.out.println(simpleDateformat.format(newDate));

            Calendar calendar = Calendar.getInstance();
            calendar.setTime(newDate);
            System.out.println();

            WeekDays weekDays;

            int i = calendar.get(Calendar.DAY_OF_WEEK);

            switch (i) {
                case 1:
                    weekDays = WeekDays.SUNDAY;
                    break;
                case 2:
                    weekDays = WeekDays.MONDAY;
                    break;
                case 3:
                    weekDays = WeekDays.TUESDAY;
                    break;
                case 4:
                    weekDays = WeekDays.WEDNESDAY;
                    break;
                case 5:
                    weekDays = WeekDays.THURSDAY;
                    break;
                case 6:
                    weekDays = WeekDays.FRIDAY;
                    break;
                case 7:
                    weekDays = WeekDays.SATURDAY;
                    break;
                default:
                    weekDays = null;
            }

            List<Availability> byUserIdAndWeekDays = availabilityRepository.findAllByUserIdAndWeekDays(teacherId, weekDays);
            return userIdAndDate.size() == byUserIdAndWeekDays.size();

        } catch (ParseException e) {
            e.printStackTrace();
        }
        return false;
    }

    @Override
    public List<Availability> getAvailableHours(AvailableHoursDto availableHoursDto, String timeZone) {
        String date = availableHoursDto.getDate();
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
        List<Availability> availabilityList = availabilityRepository.findAllByUserIdAndWeekDays(availableHoursDto.getTeacherId(), weekDay);

        List<UserTeacherDayZone> teacherIdAndDay = userTeacherDayZoneRepository.findByTeacherIdAndDay(availableHoursDto.getTeacherId(), availableHoursDto.getDate());
        if (teacherIdAndDay.size() != 0) {

            List<String> startTimeList = new ArrayList<>();
            List<String> endTimeList = new ArrayList<>();
            for (UserTeacherDayZone userTeacherDayZone : teacherIdAndDay) {
                String endTime = userTeacherDayZone.getEndTime();
                String startTime = userTeacherDayZone.getStartTime();
                startTimeList.add(startTime);
                endTimeList.add(endTime);
            }
            int i;
            int j;
            List<Availability> forFrontend = availabilityRepository.findAllByUserIdAndWeekDays(availableHoursDto.getTeacherId(), weekDay);
            for (i = 0; i < startTimeList.size(); i++) {
                for (j = 0; j < endTimeList.size(); j++) {
                    if (i == j) {

                        String st = startTimeList.get(i);
                        String ed = endTimeList.get(j);
                        if (availabilityList.size() > 0) {

                            List<Availability> all = availabilityRepository.findAllByUserIdAndWeekDays(availableHoursDto.getTeacherId(), weekDay);
                            for (Availability availability : all) {

                                if (availability.getFromTime().equals(st) &&
                                        availability.getToTime().equals(ed)) {
                                    forFrontend.remove(availability);
                                }
                            }
                        }
                    }
                }
            }
            return forFrontend;
        }
        return availabilityList;

    }


    @Override
    public User getTeacherEntityById(long id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public EditUserDto editUserData(Long id) {
        if (userRepository.findById(id).isPresent()) {

            return EditUserDto.builder()
                    .user(userRepository.findById(id).get())
                    .userLanguageLevelList(userLanguageLevelRepository.findAllByUserId(id))
                    .availabilityList(availabilityRepository.findAllByUserId(id))
                    .build();
        }
        return null;
    }

    @Override
    public boolean editTeacher(TeacherRegistrationDto teacherRegistrationDto) {

        Long userId = teacherRegistrationDto.getUserId();
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {

            User user = optionalUser.get();

            if (!teacherRegistrationDto.getAvatar().equals("")) {
                user.setAvatar(teacherRegistrationDto.getAvatar());
            }

            if (!teacherRegistrationDto.getAvatarVideo().equals("")) {
                user.setVideoUrl(teacherRegistrationDto.getAvatarVideo());
            }


            if (!teacherRegistrationDto.getCountryName().equals("")) {

                Optional<Country> optionalCountry = countryRepository.findById(Long.parseLong(teacherRegistrationDto.getCountryName()));
                optionalCountry.ifPresent(user::setCountry);

            } else {
                return false;
            }

            if (!teacherRegistrationDto.getDescText().equals("")) {

                user.setUserDescription(teacherRegistrationDto.getDescText());

            } else {
                return false;
            }

            if (!teacherRegistrationDto.getDescTitle().equals("")) {

                user.setUserDescriptionTitle(teacherRegistrationDto.getDescTitle());

            } else {
                return false;
            }

            if (!teacherRegistrationDto.getHourlyRate().equals("")) {

                user.setHourlyRate(Integer.parseInt(teacherRegistrationDto.getHourlyRate()));

            } else {
                return false;
            }

            if (!teacherRegistrationDto.getName().equals("")) {

                user.setName(teacherRegistrationDto.getName());

            } else {
                return false;
            }

            if (!teacherRegistrationDto.getSurname().equals("")) {

                user.setSurname(teacherRegistrationDto.getSurname());

            } else {
                return false;
            }

            if (!teacherRegistrationDto.getPhoneNumber().equals("")) {

                user.setPhoneNumber(teacherRegistrationDto.getPhoneNumber());

            } else {
                return false;
            }


            if (!teacherRegistrationDto.getSubjectTaught().equals("")) {

                Optional<SubjectTaught> optionalSubjectTaught = subjectTaughtRepository.findById(Long.parseLong(teacherRegistrationDto.getSubjectTaught()));
                optionalSubjectTaught.ifPresent(user::setSubjectTaught);

            } else {
                return false;
            }

            if (!teacherRegistrationDto.getVimeoVideo().equals("")) {
                user.setVideoUrl(teacherRegistrationDto.getVimeoVideo());
            }
            if (!teacherRegistrationDto.getAvatarVideo().equals("")) {
                user.setVideoUrl(teacherRegistrationDto.getAvatarVideo());
            }

            if (!teacherRegistrationDto.getTimezoneSelect().equals("")) {
                Optional<UserTimeZone> timeZoneOptional = userTimeZoneRepository.findById(Long.parseLong(teacherRegistrationDto.getTimezoneSelect()));
                timeZoneOptional.ifPresent(user::setUserTimeZone);
            } else {
                return false;
            }

            userRepository.save(user);

            if (!teacherRegistrationDto.getTimezoneSelect().equals("")) {
                Optional<UserTimeZone> timeZoneOptional = userTimeZoneRepository.findById(Long.parseLong(teacherRegistrationDto.getTimezoneSelect()));
                timeZoneOptional.ifPresent(userTimeZone -> setUserRelationsForSave(teacherRegistrationDto, user, userTimeZone));
            } else {
                return false;
            }
        } else {
            return false;
        }
        return true;
    }

    @Override
    public List<Booking> suggestBooking(long id, BookingApprovedStatus bookingApprovedStatus) {
        return bookingRepository.findAllByTeacherIdAndBookingApprovedStatus(id, BookingApprovedStatus.PENDING);

    }

    @Override
    public Booking acceptBooking(long bookingId) {
        Booking byId = bookingRepository.findById(bookingId).orElse(null);
        byId.setBookingApprovedStatus(BookingApprovedStatus.APPROVE);
        bookingRepository.save(byId);
        List<Availability> permanentLessonTimes = byId.getPermanentLessonTimes();
        for (Availability permanentLessonTime : permanentLessonTimes) {
            UserTeacherDayZone utdz = UserTeacherDayZone.builder()
                    .day(byId.getDay())
                    .endTime(permanentLessonTime.getToTime())
                    .startTime(permanentLessonTime.getFromTime())
                    .teacher(byId.getTeacher())
                    .user(byId.getStudent())
                    .build();
            userTeacherDayZoneRepository.save(utdz);
        }


        return byId;
    }

    @Override
    public Booking declineBooking(long bookingId) {
        Booking byId = bookingRepository.findById(bookingId).orElse(null);
        byId.setBookingApprovedStatus(BookingApprovedStatus.DECLINE);
        bookingRepository.save(byId);
        return byId;
    }

    private boolean existsByEmail(String email) {
        Optional<User> byEmail = userRepository.findByEmail(email);
        return byEmail.isPresent();
    }


    private void setUserRelationsForSave(TeacherRegistrationDto teacherRegistrationDto, User user, UserTimeZone userTimeZone) {


        bookingRepository.deleteAll();
        List<Availability> allByUserId = availabilityRepository.findAllByUserId(user.getId());


        availabilityRepository.deleteAll(allByUserId);

        if (teacherRegistrationDto != null && teacherRegistrationDto.getSundayHourObjDto() != null && teacherRegistrationDto.getSundayHourObjDto().getSunday().equals("on")) {

            List<SundayHourDto> sundayHoursList = teacherRegistrationDto.getSundayHourObjDto().getSundayHourList();
            for (SundayHourDto sundayHourDto : sundayHoursList) {

                String sundayEndHour = sundayHourDto.getSundayEndHour();
                String sundayStartHour = sundayHourDto.getSundayStartHour();


                Availability availability = Availability.builder()
                        .fromTime(sundayEndHour)
                        .toTime(sundayStartHour)
                        .user(user)
                        .userTimeZone(userTimeZone)
                        .weekDays(WeekDays.SUNDAY)
                        .build();
                availabilityRepository.save(availability);
            }
        }

        if (teacherRegistrationDto != null && teacherRegistrationDto.getMondayHourObjDto() != null && teacherRegistrationDto.getMondayHourObjDto().getMonday().equals("on")) {
            List<MondayHourDto> mondayHoursList = teacherRegistrationDto.getMondayHourObjDto().getMondayHourList();
            for (MondayHourDto mondayHourDto : mondayHoursList) {
                String mondayStartHour = mondayHourDto.getMondayStartHour();
                String mondayEndHour = mondayHourDto.getMondayEndHour();

                Availability availability = Availability.builder()
                        .fromTime(mondayStartHour)
                        .toTime(mondayEndHour)
                        .user(user)
                        .userTimeZone(userTimeZone)
                        .weekDays(WeekDays.MONDAY)
                        .build();
                availabilityRepository.save(availability);
            }
        }

        if (teacherRegistrationDto != null && teacherRegistrationDto.getTuesdayHourObjDto() != null && teacherRegistrationDto.getTuesdayHourObjDto().getTuesday().equals("on")) {
            List<TuesdayHourDto> tuesdayHoursList = teacherRegistrationDto.getTuesdayHourObjDto().getTuesdayHourList();
            for (TuesdayHourDto tuesdayHourDto : tuesdayHoursList) {
                String tuesdayStartHour = tuesdayHourDto.getTuesdayStartHour();
                String tuesdayEndHour = tuesdayHourDto.getTuesdayEndHour();

                Availability availability = Availability.builder()
                        .fromTime(tuesdayStartHour)
                        .toTime(tuesdayEndHour)
                        .user(user)
                        .userTimeZone(userTimeZone)
                        .weekDays(WeekDays.TUESDAY)
                        .build();
                availabilityRepository.save(availability);
            }
        }

        if (teacherRegistrationDto != null && teacherRegistrationDto.getWednesdayHourObjDto() != null && teacherRegistrationDto.getWednesdayHourObjDto().getWednesday().equals("on")) {
            List<WednesdayHourDto> wednesdayHoursList = teacherRegistrationDto.getWednesdayHourObjDto().getWednesdayHourList();
            for (WednesdayHourDto wednesdayHourDto : wednesdayHoursList) {
                String wednesdayStartHour = wednesdayHourDto.getWednesdayStartHour();
                String wednesdayEndHour = wednesdayHourDto.getWednesdayEndHour();

                Availability availability = Availability.builder()
                        .fromTime(wednesdayStartHour)
                        .toTime(wednesdayEndHour)
                        .user(user)
                        .userTimeZone(userTimeZone)
                        .weekDays(WeekDays.WEDNESDAY)
                        .build();
                availabilityRepository.save(availability);

            }


        }

        if (teacherRegistrationDto != null && teacherRegistrationDto.getThursdayHourObjDto() != null && teacherRegistrationDto.getThursdayHourObjDto().getThursday().equals("on")) {
            List<ThursdayHourDto> thursdayHoursList = teacherRegistrationDto.getThursdayHourObjDto().getThursdayHourList();
            for (ThursdayHourDto thursdayHourDto : thursdayHoursList) {
                String thursdayStartHour = thursdayHourDto.getThursdayStartHour();
                String thursdayEndHour = thursdayHourDto.getThursdayEndHour();

                Availability availability = Availability.builder()
                        .fromTime(thursdayStartHour)
                        .toTime(thursdayEndHour)
                        .user(user)
                        .userTimeZone(userTimeZone)
                        .weekDays(WeekDays.THURSDAY)
                        .build();
                availabilityRepository.save(availability);
            }
        }

        if (teacherRegistrationDto != null && teacherRegistrationDto.getFridayHourObjDto() != null && teacherRegistrationDto.getFridayHourObjDto().getFriday().equals("on")) {
            List<FridayHourDto> fridayHoursList = teacherRegistrationDto.getFridayHourObjDto().getFridayHourList();
            for (FridayHourDto fridayHourDto : fridayHoursList) {
                String fridayStartHour = fridayHourDto.getFridayStartHour();
                String fridayEndHour = fridayHourDto.getFridayEndHour();

                Availability availability = Availability.builder()
                        .fromTime(fridayStartHour)
                        .toTime(fridayEndHour)
                        .user(user)
                        .userTimeZone(userTimeZone)
                        .weekDays(WeekDays.FRIDAY)
                        .build();
                availabilityRepository.save(availability);
            }
        }

        if (teacherRegistrationDto != null && teacherRegistrationDto.getSaturdayHourObjDto() != null && teacherRegistrationDto.getSaturdayHourObjDto().getSaturday().equals("on")) {
            List<SaturdayHourDto> saturdayHoursList = teacherRegistrationDto.getSaturdayHourObjDto().getSaturdayHourList();
            for (SaturdayHourDto saturdayHourDto : saturdayHoursList) {
                String saturdayStartHour = saturdayHourDto.getSaturdayStartHour();
                String saturdayEndHour = saturdayHourDto.getSaturdayEndHour();

                Availability availability = Availability.builder()
                        .fromTime(saturdayStartHour)
                        .toTime(saturdayEndHour)
                        .user(user)
                        .userTimeZone(userTimeZone)
                        .weekDays(WeekDays.SATURDAY)
                        .build();
                availabilityRepository.save(availability);
            }
        }


        List<SpokenLanguageDto> spokenLanguages = teacherRegistrationDto.getSpokenLanguages();

        for (SpokenLanguageDto spokenLanguage : spokenLanguages) {

            Optional<Language> optionalLanguage = languageRepository.findById(spokenLanguage.getLanguage());

            if (optionalLanguage.isPresent()) {

                LanguageLevel languageLevel = null;
                String level = spokenLanguage.getLevel();


                switch (level) {

                    case "A1":
                        languageLevel = LanguageLevel.A1;
                        break;
                    case "A2":
                        languageLevel = LanguageLevel.A2;
                        break;
                    case "B1":
                        languageLevel = LanguageLevel.B1;
                        break;
                    case "B2":
                        languageLevel = LanguageLevel.B2;
                        break;
                    case "C1":
                        languageLevel = LanguageLevel.C1;
                        break;
                    case "C2":
                        languageLevel = LanguageLevel.C2;
                        break;
                    case "NATIVE":
                        languageLevel = LanguageLevel.NATIVE;
                        break;
                }
                List<UserLanguageLevel> allByUserId1 = userLanguageLevelRepository.findAllByUserId(user.getId());
                userLanguageLevelRepository.deleteAll(allByUserId1);


                UserLanguageLevel userLanguageLevel = UserLanguageLevel.builder()
                        .language(optionalLanguage.get())
                        .languageLevel(languageLevel)
                        .user(user)
                        .build();

                userLanguageLevelRepository.save(userLanguageLevel);
            }
        }
    }


}
