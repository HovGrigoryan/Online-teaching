package com.onlineteaching.model;


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
public class SubjectTaught {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column
    private String subjectTaught;

    @Column
    private int count;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column
    private String image;
}
