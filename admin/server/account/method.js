Meteor.methods({
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
            "avatar": user.avatar,
        };
    },
});
