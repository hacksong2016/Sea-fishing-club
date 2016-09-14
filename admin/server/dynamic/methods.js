Meteor.methods({
    uploadDynamicThumb: function(args) {
        var obj = Dynamics.findOne({
            _id: args._id
        });
        upload(obj.thumb, function(data) {
            Dynamics.update({
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
    uploadDynItemThumb: function(args) {
        var obj = DynItems.findOne({
            _id: args._id
        });
        upload(obj.thumb, function(data) {
            DynItems.update({
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