package com.example.demo.controller;

import com.example.demo.enity.Find;
import com.example.demo.enity.User;
import com.example.demo.enity.table;
import com.example.demo.service.FindService;
import com.example.demo.service.UserService;
import com.example.demo.service.User_messageService;
import com.example.demo.utils.GlobalResult;
import com.example.demo.utils.HttpUtil;
import net.sf.json.JSONObject;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;
import java.util.Random;

import static java.time.LocalTime.now;

@RestController
@RequestMapping("/find")
public class find {
    @Autowired
    FindService findService;
    @Autowired
    User_messageService user_messageService;

    @ResponseBody
    @RequestMapping ("/list")
    public List<Find> getList(){
        return findService.getFindList();
    }

    @ResponseBody
    @RequestMapping ("list_click")
    public List<Find> getListByClick(){
        return findService.getFindListByClick();
    }

    @ResponseBody
    @RequestMapping ("list_time")
    public List<Find> getListByTime(){
        return findService.getFindListByTime();
    }


    @ResponseBody
    @RequestMapping ("/list_select")
    public List<Find> getListSelect(@Param("title") String title, @Param("category") Integer category,
                                    @Param("status") Integer status, @Param("area") String area){
        return findService.getFindListSelect(title, category, status, area);
    }

    @ResponseBody
    @RequestMapping ("/details")
    public Find getDetails(@Param("findID") Integer findID){
        return findService.getFindByID(findID);
    }

    /*@ResponseBody
    @RequestMapping ("/add")
    public Find add(@Param("category") Integer category, @Param("userID") String userID, @Param("title") String title,
                    @Param("content") String content, @Param("score") Integer score, @Param("imageID") String imageID,
                    @Param("ad_name") String ad_name, @Param("address") String address,
                    @Param("latitude") Double latitude, @Param("longitude") Double longitude,
                    @Param("status") Integer status){
        long time = System.currentTimeMillis();
        Date date = new Date(time);
        Find find = new Find(null,category,date,userID,title,content,score,imageID,0
        ,0,ad_name,address,latitude,longitude,status);
        findService.add(category, userID, title, content, score, imageID, ad_name, address, latitude, longitude, status);
        return find;
    }*/

    @ResponseBody
    @RequestMapping ("/add")
    public Find add(@Param("category") Integer category, @Param("userID") String userID, @Param("title") String title,
                    @Param("content") String content, @Param("score") Integer score, @Param("imageID") String[] imageID,
                    @Param("ad_name") String ad_name, @Param("address") String address,
                    @Param("latitude") Double latitude, @Param("longitude") Double longitude,
                    @Param("status") Integer status) {
        /*long time = System.currentTimeMillis();*/
        Date date = new Date();
        if(imageID.length == 1){
            Find find = new Find(null, category, date, userID, title, content, score, 0, 0,
                    ad_name, address, latitude, longitude, status, imageID[0], null, null);
            findService.add(find);
            return find;
        }
       if(imageID.length == 2) {
           Find find = new Find(null, category, date, userID, title, content, score, 0, 0,
                   ad_name, address, latitude, longitude, status, imageID[0], imageID[1], null);
           findService.add(find);
           return find;
       }
        Find find = new Find(null, category, date, userID, title, content, score, 0, 0,
                ad_name, address, latitude, longitude, status, imageID[0], imageID[1], imageID[2]);
        findService.add(find);
        return find;
    }


    @ResponseBody
    @RequestMapping ("/delete")
    public void delete(@Param("findID") Integer findID){
        user_messageService.insert3(findID);
        findService.deleteByID(findID);
    }

    @ResponseBody
    @RequestMapping ("/updateClick")
    public void updateClick(@Param("findID") Integer findID, @Param("click") Integer click){
        Find find = new Find();
        find = findService.getFindByID(findID);
        find.setClick(click);
    }

    @ResponseBody
    @RequestMapping ("/updateFinish")
    public void updateFinish(@Param("findID") Integer findID, @Param("finish") Integer finish){
        Find find = new Find();
        find = findService.getFindByID(findID);
        find.setClick(finish);
    }



    @ResponseBody
    @RequestMapping ("/getFindListByUser")
    public List<Find> getFindListByUser(@Param("userID") String userID){
        System.out.println(findService.getFindListByUser(userID));
        return findService.getFindListByUser(userID);
    }


    @ResponseBody
    @RequestMapping ("/total_area")
    public table[] getTotalByArea(){
        return findService.getNumberOfArea();
    }

    @ResponseBody
    @RequestMapping ("/total_catogory")
    public int[] getTotalByCategory(){
        return findService.getNumberOfCategory();
    }
}
