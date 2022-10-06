package com.example.demo.dao;

import com.example.demo.enity.Find;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.Date;
import java.util.List;

@Mapper
public interface FindDao {
    List<Find> getFindList();  //

    List<Find> getFindListBySelect(String title, Integer category, Integer status, String address);
    //

    List<Find> getFindListByClick();  //

    List<Find> getFindListByTime();  //

//    void add(Integer findID, Integer category, Date time, String userID, String title, String content,
//             Integer score, Integer accepting, Integer finish, Integer click,
//             String ad_name, String address, Double latitude,
//             Double longitude, Integer status, String image1, String image2, String image3); //

    void add(Find find);

    void addImage(@Param("findID") Integer findID, @Param("url") String url);

    void insert(Find f);  //

    Find selectByID(Integer findID);  //

    void deleteById(Integer findID);  //

    void updateClick(Integer findID);  //

    void updateFinish(Integer findID);  //

    //----------
    List<Find> getFindListByUser(String userID);

    String findtitle(Integer findID);

    String finduser(Integer findID);

    List<Find> getTotalByCategory(String category);

    List<Find> getNumberOfArea(String address);

    List<Find> getNumberOfCategory(Integer category);

    String getHead(String userID);

    String getNickname(String userID);
}
