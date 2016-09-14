
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
        return str.match(/^[a-zA-Z0-9_]{1,}$/);
    },
    checkTel: function(str) {
       return str.match(/^0?1[3|4|5|8][0-9]\d{8}$/);
    },
    backto:function(){
        FlowRouter.go("/");
    },
    needAdmin:1
};
