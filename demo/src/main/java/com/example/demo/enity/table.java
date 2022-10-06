package com.example.demo.enity;

public class table {
    private int count;

    private String area;

    public table(){

    }

    public table(int count,String area){
        this.area = area;
        this.count = count;
    }

    public int getCount(){
        return this.count;
    }
    public void setCount(int count){
        this.count = count;
    }

    public String getArea(){
        return this.area;
    }
    public void setArea(String area){
        this.area = area;
    }
}
