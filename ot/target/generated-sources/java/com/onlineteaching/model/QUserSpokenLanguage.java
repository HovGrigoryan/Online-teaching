package com.onlineteaching.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUserSpokenLanguage is a Querydsl query type for UserSpokenLanguage
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QUserSpokenLanguage extends EntityPathBase<UserSpokenLanguage> {

    private static final long serialVersionUID = 1334422699L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QUserSpokenLanguage userSpokenLanguage = new QUserSpokenLanguage("userSpokenLanguage");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final QLanguage language;

    public final QUser user;

    public QUserSpokenLanguage(String variable) {
        this(UserSpokenLanguage.class, forVariable(variable), INITS);
    }

    public QUserSpokenLanguage(Path<? extends UserSpokenLanguage> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QUserSpokenLanguage(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QUserSpokenLanguage(PathMetadata metadata, PathInits inits) {
        this(UserSpokenLanguage.class, metadata, inits);
    }

    public QUserSpokenLanguage(Class<? extends UserSpokenLanguage> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.language = inits.isInitialized("language") ? new QLanguage(forProperty("language")) : null;
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user"), inits.get("user")) : null;
    }

}

