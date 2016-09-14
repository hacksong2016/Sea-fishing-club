Template.knowledgeList.onCreated(function() {
    this.subscribe("allKnowledges",FlowRouter.getQueryParam("id"));
    this.subscribe("dynamics");
    this.subscribe("allDynItems",FlowRouter.getQueryParam("id"));
});
Template.knowledgeList.helpers({
    knowledges:function(){
        return Knowledges.find({},{sort:{orderBy:-1,createAt:-1}})
    },
    dynItems:function(){
        return DynItems.find({})
    },
    cname:function(){
		if(FlowRouter.getQueryParam("id")){
			var c = Dynamics.findOne({_id:FlowRouter.getQueryParam("id")});
			if(c){
				return c.topic;
			}
		}else{
			return "全部产品";
		}
		
	}

});
Template.knowledgeList.events({
 
});
Template.knowledgeList.onRendered(function() {
   
});
