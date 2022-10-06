package com.example.demo.dao;

import com.example.demo.enity.User;
import com.example.demo.enity.User_task;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface User_taskDao {
    int inserttask(User_task task);
    List<User_task> selecttask(String user_id);
    List<String> select(Integer notice_id);
    User_task find(Integer task_id);
    void updatetask(Integer task_id);
    int delete(Integer task_id);
    int selectnotice(Integer task_id);
    String selectid(Integer task_id);
}
