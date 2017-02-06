//用于存放主要交互逻辑的js
//javascript 需要做到模块化
//调用 seckill.detail.init(params);

var seckill = {

    //封装秒杀相关ajax的url
    URL: {
        now: function () {
            return '/seckill/time/now';
        },
        exposer: function (seckillId) {
            return '/seckill/' + seckillId + '/exposer';
        },
        execution: function (seckillId, md5) {
            return '/seckill/' + seckillId + '/' + md5 + '/execution';
        }
    },
    
    validatePhone:function (phone) {

        if (phone && phone.length == 11 && !isNaN(phone)) {
            return true;
        } else {
            return false;
        }
    },

    handleSeckill:function (seckillId, node) {
        //处理秒杀逻辑

        node.hide()
            .html('<button class="btn btn-primary brn-lg" id="killBtn">进行秒杀</button>');
        $.post(seckill.URL.exposer(seckillId), {}, function (result) {
            //在回调函数中，执行交互流程
            var exposer = result['data'];
            if(result && result['success']) {
                if(exposer['exposed']) {
                    //开启秒杀
                    var md5 = exposer['md5'];
                    var killUrl = seckill.URL.execution(seckillId, md5);

                    //绑定一次点击事件
                    $('#killBtn').one('click', function () {
                        //绑定执行秒杀请求
                        //1 禁用按钮
                        //
                        $(this).addClass('disable');
                        
                        $.post(killUrl, {}, function (result) {
                            if(result && result['success']) {
                                var r = result['data'];
                                var state = r['state'];
                                var stateInfo = r['stateInfo'];
                                node.html('<span class="label label-success">'+ stateInfo + '</span>');
                            } else {
                                console.log(result['success']);
                            }
                        })
                    });

                    node.show();
                } else {
                    //未开启秒杀
                    var now = exposer['now'];
                    var start = exposer['start'];
                    var end = exposer['end'];
                    seckill.countdown(seckillId, now, start, end);
                }
            } else {
                console.log('result: ' + result);
            }
        })
    },

    countdown: function (seckillId, nowTime, startTime, endTime) {
        //时间判断

        var seckillBox = $('#seckill-box');

        if(nowTime > endTime) {
            //秒杀结束
            seckillBox.html('秒杀结束');
        } else if (nowTime < startTime) {
            //秒杀未开始
            var killTime = new Date(startTime + 1000);
            seckillBox.countdown(killTime, function(event) {
                var format = event.strftime('秒杀倒计时：%D天 %H时 %M分 %S秒');
                seckillBox.html(format);
            }).on('finish.countdown',function () {
                //时间完成后的回调事件
                //获取秒杀地址，控制显示逻辑，执行秒杀
                seckill.handleSeckill(seckillId, seckillBox);
            });
        } else {
            //秒杀进行中
            seckill.handleSeckill(seckillId, seckillBox);
        }
    },


    //详情页秒杀逻辑
    detail: {
        //详情页初始化
        init: function (params) {
            //用户手机验证和登陆，计时交互
            //规划交互流程

            //cookie中查找手机号
            var killPhone = $.cookie('killPhone');


            if (!seckill.validatePhone(killPhone)) {

                var killPhoneModal = $('#killPhoneModal');
                killPhoneModal.modal({
                    show: true,
                    backdrop: 'static',
                    keyboard: false
                });
                $('#killPhoneBtn').click(function () {
                    var inputPhone = $('#killPhoneKey').val();
                    if(seckill.validatePhone(inputPhone)) {
                        //电话写入cookie
                        $.cookie('killPhone', inputPhone, {
                            expires:7,
                            path:'/seckill'
                        });
                        //刷新页面
                        window.location.reload();
                    } else {
                        $('#killPhoneMessage').hide().html('<label class="label label-danger"\\>手机号错误</label>').show(300);
                    }

                });
            }
            //已经登陆

            var startTime = params['startTime'];
            var endTime = params['endTime'];
            var seckillId = params['seckillId'];
            $.get(seckill.URL.now(),{},function(r){
                //
                if(r && r['success']){
                    var nowTime = r['data'];
                    //时间判断
                    seckill.countdown(seckillId, nowTime, startTime, endTime);
                } else {

                }

            });
        }

    }
}