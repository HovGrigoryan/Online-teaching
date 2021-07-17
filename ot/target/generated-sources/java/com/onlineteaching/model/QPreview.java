package com.onlineteaching.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPreview is a Querydsl query type for Preview
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QPreview extends EntityPathBase<Preview> {

    private static final long serialVersionUID = -716731294L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QPreview preview = new QPreview("preview");

    public final StringPath content = createString("content");

    public final DateTimePath<java.util.Date> createdDate = createDateTime("createdDate", java.util.Date.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Double> rate = createNumber("rate", Double.class);

    public final QUser teacher;

    public final QUser user;

    public QPreview(String variable) {
        this(Preview.class, forVariable(variable), INITS);
    }

    public QPreview(Path<? extends Preview> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QPreview(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QPreview(PathMetadata metadata, PathInits inits) {
        this(Preview.class, metadata, inits);
    }

    public QPreview(Class<? extends Preview> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.teacher = inits.isInitialized("teacher") ? new QUser(forProperty("teacher"), inits.get("teacher")) : null;
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user"), inits.get("user")) : null;
    }

}

