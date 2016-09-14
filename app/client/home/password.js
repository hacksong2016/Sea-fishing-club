Template.homePassword.events({
    "click #save": function() {
        if ($("#password").val() == "") {
            alert("请输入有效字段");
            return;
        }

        var nn = $("#password").val();

        if($("#password").val() != $("#rpassword").val()){
            alert("密码不一致");
            return;
        }

        Meteor.call('homeUpdateUserPassword', {
            uid: facc.user()._id,
            pwd: nn
        }, function() {
            alert('密码已修改');
            FlowRouter.go("/home/info");
        })
    }
});