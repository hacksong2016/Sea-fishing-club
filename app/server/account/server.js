Meteor.startup(function() {

    facc.sms.account = "Fmxx888";
    facc.sms.pwd = "fami@2014";

    facc.insert = function(err, id) {
        var invite = CryptoJS.MD5(id).toString().substring(0, 8);
        Meteor.users.update(id, {
            $set: {
                "avatar": "/avatar.png",
                "invite": invite,
            },
            $inc: { point: 20 }
        });


        //处理邀请关系
        var user = Meteor.users.findOne({ _id: id });
        if (user.inviteFrom) {
            var fu = Meteor.users.findOne({ invite: user.inviteFrom });
            if (fu) {
                Meteor.users.update({ _id: fu._id }, {
                    $inc: { point: 50 }
                });
            }
        }

    }

});
