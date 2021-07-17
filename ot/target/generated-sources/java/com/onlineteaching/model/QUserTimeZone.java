package com.onlineteaching.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QUserTimeZone is a Querydsl query type for UserTimeZone
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QUserTimeZone extends EntityPathBase<UserTimeZone> {

    private static final long serialVersionUID = -1713391446L;

    public static final QUserTimeZone userTimeZone = new QUserTimeZone("userTimeZone");

    public final StringPath displayTimeZone = createString("displayTimeZone");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath timeZoneId = createString("timeZoneId");

    public QUserTimeZone(String variable) {
        super(UserTimeZone.class, forVariable(variable));
    }

    public QUserTimeZone(Path<? extends UserTimeZone> path) {
        super(path.getType(), path.getMetadata());
    }

    public QUserTimeZone(PathMetadata metadata) {
        super(UserTimeZone.class, metadata);
    }

}

