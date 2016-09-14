Template.recordsList.onCreated(function(){
	this.subscribe("record", FlowRouter.getQueryParam("id"));
	this.subscribe("recordTables", FlowRouter.getQueryParam("id"));
});
Template.recordsList.helpers({
	record:function(){
		return Records.findOne({_id:FlowRouter.getQueryParam("id")});
	},
	tables:function(){
		
		return  RecordsTables.find({"record":FlowRouter.getQueryParam("id")},{sort:{createAt:-1}});
	},
	none:function(){
		return RecordsTables.find().count() < 1;
	}

});
Template.recordsList.events({
	"click #recordes-remove" : function(){
		if(confirm("确认要删除此档案")){
			Records.remove({_id:FlowRouter.getQueryParam("id")});
			FlowRouter.go("/records");
		}
		
	}
});