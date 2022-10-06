package com.example.demo.service;

import com.example.demo.enity.User;
import com.example.demo.enity.User_task;
import java.util.List;

public interface User_taskService {
    int inserttask(User_task task);
    void find(Integer task_id);
    void cancel(Integer task_id);
    User[] finish(Integer notice_id);
    List<User_task> alltask(String id);
}
