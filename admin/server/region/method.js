Meteor.methods({
    uploadRecordsTablesThumb: function(args) {
        var rt = RecordsTables.findOne({
            _id: args._id
        });
        upload(rt.thumb, function(data) {
            RecordsTables.update({
                _id: args._id
            }, {
                $set: {
                    "thumb": data
                }
            });
        }, function(e) {
            throw e;
        });
    }

});