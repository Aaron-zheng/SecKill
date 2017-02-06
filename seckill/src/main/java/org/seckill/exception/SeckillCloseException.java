package org.seckill.exception;

/**
 * 秒杀关闭异常
 * 时间结束了，或者库存已经为0了
 * Created by zhengfucheng on 6/2/2017.
 */
public class SeckillCloseException extends SeckillException{


    public SeckillCloseException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }

    public SeckillCloseException(String message) {
        super(message);
    }
}
