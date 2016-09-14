var homeRoutes = FlowRouter.group({
    prefix: "/home"
});
homeRoutes.route('/', {
    name:"home",
	action: function(params, queryParams) {
		FlowLayout.render("home");
	},
  triggersEnter: function(context, redirect) {
        if (facc.isGuest()) {
            FlowRouter.go("/login");
        }
    }
});
homeRoutes.route('/actives', {
    action: function(params, queryParams) {
        FlowLayout.render("actives");
    },
  triggersEnter: function(context, redirect) {
        if (facc.isGuest()) {
            FlowRouter.go("/login");
        }
    }
});
homeRoutes.route('/info', {
	action: function(params, queryParams) {
		FlowLayout.render("homeInfo");
	},
  triggersEnter: function(context, redirect) {
        if (facc.isGuest()) {
            FlowRouter.go("/login");
        }
    }
});
homeRoutes.route('/nickname', {
	action: function(params, queryParams) {
		FlowLayout.render("homeNickname");
	},
  triggersEnter: function(context, redirect) {
        if (facc.isGuest()) {
            FlowRouter.go("/login");
        }
    }
});
homeRoutes.route('/password', {
	action: function(params, queryParams) {
		FlowLayout.render("homePassword");
	},
  triggersEnter: function(context, redirect) {
        if (facc.isGuest()) {
            FlowRouter.go("/login");
        }
    }
});

homeRoutes.route('/point', {
    action: function(params, queryParams) {
        FlowLayout.render("homePoint");
    },

});

