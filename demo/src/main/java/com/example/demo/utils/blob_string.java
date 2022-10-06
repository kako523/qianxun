package com.example.demo.utils;

import com.mysql.jdbc.Blob;
import sun.misc.BASE64Encoder;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.sql.SQLException;


public class blob_string {
    public String convert(Blob blob)
    {
        try{
            int n=(int)blob.length();
            try{
                String string = new String(blob.getBytes(1,n),"GBK");//blob 转 String
                return string;
            }
            catch (UnsupportedEncodingException e)
            {
                e.printStackTrace();
            }
        }
        catch (SQLException e)
        {
            e.printStackTrace();
        }
        return "false";
    }
}
