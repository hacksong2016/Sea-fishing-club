Template.homeNickname.events({
    "click #save": function() {
        if ($("#nickname").val() == "") {
            alert("请输入有效字段");
            return;
        }

        var nn = $("#nickname").val();

        Meteor.call('homeUpdateUserNickname', {
            uid: facc.user()._id,
            value: nn
        }, function() {
            alert('昵称已修改');
            facc.setState("nickname",nn);
            FlowRouter.go("/home/info");
        })
    }
});
