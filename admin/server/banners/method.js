Meteor.methods({
    uploadBannerThumb: function(args) {
        var obj = Banners.findOne({
            _id: args._id
        });
        upload(obj.thumb, function(data) {
            Banners.update({
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