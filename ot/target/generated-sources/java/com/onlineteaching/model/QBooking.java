package com.onlineteaching.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QBooking is a Querydsl query type for Booking
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QBooking extends EntityPathBase<Booking> {

    private static final long serialVersionUID = -333860621L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QBooking booking = new QBooking("booking");

    public final EnumPath<com.onlineteaching.model.enums.BookingApprovedStatus> bookingApprovedStatus = createEnum("bookingApprovedStatus", com.onlineteaching.model.enums.BookingApprovedStatus.class);

    public final EnumPath<com.onlineteaching.model.enums.BookingStatus> bookingStatus = createEnum("bookingStatus", com.onlineteaching.model.enums.BookingStatus.class);

    public final EnumPath<com.onlineteaching.model.enums.BookType> bookType = createEnum("bookType", com.onlineteaching.model.enums.BookType.class);

    public final StringPath day = createString("day");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final ListPath<Availability, QAvailability> permanentLessonTimes = this.<Availability, QAvailability>createList("permanentLessonTimes", Availability.class, QAvailability.class, PathInits.DIRECT2);

    public final QUser student;

    public final QUser teacher;

    public final QAvailability trialLessonTime;

    public QBooking(String variable) {
        this(Booking.class, forVariable(variable), INITS);
    }

    public QBooking(Path<? extends Booking> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QBooking(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QBooking(PathMetadata metadata, PathInits inits) {
        this(Booking.class, metadata, inits);
    }

    public QBooking(Class<? extends Booking> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.student = inits.isInitialized("student") ? new QUser(forProperty("student"), inits.get("student")) : null;
        this.teacher = inits.isInitialized("teacher") ? new QUser(forProperty("teacher"), inits.get("teacher")) : null;
        this.trialLessonTime = inits.isInitialized("trialLessonTime") ? new QAvailability(forProperty("trialLessonTime"), inits.get("trialLessonTime")) : null;
    }

}

