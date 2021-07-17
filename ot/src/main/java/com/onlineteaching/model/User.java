package com.onlineteaching.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.onlineteaching.model.enums.UserStatus;
import com.onlineteaching.model.enums.UserType;
import com.querydsl.core.annotations.PropertyType;
import com.querydsl.core.annotations.QueryType;
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
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column
    private String email;

    @Column
    @JsonIgnore
    private String password;

    @Enumerated(EnumType.STRING)
    private UserType userType;

    @Column
    private String token;

    @Column
    private String name;

    @Column
    private String surname;

    @ManyToOne
    private Country country;

    @ManyToOne(fetch = FetchType.EAGER)
    private SubjectTaught subjectTaught;

    @Column
    @QueryType(PropertyType.COMPARABLE)
    private Integer hourlyRate;

    @Column
    private String phoneNumber;

    @Column
    private String avatar;

    @Column(columnDefinition = "TEXT")
    private String userDescriptionTitle;

    @Column(columnDefinition = "TEXT")
    private String userDescription;

    @ManyToOne
    private UserTimeZone userTimeZone;

    @Column(columnDefinition = "TEXT")
    private String videoUrl;

    @Column
    private String verifyPicture;

    @Enumerated(EnumType.STRING)
    private UserStatus userStatus;

    @Column
    private double userBalance;

    @Column
    @Builder.Default
    private Integer course = 0;

}
