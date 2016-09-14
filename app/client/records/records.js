Template.records.onCreated(function(){
	this.subscribe("records", facc.user()._id);
});
Template.records.helpers({
	records:function(){
		
		return Records.find({userid:facc.user()._id});
	}
});