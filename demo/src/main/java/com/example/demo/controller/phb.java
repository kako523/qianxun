package com.example.demo.controller;

import com.example.demo.enity.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/user")
public class phb {
    @Autowired
    UserService userService;
    @ResponseBody
    @RequestMapping("/phb")
    public List<User> zph()
    {
        return userService.selectphb();
    }
}
