package com.example.demo.dao;

import com.example.demo.enity.User_message;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;

@Mapper
public interface User_messageDao {
    int insertmessage(User_message message);
    List<User_message> selectuser(String openid);
}
