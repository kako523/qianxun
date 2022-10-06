package com.example.demo;

import com.example.demo.dao.FindDao;
import com.example.demo.enity.Find;
import com.example.demo.utils.MybatisUtils;
import org.apache.ibatis.session.SqlSession;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
class DemoApplicationTests {

    @Test
    void contextLoads() {
    }

    @Test
    public void selectList(){
        SqlSession sqlSession = MybatisUtils.getSqlSession();

        FindDao findProductMapper = sqlSession.getMapper(FindDao.class);
        List<Find> FindProductsList = findProductMapper.getFindListBySelect("",0, 1, "");

        for (Find findProduc : FindProductsList) {
            System.out.println(findProduc);
        }
        sqlSession.close();
    }

}
