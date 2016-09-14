Template.knowledgeBottom.onCreated(function() {
    this.subscribe("knowledgeData", facc.user()._id,FlowRouter.getQueryParam("id"));
});
Template.knowledgeBottom.helpers({
    knowledges: function() {

        var obj = Knowledges.findOne();

        if (obj) {
            Session.set("SHAREOBJ", {
                title: obj.topic,
                desc: obj.summray,
                message: obj.summray,
                image: obj.thumb,
                url: ("http://xdb.fami2u.com/knowledges/detail?id=" + obj._id),
            });
        }


        return obj;
    },
    checkNum:function(num){
        return num ? num : 0 
    }
}); 
Template.knowledgeBottom.events({
	"click #Like" :function(){
        var cur_id = FlowRouter.getQueryParam("id");
        var likids = localStorage.getItem("likid") || "";
            likids = likids.split(",");
        if(likids.indexOf(cur_id)>0){
            alert("已点赞~");
        } else {
            likids.push(cur_id);
            likids = likids.join(',');
            localStorage.setItem("likid",likids); 
            Knowledges.update({
                _id:FlowRouter.getQueryParam("id"),
            },{
                $inc:{like:1}
            })
        } 
	},
    "click #Collection" :function(){
        var cur_id = FlowRouter.getQueryParam("id");
        var colids = localStorage.getItem("colid") || "";  
            colids = colids.split(",");
        if(colids.indexOf(cur_id)>0){
            alert("已收藏~");
        } else {
            colids.push(cur_id);
            colids = colids.join(',');
            localStorage.setItem("colid",colids); 
            Knowledges.update({
                _id:FlowRouter.getQueryParam("id"),
            },{
                $inc:{collection:1}
            })
        }
    }
    
});

Template.knowledgeBottom.onRendered(function(){
     Knowledges.update({
            _id:FlowRouter.getQueryParam("id"),
        },{
            $inc:{read:1}
        })
});