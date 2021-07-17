package com.onlineteaching.util;

import com.onlineteaching.model.Language;
import com.onlineteaching.repository.LanguageRepository;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.Arrays;
import java.util.Locale;
import java.util.Set;
import java.util.TreeSet;
import java.util.stream.Collectors;

@Component
public class LanguageUtil {

    private final LanguageRepository languageRepository;

    public LanguageUtil(LanguageRepository languageRepository) {
        this.languageRepository = languageRepository;
    }


    @PostConstruct
    private void init() {

        if (languageRepository.count() < 1) {

            Set<String> languages = Arrays.stream(Locale.getISOLanguages())
                    .map(Locale::new)
                    .map(Locale::getDisplayLanguage)
                    .collect(Collectors.toCollection(TreeSet::new));

            for (String language : languages) {
                Language lang = Language.builder()
                        .language(language)
                        .build();
                languageRepository.save(lang);
            }
        }

    }

}
