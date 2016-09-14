
Meteor.publish("allGoods", function(uid) {
    return Goods.find({
        status: 1
    }, {
        fields: {
            thumb: 1,
            name: 1,
            point: 1,
            price: 1,
            type: 1,
            kc: 1,
            summary: 1,
        },
        sort: {
            createAt: -1
        }
    });
});
Meteor.publish("goodsDetail", function(uid, goodsid) {
    return Goods.find({
        _id: goodsid
    });
});
Meteor.publish("myAddress", function(uid) {

    return Addresses.find({
        uid: uid,
        default: 1
    });
});
Meteor.publish("myAllAddress", function(uid) {

    return Addresses.find({
        uid: uid
    });
});