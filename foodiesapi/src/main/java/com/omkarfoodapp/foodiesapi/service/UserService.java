package com.omkarfoodapp.foodiesapi.service;

import com.omkarfoodapp.foodiesapi.io.UserRequest;
import com.omkarfoodapp.foodiesapi.io.UserResponse;

public interface UserService {

    UserResponse registerUser(UserRequest request);

    String findByUserId();
}
