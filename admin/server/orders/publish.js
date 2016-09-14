Meteor.publish("orders",function(args){
	return Orders.find();
});
