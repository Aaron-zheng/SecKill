package org.seckill.dao;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.seckill.entity.SuccessKilled;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.annotation.Resource;

import static org.junit.Assert.*;

/**
 * Created by zhengfucheng on 5/2/2017.
 */

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath:spring/spring-dao.xml"})
public class SuccessKilledDaoTest {

    @Resource
    private SuccessKilledDao successKilledDao;

    /**
     * 第一次插入，返回1
     * 第二次插入，返回0
     * @throws Exception
     */
    @Test
    public void insertSuccessKilled() throws Exception {
        long id = 1000L;
        long phone = 13286830294L;
        int result = successKilledDao.insertSuccessKilled(id, phone);
        System.out.println("insertcount: " + result);
    }

    @Test
    public void queryByIdWithSeckillId() throws Exception {
        long id = 1000L;
        long phone = 13286830294L;
        SuccessKilled successKilled = successKilledDao.queryByIdWithSeckillId(id, phone);
        System.out.println(successKilled.getUserPhone());
        System.out.println(successKilled.getSeckill());
    }
}