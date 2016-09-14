Meteor.publish("activeData", function(activeid) {
    return Actives.find({
        _id: activeid
    }, {});
});

Meteor.publish("activeOthers", function(activeid) {
    var ac = Actives.findOne({
        _id: activeid
    });

    return [
        Actives.find({
            $or: [{
                _id: activeid
            }, {
                spot: ac.spot,
                status: 1
            }]

        })
    ];
});
Meteor.publish("actives", function() {
    return [
        Actives.find({status: 1}),
    ];
});
Meteor.publish("activeSimple", function(activeid) {
   
    return [
        Actives.find({
            _id: activeid
        }, {
            fields: {
                "thumb": 1,
                "summary": 1,
                "topic": 1,
                "num": 1,
            }
        })
    ];
});
