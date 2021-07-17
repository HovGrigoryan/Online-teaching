package com.onlineteaching.model;

import com.onlineteaching.model.enums.LanguageLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class UserLanguageLevel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    @ManyToOne
    private Language language;


    @Enumerated(EnumType.STRING)
    private LanguageLevel languageLevel;

}
