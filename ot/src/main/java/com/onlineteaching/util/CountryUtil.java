package com.onlineteaching.util;

import com.onlineteaching.model.Country;
import com.onlineteaching.repository.CountryRepository;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.Locale;

@Component
public class CountryUtil {

    private final CountryRepository countryRepository;

    public CountryUtil(CountryRepository countryRepository) {
        this.countryRepository = countryRepository;
    }

    @PostConstruct
    private void init(){


        if (countryRepository.count() < 1){

            String[] countryCodes = Locale.getISOCountries();

            for (String countryCode : countryCodes) {

                Locale obj = new Locale("", countryCode);

                Country country = Country.builder()
                        .countryName(obj.getDisplayCountry())
                        .build();
                countryRepository.save(country);

            }


        }


    }

}
