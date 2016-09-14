Meteor.publish("dynamics",function(){
	return Dynamics.find({});
});

Meteor.publish("dynItems",function(){
	return DynItems.find({});
});