package com.example.demo.service.ServiceImpl;

import com.example.demo.dao.UserDao;
import com.example.demo.dao.User_taskDao;
import com.example.demo.enity.User;
import com.example.demo.enity.User_task;
import com.example.demo.service.User_taskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;

@Service
public class User_taskImpl implements User_taskService {
    @Autowired
    private User_taskDao user_taskDao;
    @Autowired
    private UserDao userDao;
    @Override
    public int inserttask(User_task task){
        return user_taskDao.inserttask(task);
    }
    @Override
    public void find(Integer task_id){
        user_taskDao.updatetask(task_id);
    }
    @Override
    public void cancel(Integer task_id){
        user_taskDao.delete(task_id);
    }

    @Override
    public User[] finish(Integer notice_id){
        List<String> tasker= user_taskDao.select(notice_id);
        User user[]=new User[tasker.size()];
        int i;
        for(i=0;i<tasker.size();i++){
            String str= tasker.get(i);
            user[i]=userDao.selectexist(str);
        }
        return user;
    }

    @Override
    public List<User_task> alltask(String id){
        return user_taskDao.selecttask(id);
    }

}
