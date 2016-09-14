Meteor.publish("regions",function(args){
	return Regions.find();
});