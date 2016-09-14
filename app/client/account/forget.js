Template.forget.events({
    'click .codeBtn': function() {

        var tel = $("#tel").val();

        if (!facc.checkTel(tel)) {
            alert('请填写手机号');
            return false;
        }

        Meteor.call('accountForget', {
            "tel": tel
        }, function(error, result) {
            if (result.indexOf("ERROR") < 0) {
                alert('验证码已发送请注意查收');
                FlowRouter.go("/forget/code");
            } else {
                alert('未找到用户');
            }

        });
    },
});
