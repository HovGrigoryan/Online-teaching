package com.onlineteaching.repository;

import com.onlineteaching.model.Country;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CountryRepository extends JpaRepository<Country, Long> {

    Country findByCountryName(String name);

}
