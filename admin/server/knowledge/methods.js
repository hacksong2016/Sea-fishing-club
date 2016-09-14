Meteor.methods({
    uploadKnowledgeThumb: function(args) {
        var obj = Knowledges.findOne({
            _id: args._id
        });
        upload(obj.thumb, function(data) {
            Knowledges.update({
                _id: args._id
            }, {
                $set: {
                    "thumb": data
                }
            });
        }, function(e) {
            throw e;
        });
    },

});

Meteor.methods({
    uploadKnoItemThumb: function(args) {
        var obj = KnoItems.findOne({
            _id: args._id
        });
        upload(obj.thumb, function(data) {
            KnoItems.update({
                _id: args._id
            }, {
                $set: {
                    "thumb": data
                }
            });
        }, function(e) {
            throw e;
        });
    },

});