package com.onlineteaching.util;

import com.onlineteaching.model.UserTimeZone;
import com.onlineteaching.repository.UserTimeZoneRepository;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Set;

@Component
public class TimeZoneUtil {


    private final UserTimeZoneRepository userTimeZoneRepository;

    public TimeZoneUtil(UserTimeZoneRepository userTimeZoneRepository) {
        this.userTimeZoneRepository = userTimeZoneRepository;
    }

    @PostConstruct
    private void init(){
        if (userTimeZoneRepository.count() < 1) {

            Set<String> availableZoneIds = ZoneId.getAvailableZoneIds();

            for (String availableZoneId : availableZoneIds) {

                Instant instant = Instant.now();
                ZoneId z = ZoneId.of(availableZoneId);
                ZonedDateTime zdt = instant.atZone(z);
                String time = zdt.toString().substring(11, 16);

                String name = "";
                String GMT = "";
                if (zdt.toString().substring(23).startsWith("Z")) {
                    GMT = "";
                    name = zdt.toString().substring(25, zdt.toString().length() - 1);
                } else {
                    GMT = zdt.toString().substring(23, 26);
                    name = zdt.toString().substring(30, zdt.toString().length() - 1);
                }

                if (GMT.equals("")) {
                    UserTimeZone userTimeZone = UserTimeZone.builder()
                            .displayTimeZone(time + " " + name)
                            .timeZoneId(availableZoneId)
                            .build();
                    userTimeZoneRepository.save(userTimeZone);
                } else {
                    UserTimeZone userTimeZone = UserTimeZone.builder()
                            .displayTimeZone(time + " (GMT " + GMT + ")" + name)
                            .timeZoneId(availableZoneId)
                            .build();

                    userTimeZoneRepository.save(userTimeZone);
                }
            }
        }
    }
}
