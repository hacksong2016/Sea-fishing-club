Meteor.methods({
    uploadGoodsThumb: function(args) {
        var goods = Goods.findOne({
            _id: args._id
        });
        upload(goods.thumb, function(data) {
            Goods.update({
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
    uploadGoodsPics: function(args) {
        var goods = Goods.findOne({
            _id: args._id
        });
        for (var i = 0; i < goods.pictures.length; i++) {
            if (goods.pictures[i] && (goods.pictures[i].indexOf("base64") > -1)) {
                uploadGoodsPics(goods, i);
            }
        }
    },

});
uploadGoodsPics = function(goods, i) {
    var pic = goods.pictures[i];
    upload(pic, function(data) {
        var modify = {};
        modify["pictures." + i] = data;
        Goods.update({
            _id: goods._id
        }, {
            $set: modify
        })
    })
}