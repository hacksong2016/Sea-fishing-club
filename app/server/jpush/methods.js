//推送服务器端方法
Meteor.methods({
    //更新服务器端注册ID，再次必须返回［］数组形式的用户标签列表，最少为［“注册用户”］
    updateJpushRegistrationID: function(args) {
        //初始化用户标签
        var tags = ["注册用户"];

        var upi = UsersPushInfo.findOne({ userid: args.userid, regid: args.id });

        if (upi) {
            UsersPushInfo.update({ _id: upi._id }, { $set: { regid: args.id } })
        } else {
            UsersPushInfo.insert({ userid: args.userid, regid: args.id });
        }
        console.log(args, tags)
        return tags;
    },
    jpushServerPush: function(args) {
       jpush.server(args);
    },
});

// UsersPushInfo = new Meteor.Collection("usersPushInfo");
// UserPushs = new Meteor.Collection("userPushs");
