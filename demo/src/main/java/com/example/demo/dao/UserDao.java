package com.example.demo.dao;

import com.example.demo.enity.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface UserDao {
    boolean insertUser(User user);
    List<User> selectUser();
    User selectexist(String id);
    Integer delete(String id);
    Integer update(@Param(value = "id") String id, @Param(value = "get") Integer get);
}
