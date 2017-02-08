--

DELIMITER $$ -- console ; 转换为 $$

-- 定义存储过程
DROP PROCEDURE IF EXISTS `seckill`.`execute_seckill`;
CREATE PROCEDURE  `seckill`.`execute_seckill` (
in v_seckill_id bigint,
in v_phone bigint,
in v_kill_time timestamp,
out r_result int
)
BEGIN
  DECLARE

  insert_count int DEFAULT 0;

  START TRANSACTION;

  insert ignore into success_killed(seckill_id, user_phone, create_time, state)
  values(v_seckill_id, v_phone, v_kill_time, 0);

  -- row_count() 返回上一条修改类型sql(delete, insert, update)的影响行数
  -- 0 未修改数据，>0 修改的行数 <0 sql错误或者是未执行sql
  select row_count() into insert_count;

  IF(INSERT_COUNT = 0) THEN
    ROLLBACK ;
    set r_result = -1;
  ELSEIF (INSERT_COUNT < 0) THEN
    ROLLBACK;
    set r_result = -2;
  ELSE
    update seckill
    set
    number = number - 1
    where
    seckill_id = v_seckill_id
    and end_time > v_kill_time
    and start_time < v_kill_time
    and number > 0;

    select row_count() into insert_count;
    IF(insert_count = 0 ) THEN
      ROLLBACK ;
      set r_result = 0;
    elseif (insert_count < 0) THEN
      ROLLBACK;
      set r_result = -2;
    else
      commit;
      set r_result = 1;
    END IF;
  END IF;
END;
$$
-- 结束

DELIMITER ;

set @r_result = -3;
call execute_seckill(1000, 13286830294, now(), @r_result);
select @r_result;

-- 这里的QPS 一个秒杀但可以达到600/qps