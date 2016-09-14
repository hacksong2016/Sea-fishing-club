Template.checkActive.onCreated(function() {

    this.subscribe("userActiveAuth", facc.user()._id,FlowRouter.getQueryParam("id"));

});
Template.checkActive.helpers({
   
    ua:function(){
        return UserActives.findOne({check:false,_id:FlowRouter.getQueryParam("id")});
    },
    activeInfo:function(aid){
     
        return Actives.findOne({_id:aid});
    }
});
Template.checkActive.events({
   "click .cg-action":function(){
        if(confirm("验证确认")){
            Meteor.call("checkActiveAuth",{userid:facc.user()._id,uaid:FlowRouter.getQueryParam("id")},function(err,res){
                if(res == "ok"){
                    alert("已验证");
                }else{
                    alert("验证信息不符");
                }
            });
        }
   }
});
Template.checkActive.onRendered(function() {
  

});

