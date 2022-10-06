package com.example.demo.controller;

import com.example.demo.enity.User_message;
import com.example.demo.service.User_messageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping(value = "user",method = RequestMethod.GET)
public class systemmessage {
    @Autowired
    User_messageService user_messageService;
    @ResponseBody
    @RequestMapping(value = "/message",method = RequestMethod.GET)
    public List<User_message> message(@RequestParam String openid){
        return user_messageService.selectall(openid);
    }
}
