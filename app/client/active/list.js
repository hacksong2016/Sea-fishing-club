Template.activeList.onCreated(function() {
    this.subscribe("actives");
});
Template.activeList.helpers({
    actives:function(){
        return Actives.find({},{sort:{orderBy:-1,createAt:-1}})
    }
});
Template.activeList.events({
 
});
Template.activeList.onRendered(function() {
   
});
