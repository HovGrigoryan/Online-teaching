package com.onlineteaching.repository;

import com.onlineteaching.model.QUser;
import com.onlineteaching.model.User;
import com.onlineteaching.model.enums.UserType;
import com.querydsl.core.types.dsl.StringExpression;
import com.querydsl.core.types.dsl.StringPath;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.querydsl.binding.QuerydslBinderCustomizer;
import org.springframework.data.querydsl.binding.QuerydslBindings;
import org.springframework.data.querydsl.binding.SingleValueBinding;

import java.util.Iterator;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long>, QuerydslPredicateExecutor<User>, QuerydslBinderCustomizer<QUser> {

    List<User> findAllByUserType(UserType userType);

    List<User> findTop4ByOrderByCourseDesc();

    Optional<User> findByEmail(String email);

    List<User> findAllBySubjectTaughtId(Long id);

    List<User> findAllByUserTypeAndNameContainingOrSurnameContainingOrSubjectTaughtSubjectTaughtContainingIgnoreCase(UserType userType, String name, String surname, String subjectTaught);

    Page<User> findAllByUserType(UserType userType, Pageable pageable);

    User findByIdAndUserType(Long id,UserType userType);

    @Override
    default void customize(QuerydslBindings bindings, QUser qUser) {

        bindings.bind(String.class).first((SingleValueBinding<StringPath, String>) StringExpression::containsIgnoreCase);

//        bindings.bind(qUser.name).all((path, value) -> {
//            Iterator<? extends String> it = value.iterator();
//            return Optional.ofNullable(path.contains(it.next()));
//        });


//        bindings.bind(String.class)
//                .first((SingleValueBinding<StringPath, String>) StringExpression::containsIgnoreCase);
//        bindings.excluding(qUser.name);
//
////        bindings.bind(String.class)
////                .first((SingleValueBinding<StringPath, String>) StringExpression::containsIgnoreCase);
////        bindings.excluding(qUser.userType);

//        bindings.bind(String.class).first((SingleValueBinding<StringPath, String>) StringExpression::containsIgnoreCase);
//
//        bindings.bind(qUser.name).all((path, value) -> {
//            Iterator<? extends String> it = value.iterator();
//            return Optional.ofNullable(path.contains(it.next()));
//        });
//
//        bindings.bind(qUser.id).all((path, value) -> {
//            Iterator<? extends Long> it = value.iterator();
//            return Optional.ofNullable(path.eq(it.next()));
//
//        });
//
//        bindings.bind(qUser.subjectTaught.subjectTaught).all((path, value) -> {
//            Iterator<? extends String> it = value.iterator();
//            return Optional.of(path.eq(it.next()));
//        });
//
//        bindings.bind(qUser.email).all((path, value) -> {
//            Iterator<? extends String> it = value.iterator();
//            return Optional.of(path.contains(it.next()));
//        });
//
//        bindings.bind(qUser.country.countryName).all((path, value) -> {
//            Iterator<? extends String> it = value.iterator();
//            return Optional.of(path.contains(it.next()));
//        });

        bindings.bind(String.class).first((SingleValueBinding<StringPath, String>) (StringExpression::containsIgnoreCase));
        bindings.bind(qUser.name).all((path, value) -> {
            Iterator<? extends String> it = value.iterator();
            return Optional.ofNullable(path.contains((String) it.next()));
        });
        bindings.bind(qUser.id).all((path, value) -> {
            Iterator<? extends Long> it = value.iterator();
            return Optional.ofNullable(path.eq(it.next()));
        });

        bindings.bind(qUser.subjectTaught.subjectTaught).all((path, value) -> {
            Iterator<? extends String> it = value.iterator();
            return Optional.ofNullable(path.eq(it.next()));
        });

        bindings.bind(qUser.country.countryName).all((path, value) -> {
            Iterator<? extends String> it = value.iterator();
            return Optional.ofNullable(path.eq(it.next()));
        });


        bindings.bind(qUser.hourlyRate).all((path, value) -> {
            Iterator<? extends Integer> it = value.iterator();
            Integer from = it.next();
            if (value.size() >= 2) {
                Integer to = it.next();
                return Optional.of(path.between(from, to)); // between
            } else {
                return Optional.of(path.goe(from)); // greater or equal
            }
        });



//        bindings.bind(qUser.hourlyRate).all((path, value) -> {
//            Iterator<? extends Double> it = value.iterator();
//            return Optional.of(path.goe(it.next()));
//        });
//
//        bindings.bind(qUser.hourlyRate).all((path, value) -> {
//            Iterator<? extends Double> it = value.iterator();
//            return Optional.of(path.loe(it.next()));
//        });


//        bindings.bind(qUser.hourlyRate).first((path, value) -> qUser.hourlyRate.goe(value));
//        bindings.bind(qUser.hourlyRate).first((path, value) -> qUser.hourlyRate.loe(value));
//


//            bindings.bind(partner.billingCycleStartDate).all((path, value) -> {
////                Iterator<? extends Date> it = value.iterator();
////                Date selectedDate = (Date)it.next();
////                LocalDate selectedNextDay = selectedDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate().plusDays(1L);
////                return Optional.of(path.between(selectedDate, Date.from(selectedNextDay.atStartOfDay().atZone(ZoneId.systemDefault()).toInstant())));
////            });
    }


}
