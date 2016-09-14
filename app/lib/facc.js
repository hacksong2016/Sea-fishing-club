facc = {
    _id: "FAMILYOFDEVELOPOER",
    user: function() {
        return {
            "_id": localStorage.getItem(facc._id + "_UID"),
            "nickname": localStorage.getItem(facc._id + "_NICK"),
            "avatar": localStorage.getItem(facc._id + "_AVATAR"),
        };
    },
    set: function(user) {
        Meteor.connection.setUserId(user._id);
        localStorage.setItem(facc._id + "_UID", user._id);
        localStorage.setItem(facc._id + "_NICK", user.nickname);
        localStorage.setItem(facc._id + "_AVATAR", user.avatar);
    },
    setState: function(key,value) {
        var userid = localStorage.getItem(facc._id + "_UID");
        localStorage.setItem(facc._id + "_" + key.toUpperCase(), value);
        var likid = localStorage.getItem(likid);
        localStorage.setItem(likid , value);
        var reaid = localStorage.getItem(reaid);
        localStorage.setItem(reaid , value);
        var colid = localStorage.getItem(colid);
        localStorage.setItem(colid , value);
    },
    get: function(key) {
        var userid = localStorage.getItem(facc._id + "_UID");
        return localStorage.getItem(facc._id + "_" + key.toUpperCase());
    },
    logout: function() {
        localStorage.removeItem(facc._id + "_UID");
        localStorage.removeItem(facc._id + "_NICK");
        localStorage.removeItem(facc._id + "_AVATAR");
        Meteor.logout();
    },
    isGuest: function() {
        return localStorage.getItem(facc._id + "_UID") ? false : true;
    },
    sms: {
        server: 'http://222.73.117.158/msg/HttpBatchSendSM?',
        account: "",
        pwd: "",
    },
    checkUsername: function(str) {
        return true;
    },
    checkTel: function(str) {
       return str.match(/^0?1[3|4|5|7|8][0-9]\d{8}$/);
    },
    backto:function(){
        FlowRouter.go("/");
    },
    needAdmin:0
};
