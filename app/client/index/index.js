Template.site.onCreated(function() {
    this.subscribe("knowledges");
    this.subscribe("dynamics");
});
Template.site.helpers({
    knowledges:function(){
        return Knowledges.find({},{sort:{orderBy:-1,createAt:-1}})
    },
    dynamics:function(){
        return Dynamics.find({},{sort:{createAt:-1}})
    }
   
});
Template.site.events({
    "click #test":function(event){
       jpush.local({
            content:"testcontent",
            title:"testtitle",
            url:"/",
            userid:facc.user()._id,
            badge:2,
            delay:5,
        });
    }
});

