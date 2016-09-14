Meteor.publish("banners", function(group) {
    return Banners.find({
        status: 1,
        "group": group
    });
});
Meteor.publish("bannersDetail", function(id) {
    return Banners.find({
        _id: id
    });
});
