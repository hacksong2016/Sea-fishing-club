Template.homeActiveItem.onCreated(function() {
	
    this.subscribe("activeSimple", this.data.active);
    // this.subscribe("activeOthers",FlowRouter.getQueryParam("id"));
});
Template.homeActiveItem.helpers({
    info: function() {
        return Actives.findOne({_id:this.active});
    },

});
Template.homeActiveItem.events({

})
