package com.example.demo.service.ServiceImpl;

import com.example.demo.dao.FindDao;
import com.example.demo.dao.User_messageDao;
import com.example.demo.dao.User_taskDao;
import com.example.demo.enity.User_message;
import com.example.demo.service.User_messageService;
import com.example.demo.service.User_taskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class User_messageImpl implements User_messageService {
    @Autowired
    User_taskDao user_taskDao;
    @Autowired
    FindDao findDao;
    @Autowired
    User_messageDao user_messageDao;

    @Override
    public void insert1(Integer notice_id){
        List<String> accept=user_taskDao.select(notice_id);
        int i;
        String st=findDao.findtitle(notice_id);
        for(i=0;i<accept.size();i++){
            String str=accept.get(i);
            Date date = new Date(System.currentTimeMillis());
            User_message user_message=new User_message();
            user_message.setMessage_time(date);
            user_message.setMessage_receiveid(str);
            user_message.setMessage_content("您接受的任务《"+st+"》已被发布者确认完成");
            user_messageDao.insertmessage(user_message);
        }
    }

    @Override
    public void insert2(Integer task_id){
        int notice_id=user_taskDao.selectnotice(task_id);
        String fabu=findDao.finduser(notice_id);
        String accept=user_taskDao.selectid(task_id);
        String name=findDao.getNickname(accept);
        String title=findDao.findtitle(notice_id);
        Date date = new Date(System.currentTimeMillis());
        User_message user_message=new User_message();
        user_message.setMessage_time(date);
        user_message.setMessage_receiveid(fabu);
        user_message.setMessage_content("您发布的任务《"+title+"》已被"+name+"确认完成,快去确认吧！");
        user_messageDao.insertmessage(user_message);
    }

    @Override
    public void insert3(Integer notice_id){
        String accept=findDao.finduser(notice_id);
        String title=findDao.findtitle(notice_id);
        List<String> accepter=user_taskDao.select(notice_id);
        int i;
        for(i=0;i<accepter.size();i++){
            String str=accepter.get(i);
            Date date = new Date(System.currentTimeMillis());
            User_message user_message=new User_message();
            user_message.setMessage_time(date);
            user_message.setMessage_receiveid(str);
            user_message.setMessage_content("您接受的任务《"+title+"》已被发布者删除");
            user_messageDao.insertmessage(user_message);
        }
    }

    @Override
    public List<User_message> selectall(String openid){
        return user_messageDao.selectuser(openid);
    }
}
