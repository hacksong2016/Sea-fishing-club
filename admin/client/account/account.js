FlowRouter.triggers.enter([function(context,redirect){

  if(facc.isGuest()){
    facc.callback = FlowRouter.current().path;
    FlowRouter.go("/login" );
  }
  
}], {except: ["login","logout"]});

FlowRouter.route('/login', {
  name:"login",
  action: function(params, queryParams) {
    FlowLayout.render("login");
  }
});
FlowRouter.route('/logout', {
  action: function(params, queryParams) {
    facc.logout();
    console.log("exit");
    FlowRouter.go("/");
  }
});

Template.login.events({

    "click .loginBtn": function() {

        var tel = $("#tel").val();
        var password = $("#password").val();

        Meteor.call('accountLoginWithTel', {
            "tel": tel,
            "password": password
        }, function(error, result) {
            if (typeof result == "object") {
                facc.set(result);
                alert(result.nickname + ',欢迎回来');
                facc.backto();
            } else if (result == "ERROR_RIGHT") {
                alert('权限不足');
            } else {
                alert('用户名/密码不匹配');
            }
        });
    }
});
