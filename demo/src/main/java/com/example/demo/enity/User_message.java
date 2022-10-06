package com.example.demo.enity;

import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User_message {
    int message_id;
    String message_receiveid;
    Date message_time;
    String message_content;
}
