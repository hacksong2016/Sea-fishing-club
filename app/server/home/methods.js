Meteor.methods({

    homeUpdateUserNickname: function(args) {
        Meteor.users.update({
            _id: args.uid
        }, {
            $set: {
                nickname: args.value
            }
        });
    },

    homeUpdateAvatar: function(args) {
        upload(args.avatar, function(data) {
            Meteor.users.update({
                _id: args.uid
            }, {
                $set: {
                    "avatar": data
                }
            });
        });
    },

    homeUpdateUserPassword: function(args) {
        var uid = args.uid;
        var pwd = args.pwd;

        var user = Meteor.users.findOne({
            _id: uid
        });
        var md5 = CryptoJS.MD5(pwd + user.salt).toString();
        Meteor.users.update({
            _id: uid
        }, {
            $set: {
                password: md5
            }
        });
    },
    qiandao: function(args) {


        var now = new Date();

        var nowDate = now.getFullYear() + "/" + (now.getMonth() + 1) + "/" + now.getDate();

        var qd = Qiandao.findOne({ userid: args.uid, sigDay: nowDate });

      
        if (qd) {

            
            return true;

        } else {

            // if(Qiandao.find({ userid: args.uid }).count() > 5){

            //     return false;
            // }

            return false;
        }


        return Qiandao.find({ userid: args.uid }, { sort: { createAt: -1 } }).fetch();
    },
    qiandaook: function(args) {

        var now = new Date();

        var nowDate = now.getFullYear() + "/" + (now.getMonth() + 1) + "/" + now.getDate();


        Meteor.users.update({ _id: args.uid }, {
            $inc: { point: 5 }
        });
        Qiandao.insert({ userid: args.uid, createAt: new Date() , sigDay: nowDate });

    },
   
});
