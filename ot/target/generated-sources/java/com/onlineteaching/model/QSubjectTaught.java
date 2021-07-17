package com.onlineteaching.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QSubjectTaught is a Querydsl query type for SubjectTaught
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QSubjectTaught extends EntityPathBase<SubjectTaught> {

    private static final long serialVersionUID = 846056561L;

    public static final QSubjectTaught subjectTaught1 = new QSubjectTaught("subjectTaught1");

    public final NumberPath<Integer> count = createNumber("count", Integer.class);

    public final StringPath description = createString("description");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath image = createString("image");

    public final StringPath subjectTaught = createString("subjectTaught");

    public QSubjectTaught(String variable) {
        super(SubjectTaught.class, forVariable(variable));
    }

    public QSubjectTaught(Path<? extends SubjectTaught> path) {
        super(path.getType(), path.getMetadata());
    }

    public QSubjectTaught(PathMetadata metadata) {
        super(SubjectTaught.class, metadata);
    }

}

