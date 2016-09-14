Meteor.methods({
    uploadRecordThumb: function(args) {
        var record = Records.findOne({
            _id: args._id
        });
        upload(record.thumb, function(data) {
            Records.update({
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