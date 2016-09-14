Template.knowledgeBottomItem.onCreated(function() {
    this.subscribe("knowledgeData", facc.user()._id,FlowRouter.getQueryParam("id"));
});
Template.knowledgeBottomItem.helpers({
    knoItems: function() {
        return KnoItems.findOne();
    },
    checkNum:function(num){
        return num ? num : 0
    }
});
Template.knowledgeBottomItem.events({
	"click #Like" :function(){
        var cur_id = FlowRouter.getQueryParam("id");
        var likids = localStorage.getItem("likid") || "";  
            likids = likids.split(","); // split() 该方法将一个字符串对象split()分离字符串子串的字符串数组。
        if(likids.indexOf(cur_id)>0){   
            alert("已点赞~");
        } else {
            likids.push(cur_id); // push() 方法添加一个或多个元素到数组的末尾，并返回数组新的长度（length 属性值）。
            likids = likids.join(','); // join() 方法将数组中的所有元素连接成一个字符串。
            localStorage.setItem("likid",likids); 
            KnoItems.update({
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
            KnoItems.update({
                _id:FlowRouter.getQueryParam("id"),
            },{
                $inc:{collection:1}
            })
        } 
    }
    
});

Template.knowledgeBottomItem.onRendered(function(){
     KnoItems.update({
            _id:FlowRouter.getQueryParam("id"),
        },{
            $inc:{read:1}
        })
});

