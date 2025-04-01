package com.omkarfoodapp.foodiesapi.service;

import com.omkarfoodapp.foodiesapi.entity.UserEntity;
import com.omkarfoodapp.foodiesapi.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@AllArgsConstructor
public class AppUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(()->new UsernameNotFoundException("User not found"));
        return new User(user.getEmail(),user.getPassword(), Collections.emptyList());
    }
}
