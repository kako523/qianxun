package com.example.demo.service;
import com.example.demo.enity.Find;
import com.example.demo.enity.table;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.List;

@Service
public interface FindService {
    List<Find> getFindList();

    Find getFindByID(Integer findID);

    List<Find> getFindListSelect(String title, Integer category,Integer status, String address);


    Find getFindDetails(Integer findID);

    // void add(Integer category, String userID, String title, String content, Integer score, List<String> imageID, String ad_name, String address, Double latitude, Double longitude, Integer status);

    void add(Find find);

    void deleteByID(Integer findID);

    void updateFinish(Integer findID, Integer finish);

    void updateClick(Integer findID,Integer click);

    List<Find> getFindListByClick();

    List<Find> getFindListByTime();



    List<Find> getFindListByUser(String userID);

    int getTotalByCategory(String category);

    table[] getNumberOfArea();

    int[] getNumberOfCategory();



}
