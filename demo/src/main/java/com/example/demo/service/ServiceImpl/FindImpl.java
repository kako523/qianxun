package com.example.demo.service.ServiceImpl;

import com.example.demo.dao.FindDao;
import com.example.demo.dao.UserDao;
import com.example.demo.enity.Find;
import com.example.demo.enity.User;
import com.example.demo.enity.table;
import com.example.demo.service.FindService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.*;


@Service
public class FindImpl implements FindService {
    @Autowired
    private FindDao findDao;
    @Override
    public List<Find> getFindList(){
        return findDao.getFindList();
    }
    @Override
    public List<Find> getFindListByClick(){
        return findDao.getFindListByClick();
    }

    @Override
    public List<Find> getFindListByTime(){
        return findDao.getFindListByTime();
    }


    @Override
    public List<Find> getFindListSelect(String title, Integer category,Integer status, String address){
        /*if(category == 0){
            return findDao.getFindListBySelect(title,null,status,address);
        }*/
        return findDao.getFindListBySelect(title,category,status,address);
    }

    /*@Override
    public void add(Integer category, String userID, String title, String content,
                    Integer score, String imageID, String ad_name, String address,
                    Double latitude, Double longitude, Integer status){
        Date date = new Date();
        Find find = new Find(null,category,date,userID,title,content,score,0,0,ad_name,address,latitude,longitude,image1,image2.iamge3,findDao.getHead(userID),nickname);

    }*/

    @Override
    public void add(Find find)
    {
        findDao.add(find);
    }

    @Override
    public void deleteByID(Integer findID){
        findDao.deleteById(findID);
    }

    @Override
    public void updateFinish(Integer findID, Integer finish){
        Find find = new Find();
        find = findDao.selectByID(findID);
        find.setFinish(finish);
    }

    @Override
    public void updateClick(Integer findID,Integer click){
        Find find = new Find();
        find = findDao.selectByID(findID);
        find.setClick(click);
    }

    @Override
    public Find getFindDetails(Integer findID){
        Find find = new Find();
        find = findDao.selectByID(findID);
        return find;
    }

    @Override
    public Find getFindByID(Integer findID){
        Find find = new Find();
        find = findDao.selectByID(findID);
        String head = findDao.getHead(find.getUserID());
        String nickname = findDao.getNickname(find.getUserID());
        find.setHead_photo(head);
        find.setNickname(nickname);
        return find;
    }

    @Override
    public List<Find> getFindListByUser(String userID){
        return findDao.getFindListByUser(userID);
    }


    @Override
    public int getTotalByCategory(String category){
        List<Find> findList =  findDao.getTotalByCategory(category);
        return findList.size();
    }

    @Override
    public table[] getNumberOfArea(){
        String a[] = new String[]{"黄浦区","徐汇区","长宁区","静安区","普陀区","虹口区","杨浦区","浦东新区","闵行区","宝山区",
                "嘉定区","金山区","松江区","青浦区","奉贤区","崇明区"};
        int res[] = new int[17];
        table list[] = new table[17];

        for(int i = 0;i < 16;i++){
            res[i] = findDao.getNumberOfArea(a[i]).size();
            table t = new table(res[i],a[i]);
            list[i] = t;
        }
        return list;
    }

    @Override
    public int[] getNumberOfCategory(){
        int a[] = new int[]{1,2,3,4,5,6,7,8,9};
        int res[] = new int[9];
        for(int i = 0;i < 9;i++){
            res[i] = findDao.getNumberOfCategory(a[i]).size();
        }
        return res;
    }

}
