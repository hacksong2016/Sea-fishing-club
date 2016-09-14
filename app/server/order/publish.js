Meteor.publish("orderDetail", function(orderid) {
    return Orders.find({ _id: orderid });
});

Meteor.publish("userActiveAuth", function(uid, uaid) {

    var ua = UserActives.findOne({ _id: uaid });

    if (ua && !ua.check) {

        var active = Actives.findOne({ _id: ua.active });

        if (active && active.tel) {

            var user = Meteor.users.findOne({ _id: uid });

            if (active.tel.indexOf(user.tel) > -1) {
                return [
                    UserActives.find({ _id: uaid }),
                    Actives.find({ _id: ua.active })
                ];
            }

        }

    }

});
