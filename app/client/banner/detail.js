Template.bannerDetail.onCreated(function () {
	this.subscribe("bannersDetail",FlowRouter.getQueryParam("id"));
});
Template.bannerDetail.helpers({
	banner:function(){
		return Banners.findOne({_id:FlowRouter.getQueryParam("id")});
	}
	
});
Template.bannerDetail.onRendered(function() {

});