Template.knowledgeItem.onCreated(function() {
    this.subscribe("AllKnoItems",FlowRouter.getQueryParam("id"));
    this.subscribe("dynItems");
});
Template.knowledgeItem.helpers({
    knoItems:function(){
        return KnoItems.find({},{sort:{createAt:-1}})
    },
    dynItems:function(){
        return DynItems.find({})
    },
    name:function(){
        if(FlowRouter.getQueryParam("id")){
            var c = DynItems.findOne({_id:FlowRouter.getQueryParam("id")});
            if(c){
                return c.topic;
            }
        }else{
            return "全部产品";
        }
    }   
   
});
Template.knowledgeItem.events({
 
});
Template.knowledgeItem.onRendered(function() {
   
});
