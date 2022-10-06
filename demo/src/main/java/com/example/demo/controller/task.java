package com.example.demo.controller;

import com.example.demo.dao.FindDao;
import com.example.demo.dao.UserDao;
import com.example.demo.dao.User_taskDao;
import com.example.demo.enity.Find;
import com.example.demo.enity.User;
import com.example.demo.enity.User_task;
import com.example.demo.service.FindService;
import com.example.demo.service.User_messageService;
import com.example.demo.service.User_taskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@Controller
@RequestMapping(value = "/user",method = RequestMethod.GET)
public class task {
    @Autowired
    User_taskService user_taskService;
    @Autowired
    FindService findService;
    @Autowired
    UserDao userDao;
    @Autowired
    User_taskDao user_taskDao;
    @Autowired
    FindDao findDao;
    @Autowired
    User_messageService user_messageService;
    //我的任务
    @ResponseBody
    @RequestMapping(value = "/alltask",method = RequestMethod.GET)
    public List<User_task> alltask(@RequestParam String user_id){
        return user_taskService.alltask(user_id);
    }

    //领取任务
    @ResponseBody
    @RequestMapping(value = "/inserttask",method = RequestMethod.GET)
    public void inserttask(@RequestParam String user_id, @RequestParam int notice_id){
        User_task task=new User_task();
        task.setTask_acceptId(user_id);
        task.setTask_noticeId(notice_id);
        Find find=findService.getFindByID(notice_id);
        task.setTask_noticetitle(find.getTitle());
        task.setTask_noticecontent(find.getContent());
        task.setTask_score(find.getScore());
        task.setTask_state(0);
        task.setTask_noticeimage(find.getImage1());
        user_taskService.inserttask(task);
    }

    //找到失物
    @ResponseBody
    @RequestMapping(value = "/findlost",method = RequestMethod.GET)
    public void findlost(@RequestParam Integer task_id){
        user_messageService.insert2(task_id);
        user_taskDao.updatetask(task_id);
    }

    //取消任务
    @ResponseBody
    @RequestMapping(value = "/canceltask",method = RequestMethod.GET)
    public void canceltask(@RequestParam Integer task_id){
       user_taskService.cancel(task_id);
    }

    //确认完成
    @ResponseBody
    @RequestMapping(value = "/finish",method = RequestMethod.GET)
    public User[] finish(Integer notice_id){
       return user_taskService.finish(notice_id);
    }

    //再次确认
    @ResponseBody
    @RequestMapping(value = "/finish/getscore",method = RequestMethod.GET)
    public void finish(String openId, Integer noticeid, Integer score){
        userDao.update(openId, score);
        findDao.updateFinish(noticeid);
        user_messageService.insert1(noticeid);
    }
}
