package com.example.demo.service.ServiceImpl;

import com.example.demo.dao.UserDao;
import com.example.demo.enity.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserImpl implements UserService {
    @Autowired
    private UserDao userDao;
    @Override
    public boolean insertUser(User user){
        return userDao.insertUser(user);
    }
    @Override
    public List<User> selectphb() {
        return userDao.selectUser();
    }
    @Override
    public User isRegister(String id){
        if(userDao.selectexist(id)!=null)  return userDao.selectexist(id);
        else return null;
    }
}