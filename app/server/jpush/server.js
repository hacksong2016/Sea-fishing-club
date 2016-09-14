jpush = {
    server: function(msg) {
        if (jpush._check(msg)) {

            //初始化用户标签
            var upi = UsersPushInfo.findOne({ userid: msg.userid });
            if (upi) {
                msg.regid = upi.regid;
            }
            UserPushs.insert(msg);
        }
    },
    _check: function(msg) {
        // if (!msg.type) {
        //     console.log("需要制定是SERVER还是LOCAL");
        //     return false;
        // }
        if (!msg.content) {
            console.log("请填写推送内容");
            return false;
        }
        if (!msg.title) {
            console.log("ANDROID平台需要标题");
            return false;
        }
        if (!msg.url) {
            console.log("请设置跳转方向");
            return false;
        }
        // if (!msg.userid && !msg.regid) {
        //     console.log("请设置用户ID 或 设备注册ID");
        //     return false;
        // }
        if (isNaN(msg.badge * 1)) {
            console.log("请设置IOS提示角标，0为取消");
            return false;
        }
        if (isNaN(msg.delay * 1)) {
            console.log("请设置延时时间，单位秒");
            return false;
        }
        return true;
    }
}
