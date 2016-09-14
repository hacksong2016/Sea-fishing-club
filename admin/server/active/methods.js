Meteor.methods({
    uploadActiveThumb: function(args) {
        var obj = Actives.findOne({
            _id: args._id
        });
        upload(obj.thumb, function(data) {
            Actives.update({
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