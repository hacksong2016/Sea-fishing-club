Template.register.events({
    'click .regBtn': function() {

        var tel = $("#tel").val();
        var username = $("#username").val();
        var password = $("#password").val();

        if (!facc.checkTel(tel)){
            alert('请填写手机号');
            return false;
        }

        if (!facc.checkUsername(username)){
            alert('用户名由字母数字及下划线组成');
            return false;
        }

        if (password.length < 6) {
            alert('密码应大于六位');
            return false;
        }

            Meteor.call('accountRegisterGetCode', {
                "tel": tel,
                "password": password,
                "inviteFrom": $("#invite").val(),
                "username": username
            }, function(error, result) {
                if (result == "SUCCESS") {
                    FlowRouter.go("/register/code");
                    Session.set("regTel",tel);
                } else if (result == "ERROR_REPEAT_TEL") {
                    alert('手机号码已存在');
                } else if (result == "ERROR_RIGHT") {
                    alert('权限不足');
                } else if (result == "ERROR_REPEAT_NICK") {
                    alert('昵称已存在');
                } else {
                    alert('注册信息错误');
                }
                $("#page-login-loading").hide();
            });
    },
});
