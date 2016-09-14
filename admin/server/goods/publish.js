Meteor.publish("goods",function(args){
	return Goods.find();
});