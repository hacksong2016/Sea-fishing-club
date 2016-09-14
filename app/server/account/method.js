Meteor.methods({
    accountRegisterGetCode: function(args) {
        if ((args.tel == "") || !facc.checkTel(args.tel)) {
            return "ERROR_UNKONE";
        }

        var user = Meteor.users.findOne({
            tel: args.tel
        });

        if (user) {
            return "ERROR_REPEAT_TEL";
        }

        user = Meteor.users.findOne({
            username: args.username
        });

        if (user) {
            return "ERROR_REPEAT_NICK";
        }

        this.unblock();

        var code = parseInt(Math.random() * 1000000);

        VaildCodes.insert({
            "account": args.tel,
            "username": args.username,
            "inviteFrom": args.inviteFrom,
            "password": args.password,
            "code": code + "",
            createAt:new Date(),
        });

        var html = args.username + ",您好:\n您的验证码是：" + code + ".请尽快登录，勿将此信息透露给他人。";

        console.log("SMS:" + html);

        HTTP.post(facc.sms.server, {
            params: {
                account: facc.sms.account,
                pswd: facc.sms.pwd,
                mobile: args.tel,
                msg: html,
            }
        }, function(error, result) {
            if (!error) {
                console.log("SMS-RES:" + result.content);
            } else {
                console.log("SMS-ERR:" + error);
            }
        });

        return "SUCCESS";
    },
    resendCode:function(args){
        var tel = args.tel;
        if(tel){
            var vc = VaildCodes.findOne({
                "account": args.tel
            },{sort:{createAt:-1}});
            if(vc){
                var html = vc.username + ",您好:\n您的验证码是：" + vc.code + ".请尽快登录，勿将此信息透露给他人。";

                console.log("SMS:" + html);

                HTTP.post(facc.sms.server, {
                    params: {
                        account: facc.sms.account,
                        pswd: facc.sms.pwd,
                        mobile: vc.tel,
                        msg: html,
                    }
                }, function(error, result) {
                    if (!error) {
                        console.log("SMS-RES:" + result.content);
                    } else {
                        console.log("SMS-ERR:" + error);
                    }
                });
            }
        }
    },
    accountRegisterWithCode: function(args) {
        if (args.code == "") {
            return "ERROR_UNKONE";
        }
        var vc = VaildCodes.findOne({
            "code": args.code + ""
        });
        if (!vc) {
            return "ERROR_NONE";
        }

        var user = Meteor.users.findOne({
            tel: vc.account
        });

        if (user) {
            return "ERROR_REPEAT_TEL";
        }

        user = Meteor.users.findOne({
            username: vc.username
        });

        if (user) {
            return "ERROR_REPEAT_NICK";
        }

        salt = parseInt(Math.random() * 1000000) + "";
        salt = CryptoJS.MD5(salt).toString();
        var md5 = CryptoJS.MD5(vc.password + salt).toString();

        user = {
            "nickname": vc.username,
            "username": vc.username,
            "inviteFrom": vc.inviteFrom,
            "password": md5,
            "salt": salt,
            "email": "",
            "vaildEmail": false,
            "tel": vc.account,
            "avatar": "/avatar.png",
            "point": 0,
            "balance": 0,
            "isadmin":0,
            "createAt":new Date(),
        };
       
        var uid = Meteor.users.insert(user,facc.insert);

        if(facc.needAdmin == 1){
            return "ERROR_RIGHT";
        }

        this.setUserId(uid);

        VaildCodes.remove(vc._id);

        return {
            "_id": uid,
            "nickname": user.nickname,
            "avatar": user.avatar
        };
    },
    accountLoginWithTel:function(args){

        if ((args.tel == "") || !facc.checkTel(args.tel)) {
            return "ERROR_UNKONE";
        }

        var user = Meteor.users.findOne({
            tel: args.tel
        });

        if (!user) {
            return "ERROR_NONE";
        }

        if((facc.needAdmin == 1) && (user.isadmin != 1)){
            return "ERROR_RIGHT";
        }

        salt = user.salt;

        var md5 = CryptoJS.MD5(args.password + salt).toString();

        if (md5 != user.password) {
            return "ERROR_PWD";
        }

        this.setUserId(user._id);

        return {
            "_id": user._id,
            "nickname": user.nickname,
            "avatar": user.avatar
        };
    },
    accountForget:function(args){

        if ((args.tel == "") || !facc.checkTel(args.tel)) {
            return "ERROR_UNKONE";
        }

        var user = Meteor.users.findOne({
            tel: args.tel
        });

        if (!user) {
            return "ERROR_NONE";
        }

        this.unblock();

        var code = parseInt(Math.random() * 1000000);

        VaildCodes.insert({
            "account": args.tel,
            "code": code + ""
        });

        var html = user.nickname + ",您好:\n您的验证码是：" + code + ".请尽快登录，勿将此信息透露给他人。";

        console.log("SMS:" + html);

        HTTP.post(facc.sms.server, {
            params: {
                account: facc.sms.account,
                pswd: facc.sms.pwd,
                mobile: args.tel,
                msg: html,
            }
        }, function(error, result) {
            if (!error) {
                console.log("SMS-RES:" + result.content);
            } else {
                console.log("SMS-ERR:" + error);
            }
        });

        return "SUCCESS";
    },
    accountLoginWithCode:function(args){

        if (args.code == "") {
            return "ERROR_UNKONE";
        }
        var vc = VaildCodes.findOne({
            "code": args.code + ""
        });

        if (!vc) {
            return "ERROR_NONE";
        }

        var user = Meteor.users.findOne({
            tel: vc.account
        });

       
        if (!user) {
            return "ERROR_NONE";
        }

        if((facc.needAdmin == 1) && (user.isadmin != 1)){
            return "ERROR_RIGHT";
        }

        this.setUserId(user._id);

        VaildCodes.remove(vc._id);

        return {
            "_id": user._id,
            "nickname": user.nickname,
            "avatar": user.avatar
        };
    }
});
