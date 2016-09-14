Meteor.methods({
    saveAddress: function(args) {
        Addresses.find({
            default: 1,
            uid: args.uid
        }).forEach(function(o) {
            o.default = 0;
            Addresses.update({
                _id: o._id
            }, {
                $set: o
            });
        });
        var aid = Addresses.insert({
            uid: args.uid,
            street: args.street,
            name: args.name,
            tel: args.tel,
            default: 1,
        });
        return aid;
    },
    saveOrder: function(args) {

        var address = {};
        if (args.address) {
            address = Addresses.findOne({
                _id: args.address
            });
        } else {
            address = Addresses.findOne({
                default: 1,
                uid: args.uid,
            });
        }
        var user = Meteor.users.findOne({
            _id: args.uid

        });
        var goods = Goods.findOne({
            _id: args.gid
        });

        if (goods.kc > 0) {
            if ((goods.type == "point")) {

                if (user.point >= goods.point) {
                    var orderid = Orders.insert({
                        uid: args.uid,
                        address: address,
                        gid: args.gid,
                        type: "point",
                        createAt: new Date(),
                        status: "SUBMIT"
                    });

                    Goods.update({
                        _id: args.gid
                    }, {
                        $inc: {
                            kc: -1
                        }
                    });

                    Meteor.users.update({
                        _id: args.uid
                    }, {
                        $inc: {
                            point: (goods.point * -1)
                        }
                    });

                    PointTracks.insert({
                        uid: args.uid,
                        point: goods.point,
                        type: "goods",
                        forid: args.gid,
                        createAt: new Date(),
                        desc: "Point Market",
                    });

                    return orderid;
                } else {
                    return "ERROR_POINT";
                }
            } else {
                var orderid = Orders.insert({
                    uid: args.uid,
                    address: address,
                    gid: args.gid,
                    type: "cash",
                    createAt: new Date(),
                    status: "SUBMIT"
                });

                Goods.update({
                    _id: args.gid
                }, {
                    $inc: {
                        kc: -1
                    }
                });
                return orderid;
            }
        } else {
            return "ERROR_KC";
        }




    },
    changeAddress: function(args) {
        Addresses.find({
            default: 1,
            uid: args.uid
        }).forEach(function(o) {
            o.default = 0;
            Addresses.update({
                _id: o._id
            }, {
                $set: o
            });
        });
        Addresses.update({
            _id: args.addressid
        }, {
            $set: {
                default: 1
            }
        });
    }
});
