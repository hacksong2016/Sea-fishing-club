Meteor.publish("users",function(args){
	return Meteor.users.find();
});