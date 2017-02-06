DELIMITER $$

CREATE DATABASE seckill;

use seckill;
-- 秒杀库存表

CREATE TABLE seckill(
`create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
`seckill_id` bigint NOT NULL AUTO_INCREMENT COMMENT '商品库存id',
`name` VARCHAR(120) NOT NULL COMMENT '商品名称',
`number` int NOT NULL COMMENT '库存数量',
`start_time` timestamp NOT NULL COMMENT '秒杀开启时间',
`end_time` timestamp NOT NULL COMMENT '秒杀结束时间',

PRIMARY KEY (seckill_id),
key idx_start_time(start_time),
key idx_end_time(end_time),
key idx_create_time(create_time)
)ENGINE=InnoDB AUTO_INCREMENT=1000 DEFAULT CHARSET=UTF8 COMMENT='秒杀库存表';

-- 初始化数据
insert into seckill(name, number, start_time, end_time)
VALUES
('600元秒杀iphone6', 600, '2015-11-01 00:00:00', '2015-11-02 00:00:00'),
('500元秒杀iphone5', 500, '2015-11-01 00:00:00', '2015-11-02 00:00:00'),
('400元秒杀iphone4', 400, '2015-11-01 00:00:00', '2015-11-02 00:00:00'),
('300元秒杀iphone3', 300, '2015-11-01 00:00:00', '2015-11-02 00:00:00');

-- 秒杀成功明细表
-- 用户登陆认证相关信息

CREATE TABLE success_killed (
`seckill_id` bigint NOT NULL COMMENT '秒杀商品id',
`user_phone` bigint NOT NULL COMMENT '用户手机号',
`state` tinyint NOT NULL DEFAULT -1 COMMENT '状态',
`create_time` timestamp NOT NULL COMMENT '创建时间',

PRIMARY KEY(seckill_id, user_phone),
key idx_create_time(create_time)

)ENGINE=InnoDB DEFAULT CHARSET=UTF8 COMMENT='秒杀成功明细表';

-- 连接数据库控制台
-- mysql -uroot -p


-- 上线，要修改 ddl
alter table seckill
drop index idx_create_time,
add index idx_c_s(start_time,create_time);

