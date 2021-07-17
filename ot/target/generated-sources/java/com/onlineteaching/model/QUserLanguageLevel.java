package com.onlineteaching.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUserLanguageLevel is a Querydsl query type for UserLanguageLevel
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QUserLanguageLevel extends EntityPathBase<UserLanguageLevel> {

    private static final long serialVersionUID = 706192667L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QUserLanguageLevel userLanguageLevel = new QUserLanguageLevel("userLanguageLevel");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final QLanguage language;

    public final EnumPath<com.onlineteaching.model.enums.LanguageLevel> languageLevel = createEnum("languageLevel", com.onlineteaching.model.enums.LanguageLevel.class);

    public final QUser user;

    public QUserLanguageLevel(String variable) {
        this(UserLanguageLevel.class, forVariable(variable), INITS);
    }

    public QUserLanguageLevel(Path<? extends UserLanguageLevel> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QUserLanguageLevel(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QUserLanguageLevel(PathMetadata metadata, PathInits inits) {
        this(UserLanguageLevel.class, metadata, inits);
    }

    public QUserLanguageLevel(Class<? extends UserLanguageLevel> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.language = inits.isInitialized("language") ? new QLanguage(forProperty("language")) : null;
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user"), inits.get("user")) : null;
    }

}

