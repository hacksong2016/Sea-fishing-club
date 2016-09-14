FlowRouter.route('/', {
	action: function(params, queryParams) {
    	FlowLayout.render('layout', { content: "index"});
	}
});

Template.layout.helpers({
	user:function(){
		return facc.user();
	},
	navigations:function(){
		return navigations.list;
	},
	active:function(sn){

		return Session.get("navigations-active") == sn;
	}
})