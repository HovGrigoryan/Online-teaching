package com.onlineteaching.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUser is a Querydsl query type for User
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QUser extends EntityPathBase<User> {

    private static final long serialVersionUID = -2125948559L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QUser user = new QUser("user");

    public final StringPath avatar = createString("avatar");

    public final QCountry country;

    public final NumberPath<Integer> course = createNumber("course", Integer.class);

    public final StringPath email = createString("email");

    public final ComparablePath<Integer> hourlyRate = createComparable("hourlyRate", Integer.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath name = createString("name");

    public final StringPath password = createString("password");

    public final StringPath phoneNumber = createString("phoneNumber");

    public final QSubjectTaught subjectTaught;

    public final StringPath surname = createString("surname");

    public final StringPath token = createString("token");

    public final NumberPath<Double> userBalance = createNumber("userBalance", Double.class);

    public final StringPath userDescription = createString("userDescription");

    public final StringPath userDescriptionTitle = createString("userDescriptionTitle");

    public final EnumPath<com.onlineteaching.model.enums.UserStatus> userStatus = createEnum("userStatus", com.onlineteaching.model.enums.UserStatus.class);

    public final QUserTimeZone userTimeZone;

    public final EnumPath<com.onlineteaching.model.enums.UserType> userType = createEnum("userType", com.onlineteaching.model.enums.UserType.class);

    public final StringPath verifyPicture = createString("verifyPicture");

    public final StringPath videoUrl = createString("videoUrl");

    public QUser(String variable) {
        this(User.class, forVariable(variable), INITS);
    }

    public QUser(Path<? extends User> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QUser(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QUser(PathMetadata metadata, PathInits inits) {
        this(User.class, metadata, inits);
    }

    public QUser(Class<? extends User> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.country = inits.isInitialized("country") ? new QCountry(forProperty("country")) : null;
        this.subjectTaught = inits.isInitialized("subjectTaught") ? new QSubjectTaught(forProperty("subjectTaught")) : null;
        this.userTimeZone = inits.isInitialized("userTimeZone") ? new QUserTimeZone(forProperty("userTimeZone")) : null;
    }

}

