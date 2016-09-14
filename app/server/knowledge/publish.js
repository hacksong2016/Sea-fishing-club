Meteor.publish("knowledgeData", function(knowledgeid) {
    var k = Knowledges.findOne({
        _id: knowledgeid
    }, {})
    return [Knowledges.find({
        _id: knowledgeid
    }, {}),
    Dynamics.find({_id:k.dynamic})
    ];
});

Meteor.publish("knowledgeDataItem", function(knowledgeItemid) {
    var k = KnoItems.findOne({
        _id: knowledgeItemid
    }, {})
    return [KnoItems.find({
        _id: knowledgeItemid
    }, {}),
    DynItems.find({_id:k.dynItem})
    ];
});

Meteor.publish("knowledges", function() {
    return Knowledges.find({status: 1},{
    	 sort: {
            createAt: -1
  	  },
  	   limit:5
    });
});

Meteor.publish("AllKnoItems",function(dynItemid){
   var modify = {
        fields: {
            thumb: 1,
            topic: 1,
            summray: 1,
            createAt: 1,
            dynamic:1,
        },
        sort: {
            createAt: -1
        }
    };
    if(dynItemid){
        return KnoItems.find({dynItem:dynItemid},modify); 
    }else{
        return KnoItems.find({},modify); 
    }
});


Meteor.publish("allKnowledges", function(dynamicid) {
    var modify = {
        fields: {
            thumb: 1,
            topic: 1,
            summray: 1,
            createAt: 1,
            dynamic:1,
        },
        sort: {
            createAt: -1
        }
    };
    if(dynamicid){
        return Knowledges.find({dynamic:dynamicid},modify); 
    }else{
        return Knowledges.find({},modify); 
    }
});

Meteor.publish("allDynItems", function(dynamicid) {
    var modify = {
        fields: {
            thumb: 1,
            topic: 1,
            createAt: 1,
            dynamic:1,
            dynItem:1,
        }
      
    };

    if(dynamicid){
        return DynItems.find({dynamic:dynamicid},modify); 
    }else{
        return DynItems.find({},modify); 
    }
   
});



