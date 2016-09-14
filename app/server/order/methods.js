Meteor.methods({
   
    checkActiveAuth: function(args) {
        var ua = UserActives.findOne({ _id: args.uaid });

        if (ua && !ua.check) {

            var active = Actives.findOne({ _id: ua.active });

            if (active && active.tel) {


                var user = Meteor.users.findOne({ _id: args.userid });

                    if (active.tel.indexOf(user.tel) > -1) {

                        UserActives.update({ _id: args.uaid }, { $set: { check: true } });
                        
                        return "ok";
                    }

            }

        }

        return "error";
    }
});
