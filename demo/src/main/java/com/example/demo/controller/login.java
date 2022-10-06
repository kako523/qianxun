package com.example.demo.controller;

import com.example.demo.enity.User;
import com.example.demo.service.UserService;
import com.example.demo.utils.GlobalResult;
import com.example.demo.utils.HttpUtil;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class login {
    @Autowired
    UserService userService;
    @ResponseBody
    @RequestMapping ("/login")
    public User mini_Login(@RequestParam String code, @RequestParam String nickName, @RequestParam String avatarUrl )
    {
        System.out.println(code);
        System.out.println(avatarUrl);
        System.out.println(nickName);
        String result="";
        try{//请求微信服务器，用code换取openid。HttpUtil是工具类，后面会给出实现，Configure类是小程序配置信息，后面会给出代码
            result = HttpUtil.doGet(
                    "https://api.weixin.qq.com/sns/jscode2session?appid="
                            + GlobalResult.mini_appID + "&secret="
                            + GlobalResult.mini_secret + "&js_code="
                            + code
                            + "&grant_type=authorization_code", null);
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        User user=new User();
        JSONObject jsonObj = JSONObject.fromObject(result);//解析从微信服务器上获取到的json字符串
        String str=jsonObj.get("openid").toString();
        System.out.println("用户的openid为："+str);//此处也可以得到session_key的值
        user.setOpenID(str);
        user=userService.isRegister(str);//去数据库判断用户是否存在该用户
        if(user!=null)//如果存在该用户
        {
            return user;
        }
        user=new User();
        //如果是新用户，就添加用户到数据库中
        user.setOpenID(str);
        user.setAvatarUrl(avatarUrl);
        user.setNickName(nickName);
        user.setScore(0);
        userService.insertUser(user);
        return user;
    }
}