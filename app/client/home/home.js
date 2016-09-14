Template.home.onCreated(function() {
    this.subscribe("userDetail", facc.user()._id);
});
Template.home.helpers({
    user: function() {
        return Meteor.users.findOne({
            _id: facc.user()._id
        });
    },
   
});
Template.home.events({
    "change #avatar": function(event) {

        var that = $(event.currentTarget);

        lrz(event.currentTarget.files[0], {
            width: 720
        }).then(function(rst) {
            Meteor.call('homeUpdateAvatar', {
                "uid": facc.user()._id,
                "avatar": rst.base64,
            }, function(error, result) {
                that.parent().css({
                    "background-image": "url(" + rst.base64 + ")"
                });
                facc.setState("avatar", rst.base64);
                alert('头像已更新');
            });

        });
    },
    "click .home-qd": function() {
        $(".home-qd").hide();
        Meteor.call("qiandaook", { uid: facc.user()._id }, function(e, r) {})
    },
    "click .list-q":function() {
        if($(".con-con").css("display")=="none"){
            $(".con-con").fadeIn();
        } else{
            $(".con-con").fadeOut();
        }
    },
    "click .corfirm-qu":function(){
         $(".con-con").fadeOut();
    },
    "click .con-con":function(){
         $(".con-con").fadeOut();
    },
    "click .home-da":function(){
         alert("开发中~");
    },
    "click .home-dd":function(){
         alert("开发中~");
    }
});
Template.home.onRendered(function() {

    if (!facc.isGuest()) {
        
        Meteor.call("qiandao", { uid: facc.user()._id }, function(e, r) {
            if (r) {
                $(".home-qd").show();
            } else {
                $(".home-qd").hide();
            }

        })
    }


});
