package com.omkarfoodapp.foodiesapi.controller;

import com.omkarfoodapp.foodiesapi.io.UserRequest;
import com.omkarfoodapp.foodiesapi.io.UserResponse;
import com.omkarfoodapp.foodiesapi.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class UserController {

    private final UserService userService;


    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse register(@RequestBody UserRequest request){
        return userService.registerUser(request);
    }

}
