package com.example.demo.enity;

import java.util.Date;
import lombok.Data;

/**
 * Created by geely
 */
@Data

public class Find {
    private Integer findID;

    private Integer category;

    private Date time;

    private String userID;

    private String title;

    private String content;

    private Integer score;

    private Integer finish;

    private Integer click;

    private String ad_name;

    private String address;

    private double latitude;

    private double longitude;

    private int status;

    private String image1;

    private String image2;

    private String image3;

    private String head_photo;

    private String nickname;

    public Find() {
    }

    public Find(Integer findID, Integer category, Date time, String userID, String title,
                String content, Integer score, Integer finish, Integer click,
                String ad_name, String adress, double latitude, double longitude, int status,
                String image1, String image2, String image3) {
        this.findID = findID;
        this.category = category;
        this.time = time;
        this.userID = userID;
        this.title = title;
        this.content = content;
        this.score = score;
        this.finish = finish;
        this.click = click;
        this.ad_name = ad_name;
        this.address = adress;
        this.latitude = latitude;
        this.longitude = longitude;
        this.status = status;
        this.image1 = image1;
        this.image2 = image2;
        this.image3 = image3;
    }

    public Integer getFindID() {
        return findID;
    }

    public void setFindID(Integer findID) {
        this.findID = findID;
    }

    public Integer getCategory() {
        return category;
    }

    public void setCategory(Integer category) {
        this.category = category;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public Integer getFinish() {
        return finish;
    }

    public void setFinish(Integer finish) {
        this.finish = finish;
    }

    public Integer getClick(){
        return click;
    }
    public void setClick(Integer click) {
        this.click = click;
    }

    public String getAd_name() {
        return ad_name;
    }

    public void setAd_name(String ad_name) {
        this.ad_name = ad_name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String adress) {
        this.address = adress;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getImage1() {return image1;}

    public void setImage1(String image1) {this.image1 = image1;}

    public String getImage2() {return image2;}

    public void setImage2(String image2) {this.image2 = image2;}

    public String getImage3() {return image3;}

    public void setImage3(String image3) {this.image3 = image3;}

    public String getHead_photo(){return this.head_photo;}

    public void setHead_photo(String head_photo){this.head_photo = head_photo;}

    public String getNickname(){return this.nickname;}

    public void setNickname(String nickname){this.nickname = nickname;}

    @Override
    public String toString() {
        return "FindProducts{" +
                "findID=" + findID +
                ", category=" + category +
                ", time='" + time + '\'' +
                ", userID=" + userID +
                ", title='" + title + '\'' +
                ", content='" + content + '\'' +
                ", score=" + score +
                ", finish=" + finish +
                ", click=" + click +
                ", ad_name='" + ad_name + '\'' +
                ", adress='" + address + '\'' +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
                ", status=" + status +
                ", image1=" + image1 +
                ", image2=" + image2 +
                ", image3=" + image3 +
                '}';
    }
}