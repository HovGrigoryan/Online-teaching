package com.onlineteaching.security;

import com.onlineteaching.model.User;
import com.onlineteaching.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public UserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<User> byUsername = userRepository.findByEmail(email);

        if (!byUsername.isPresent()) {
            throw new UsernameNotFoundException("User not found");
        }
        return new CurrentUser(byUsername.get());
    }
}
