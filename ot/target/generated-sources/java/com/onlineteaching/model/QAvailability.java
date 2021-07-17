package com.onlineteaching.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QAvailability is a Querydsl query type for Availability
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QAvailability extends EntityPathBase<Availability> {

    private static final long serialVersionUID = -1165705983L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QAvailability availability = new QAvailability("availability");

    public final StringPath fromTime = createString("fromTime");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath toTime = createString("toTime");

    public final QUser user;

    public final QUserTimeZone userTimeZone;

    public final EnumPath<com.onlineteaching.model.enums.WeekDays> weekDays = createEnum("weekDays", com.onlineteaching.model.enums.WeekDays.class);

    public QAvailability(String variable) {
        this(Availability.class, forVariable(variable), INITS);
    }

    public QAvailability(Path<? extends Availability> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QAvailability(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QAvailability(PathMetadata metadata, PathInits inits) {
        this(Availability.class, metadata, inits);
    }

    public QAvailability(Class<? extends Availability> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user"), inits.get("user")) : null;
        this.userTimeZone = inits.isInitialized("userTimeZone") ? new QUserTimeZone(forProperty("userTimeZone")) : null;
    }

}

