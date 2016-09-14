Meteor.publish("knowledges",function(){
	return Knowledges.find({});
});

Meteor.publish("knoItems",function(){
	return KnoItems.find({});
});
