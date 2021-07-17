package com.onlineteaching.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUserTeacherDayZone is a Querydsl query type for UserTeacherDayZone
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QUserTeacherDayZone extends EntityPathBase<UserTeacherDayZone> {

    private static final long serialVersionUID = -579304713L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QUserTeacherDayZone userTeacherDayZone = new QUserTeacherDayZone("userTeacherDayZone");

    public final StringPath day = createString("day");

    public final StringPath endTime = createString("endTime");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath startTime = createString("startTime");

    public final QUser teacher;

    public final QUser user;

    public QUserTeacherDayZone(String variable) {
        this(UserTeacherDayZone.class, forVariable(variable), INITS);
    }

    public QUserTeacherDayZone(Path<? extends UserTeacherDayZone> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QUserTeacherDayZone(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QUserTeacherDayZone(PathMetadata metadata, PathInits inits) {
        this(UserTeacherDayZone.class, metadata, inits);
    }

    public QUserTeacherDayZone(Class<? extends UserTeacherDayZone> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.teacher = inits.isInitialized("teacher") ? new QUser(forProperty("teacher"), inits.get("teacher")) : null;
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user"), inits.get("user")) : null;
    }

}

