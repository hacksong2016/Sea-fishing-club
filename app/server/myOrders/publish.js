Meteor.publish("myOrders", function(uid) {
    return Orders.find({"uid":uid});
});
Meteor.publish("myOrdersGoodsSimple", function(gid) {
    return Goods.find({_id:gid});
});