var activeRoutes = FlowRouter.group({
    prefix: "/active"
});
activeRoutes.route('/', {
	name:"active",
	action: function(params, queryParams) {
		FlowLayout.render("activeList");
	}
});

activeRoutes.route('/detail', {
	name:"activeDetail",
	action: function(params, queryParams) {
		FlowLayout.render("activeDetail");
	}
});
activeRoutes.route('/mine', {
	action: function(params, queryParams) {
		FlowLayout.render("activeMine");
	}
});

activeRoutes.route('/order', {
	name:"activeOrder",
	action: function(params, queryParams) {
		FlowLayout.render("activeOrder");
	},
    triggersEnter: function(context, redirect) {
        if (facc.isGuest()) {
            FlowRouter.go("/login");
        }
    }
});

activeRoutes.route('/check', {

	action: function(params, queryParams) {
		FlowLayout.render("activeCheck");
	},
    triggersEnter: function(context, redirect) {
        if (facc.isGuest()) {
            FlowRouter.go("/login");
        }
    }
});

FlowRouter.route('/checkActive', {
	name:"checkActive",
  action: function(params, queryParams) {
    FlowLayout.render("checkActive");
  }
});
