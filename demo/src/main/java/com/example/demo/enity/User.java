package com.example.demo.enity;

import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private String openID;
    private String nickName;
    private String avatarUrl;
    private Integer score;
}