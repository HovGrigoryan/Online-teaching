package com.onlineteaching.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QLanguage is a Querydsl query type for Language
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QLanguage extends EntityPathBase<Language> {

    private static final long serialVersionUID = -1083638274L;

    public static final QLanguage language1 = new QLanguage("language1");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath language = createString("language");

    public QLanguage(String variable) {
        super(Language.class, forVariable(variable));
    }

    public QLanguage(Path<? extends Language> path) {
        super(path.getType(), path.getMetadata());
    }

    public QLanguage(PathMetadata metadata) {
        super(Language.class, metadata);
    }

}

