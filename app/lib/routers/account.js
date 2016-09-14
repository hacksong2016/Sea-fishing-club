FlowRouter.route('/login', {
  name:"login",
  action: function(params, queryParams) {
    FlowLayout.render("login");
  }
});

FlowRouter.route('/register', {
  name:"login",
  action: function(params, queryParams) {
   	FlowLayout.render("register");
  }
});
FlowRouter.route('/register/code', {
  action: function(params, queryParams) {
   	FlowLayout.render("registerCode");
  }
});

FlowRouter.route('/forget', {
  action: function(params, queryParams) {
    FlowLayout.render("forget");
  }
});
FlowRouter.route('/forget/code', {
  action: function(params, queryParams) {
   	FlowLayout.render("forgetCode");
  }
});
FlowRouter.route('/logout', {
  action: function(params, queryParams) {
    facc.logout();
    
    FlowRouter.go("/");
  }
});

