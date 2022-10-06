package com.example.demo.enity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User_task {
    private Integer task_id;
    private String task_acceptId;
    private Integer task_noticeId;
    private String task_noticetitle;
    private String task_noticecontent;
    private String task_noticeimage;
    private Integer task_score;
    private Integer task_state;
}