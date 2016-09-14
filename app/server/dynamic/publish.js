Meteor.publish("dynamics",function(dynamicid){
	return Dynamics.find({});
});

Meteor.publish("dynItems",function(dynItemid){
	return DynItems.find({});
});