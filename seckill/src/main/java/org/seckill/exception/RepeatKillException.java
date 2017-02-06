package org.seckill.exception;

/**
 * 重复秒杀异常（运行期异常）
 * Created by zhengfucheng on 6/2/2017.
 */
public class RepeatKillException extends SeckillException {


    public RepeatKillException(String message) {
        super(message);
    }

    public RepeatKillException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
