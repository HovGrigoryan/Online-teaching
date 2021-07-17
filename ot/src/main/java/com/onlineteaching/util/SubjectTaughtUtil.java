package com.onlineteaching.util;

import com.onlineteaching.model.SubjectTaught;
import com.onlineteaching.repository.SubjectTaughtRepository;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class SubjectTaughtUtil {


    private final SubjectTaughtRepository subjectTaughtRepository;

    public SubjectTaughtUtil(SubjectTaughtRepository subjectTaughtRepository) {
        this.subjectTaughtRepository = subjectTaughtRepository;
    }

    @PostConstruct
    public void init() {

        if (subjectTaughtRepository.count() < 1) {

            SubjectTaught subjectTaught1 = SubjectTaught.builder()
                    .subjectTaught("English language")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught1);

            SubjectTaught subjectTaught2 = SubjectTaught.builder()
                    .subjectTaught("Spanish language")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught2);

            SubjectTaught subjectTaught3 = SubjectTaught.builder()
                    .subjectTaught("French language").count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught3);

            SubjectTaught subjectTaught4 = SubjectTaught.builder()
                    .subjectTaught("Japanese language")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught4);

            SubjectTaught subjectTaught5 = SubjectTaught.builder()
                    .subjectTaught("German language")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught5);

            SubjectTaught subjectTaught6 = SubjectTaught.builder()
                    .subjectTaught("Russian language")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught6);

            SubjectTaught subjectTaught7 = SubjectTaught.builder()
                    .subjectTaught("Chinese language")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught7);

            SubjectTaught subjectTaught8 = SubjectTaught.builder()
                    .subjectTaught("Italian language")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught8);

            SubjectTaught subjectTaught9 = SubjectTaught.builder()
                    .subjectTaught("Portuguese language")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught9);

            SubjectTaught subjectTaught10 = SubjectTaught.builder()
                    .subjectTaught("Arabic language")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught10);

            SubjectTaught subjectTaught11 = SubjectTaught.builder()
                    .subjectTaught("Polish language")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught11);

            SubjectTaught subjectTaught12 = SubjectTaught.builder()
                    .subjectTaught("Ukrainian language")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught12);

            SubjectTaught subjectTaught13 = SubjectTaught.builder()
                    .subjectTaught("Arts")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught13);

            SubjectTaught subjectTaught14 = SubjectTaught.builder()
                    .subjectTaught("Music")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught14);

            SubjectTaught subjectTaught15 = SubjectTaught.builder()
                    .subjectTaught("Acting skills")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught15);

            SubjectTaught subjectTaught16 = SubjectTaught.builder()
                    .subjectTaught("Art classes")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught16);

            SubjectTaught subjectTaught17 = SubjectTaught.builder()
                    .subjectTaught("Math")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught17);

            SubjectTaught subjectTaught18 = SubjectTaught.builder()
                    .subjectTaught("Algebra")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught18);

            SubjectTaught subjectTaught19 = SubjectTaught.builder()
                    .subjectTaught("Geometry")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught19);

            SubjectTaught subjectTaught20 = SubjectTaught.builder()
                    .subjectTaught("Physics")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught20);

            SubjectTaught subjectTaught21 = SubjectTaught.builder()
                    .subjectTaught("Geography")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught21);

            SubjectTaught subjectTaught22 = SubjectTaught.builder()
                    .subjectTaught("Biology")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught22);

            SubjectTaught subjectTaught23 = SubjectTaught.builder()
                    .subjectTaught("Chemistry")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught23);

            SubjectTaught subjectTaught24 = SubjectTaught.builder()
                    .subjectTaught("Computer science")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught24);

            SubjectTaught subjectTaught25 = SubjectTaught.builder()
                    .subjectTaught("Sales")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught25);

            SubjectTaught subjectTaught26 = SubjectTaught.builder()
                    .subjectTaught("Objective C")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught26);

            SubjectTaught subjectTaught27 = SubjectTaught.builder()
                    .subjectTaught("С#")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught27);

            SubjectTaught subjectTaught28 = SubjectTaught.builder()
                    .subjectTaught("С++")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught28);

            SubjectTaught subjectTaught29 = SubjectTaught.builder()
                    .subjectTaught("Data Science")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught29);

            SubjectTaught subjectTaught30 = SubjectTaught.builder()
                    .subjectTaught("UX/UI")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught30);

            SubjectTaught subjectTaught31 = SubjectTaught.builder()
                    .subjectTaught("Business Modelling")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught31);

            SubjectTaught subjectTaught32 = SubjectTaught.builder()
                    .subjectTaught("Product Management")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught32);

            SubjectTaught subjectTaught33 = SubjectTaught.builder()
                    .subjectTaught("Corporate Finance")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught33);

            SubjectTaught subjectTaught34 = SubjectTaught.builder()
                    .subjectTaught("Business Strategy")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught34);

            SubjectTaught subjectTaught35 = SubjectTaught.builder()
                    .subjectTaught("Business Analytics")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught35);

            SubjectTaught subjectTaught36 = SubjectTaught.builder()
                    .subjectTaught("Public speaking")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught36);

            SubjectTaught subjectTaught37 = SubjectTaught.builder()
                    .subjectTaught("Graphic design")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught37);

            SubjectTaught subjectTaught38 = SubjectTaught.builder()
                    .subjectTaught("Motion design")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught38);

            SubjectTaught subjectTaught39 = SubjectTaught.builder()
                    .subjectTaught("IT Project Management")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught39);

            SubjectTaught subjectTaught40 = SubjectTaught.builder()
                    .subjectTaught("Artificial intelligence")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught40);

            SubjectTaught subjectTaught41 = SubjectTaught.builder()
                    .subjectTaught("3D design")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught41);

            SubjectTaught subjectTaught42 = SubjectTaught.builder()
                    .subjectTaught("R")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught42);

            SubjectTaught subjectTaught43 = SubjectTaught.builder()
                    .subjectTaught("SEO")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught43);

            SubjectTaught subjectTaught44 = SubjectTaught.builder()
                    .subjectTaught("Writing")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught44);

            SubjectTaught subjectTaught45 = SubjectTaught.builder()
                    .subjectTaught("Sociology")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught45);

            SubjectTaught subjectTaught46 = SubjectTaught.builder()
                    .subjectTaught("Philosophy")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught46);

            SubjectTaught subjectTaught47 = SubjectTaught.builder()
                    .subjectTaught("Psychology")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught47);

            SubjectTaught subjectTaught48 = SubjectTaught.builder()
                    .subjectTaught("Statistics")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught48);

            SubjectTaught subjectTaught49 = SubjectTaught.builder()
                    .subjectTaught("Business & Management")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught49);

            SubjectTaught subjectTaught50 = SubjectTaught.builder()
                    .subjectTaught("Accounting")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught50);

            SubjectTaught subjectTaught51 = SubjectTaught.builder()
                    .subjectTaught("Tests")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught51);

            SubjectTaught subjectTaught52 = SubjectTaught.builder()
                    .subjectTaught("Economics")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught52);

            SubjectTaught subjectTaught53 = SubjectTaught.builder()
                    .subjectTaught("Literature")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught53);

            SubjectTaught subjectTaught54 = SubjectTaught.builder()
                    .subjectTaught("Law")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught54);

            SubjectTaught subjectTaught55 = SubjectTaught.builder()
                    .subjectTaught("SMM")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught55);

            SubjectTaught subjectTaught56 = SubjectTaught.builder()
                    .subjectTaught("PPC")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught56);

            SubjectTaught subjectTaught57 = SubjectTaught.builder()
                    .subjectTaught("Copywriting")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught57);

            SubjectTaught subjectTaught58 = SubjectTaught.builder()
                    .subjectTaught("Copywriting")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught58);

            SubjectTaught subjectTaught59 = SubjectTaught.builder()
                    .subjectTaught("Email marketing")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught59);

            SubjectTaught subjectTaught60 = SubjectTaught.builder()
                    .subjectTaught("PR")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught60);

            SubjectTaught subjectTaught61 = SubjectTaught.builder()
                    .subjectTaught("Dota 2")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught61);

            SubjectTaught subjectTaught62 = SubjectTaught.builder()
                    .subjectTaught("Web Development")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught62);

            SubjectTaught subjectTaught63 = SubjectTaught.builder()
                    .subjectTaught("Web Analytics")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught63);

            SubjectTaught subjectTaught64 = SubjectTaught.builder()
                    .subjectTaught("International Business")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught64);

            SubjectTaught subjectTaught65 = SubjectTaught.builder()
                    .subjectTaught("Marketing Strategy")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught65);

            SubjectTaught subjectTaught66 = SubjectTaught.builder()
                    .subjectTaught("Content marketing")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught66);

            SubjectTaught subjectTaught67 = SubjectTaught.builder()
                    .subjectTaught("Video post-production")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught67);


            SubjectTaught subjectTaught68 = SubjectTaught.builder()
                    .subjectTaught("Greek language")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught68);

            SubjectTaught subjectTaught69 = SubjectTaught.builder()
                    .subjectTaught("Serbian language")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught69);

            SubjectTaught subjectTaught70 = SubjectTaught.builder()
                    .subjectTaught("Hebrew language")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught70);

            SubjectTaught subjectTaught71 = SubjectTaught.builder()
                    .subjectTaught("Dutch language")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught71);

            SubjectTaught subjectTaught72 = SubjectTaught.builder()
                    .subjectTaught("Danish language")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught72);

            SubjectTaught subjectTaught73 = SubjectTaught.builder()
                    .subjectTaught("Urdu language")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught73);

            SubjectTaught subjectTaught74 = SubjectTaught.builder()
                    .subjectTaught("Norwegian language")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught74);

            SubjectTaught subjectTaught75 = SubjectTaught.builder()
                    .subjectTaught("Czech language")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught75);

            SubjectTaught subjectTaught76 = SubjectTaught.builder()
                    .subjectTaught("Swedish language")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught76);

            SubjectTaught subjectTaught77 = SubjectTaught.builder()
                    .subjectTaught("Khmer language")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught77);

            SubjectTaught subjectTaught78 = SubjectTaught.builder()
                    .subjectTaught("Belarusian language")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught78);

            SubjectTaught subjectTaught79 = SubjectTaught.builder()
                    .subjectTaught("Sanskrit language")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught79);

            SubjectTaught subjectTaught80 = SubjectTaught.builder()
                    .subjectTaught("Tibetan language")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught80);

            SubjectTaught subjectTaught81 = SubjectTaught.builder()
                    .subjectTaught("Lithuanian language")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught81);

            SubjectTaught subjectTaught82 = SubjectTaught.builder()
                    .subjectTaught("Slovak language")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught82);

            SubjectTaught subjectTaught83 = SubjectTaught.builder()
                    .subjectTaught("Vietnamese language")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught83);

            SubjectTaught subjectTaught84 = SubjectTaught.builder()
                    .subjectTaught("Telugu language")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught84);

            SubjectTaught subjectTaught85 = SubjectTaught.builder()
                    .subjectTaught("Telugu language")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught85);

            SubjectTaught subjectTaught86 = SubjectTaught.builder()
                    .subjectTaught("Java")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught86);

            SubjectTaught subjectTaught87 = SubjectTaught.builder()
                    .subjectTaught("C")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught87);

            SubjectTaught subjectTaught88 = SubjectTaught.builder()
                    .subjectTaught("Swift")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught88);

            SubjectTaught subjectTaught89 = SubjectTaught.builder()
                    .subjectTaught("HTML")
                    .count(0).description("Lorem Ipsum dolor").image("course-1.jpg").build();

            subjectTaughtRepository.save(subjectTaught89);

        }

    }

}
