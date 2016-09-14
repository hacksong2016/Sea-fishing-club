var shopRoutes = FlowRouter.group({
    prefix: "/shop"
});
shopRoutes.route('/', {
	name:"shop",
	action: function(params, queryParams) {
		FlowLayout.render("shop");
	}
});
shopRoutes.route('/goods', {
	action: function(params, queryParams) {
		FlowLayout.render("goods");
	}
});
shopRoutes.route('/order', {
	action: function(params, queryParams) {
		FlowLayout.render("shopOrder");
	},
    triggersEnter: function(context, redirect) {
        if (facc.isGuest()) {
            FlowRouter.go("/login");
        }
    }
});
shopRoutes.route('/address', {
	action: function(params, queryParams) {
		FlowLayout.render("address");
	},
    triggersEnter: function(context, redirect) {
        if (facc.isGuest()) {
            FlowRouter.go("/login");
        }
    }
});