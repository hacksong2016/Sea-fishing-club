Meteor.publish("records",function(args){
	return Records.find();
});
Meteor.publish("recordsTables",function(args){
	return RecordsTables.find();
});
Meteor.publish("recordsReports",function(args){
	return RecordsReports.find();
});