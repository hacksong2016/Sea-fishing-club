Template.registerCode.events({
    'click .regComBtn': function() {
        if ($("#code").val() == "") {
            alert("请输入验证码");
        }

        Meteor.call('accountRegisterWithCode', {
            "code": $("#code").val()
        }, function(error, result) {
            if (typeof result == "object") {
                facc.set(result);
                alert(result.nickname + '：欢迎，注册已成功～');
                facc.backto();
                // FlowRouter.go("/dentist/choose");
            } else if (result == "ERROR_RIGHT") {
                alert('权限不足');
            } else if (result == "ERROR_REPEAT_TEL") {
                alert('手机号码已存在');
            } else if (result == "ERROR_REPEAT_NICK") {
                alert('昵称已存在');
            } else {
                alert('注册信息错误');
            }

        });
    },
    "click .page-login-back":function(){
        if(!$(".page-login-back").hasClass("page-login-disable")){
            //todo
            Meteor.call("resendCode",{tel:Session.get("regTel")},function(){
                Session.set("backtime",60);
                alert("验证码已发送请查收");
              
            });
        }
    }
});

Template.registerCode.helpers({
   backtime:function(){
    return Session.get("backtime") ?　("验证码已发送("+Session.get("backtime")+")")　: ("重新发送验证码")
   }
});
golinter = null;
Template.registerCode.onRendered(function(){
    Session.set("backtime",60);
    if(golinter){
        window.clearInterval(golinter);
    }
    golinter = window.setInterval(function(){
        Session.set("backtime",Session.get("backtime") - 1);
        if (Session.get("backtime") < 0) {
            Session.set("backtime","");
        }
        if(Session.get("backtime")){
            $(".page-login-back").addClass("page-login-disable");
        } 
        else{
             $(".page-login-back").removeClass("page-login-disable");
        }
    },1000);
});