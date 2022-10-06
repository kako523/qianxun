package com.example.demo.service;

import com.example.demo.enity.User_message;

import java.util.List;

public interface User_messageService {
    void insert1(Integer notice_id);
    void insert2(Integer task_id);
    void insert3(Integer notice_id);
    List<User_message> selectall(String openid);
}
