package com.example.demo.service;

import com.example.demo.enity.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {
    boolean insertUser(User user);
    List<User> selectphb();
    User isRegister(String id);
}
