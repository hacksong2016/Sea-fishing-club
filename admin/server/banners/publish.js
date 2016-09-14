Meteor.publish("banners",function(args){
	return Banners.find();
});