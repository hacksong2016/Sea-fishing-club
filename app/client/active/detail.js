Template.activeDetail.onCreated(function() {
    this.subscribe("activeData", FlowRouter.getQueryParam("id"));
});
Template.activeDetail.helpers({
    active: function() {
        var obj = Actives.findOne();

        if (obj) {
            Session.set("SHAREOBJ", {
                title: obj.topic,
                desc: obj.summray,
                message: obj.summray,
                image: obj.thumb,
                url: ("http://mfy.fami2u.com/active/detail?channel=app&id=" + obj._id),
            });
        }


        return obj;
    },
    vaild: function(str) {
        console.log(str);
        var c = new Date(str);
        var n = new Date();

        return n > c;
    },
    mine: function() {
        return UserActives.findOne({
            userid: facc.user()._id,
            active: FlowRouter.getQueryParam("id")
        });
    },
    txtformat: function(txt) {
        if (txt) {
            var arr = txt.split("。");
            return arr.join("。<br/>");
        }
    },
    checkMax: function(ac) {
        console.log(ac);
        if (ac && ac.max) {

            if (ac.max > ac.num) {
                return true;
            } else {

                return false;
            }
        } else {
            return true;
        }
    },
    hadAction: function(ac) {
        console.log(ac);
        if(ac){
            return $.inArray(ac.users,facc.user()._id);
        }
        
    }

});
Template.activeDetail.events({
    "click .active-action": function(event) {
        if (facc.isGuest()) {
            FlowRouter.go("/login");
            return;
        }
        var that = $(event.currentTarget);
        UserActives.insert({
            userid: facc.user()._id,
            active: FlowRouter.getQueryParam("id"),
            createAt: new Date(),
        })
        Actives.update({
            _id: FlowRouter.getQueryParam("id")
        }, {
            $addToSet: {
                users: facc.user()._id
            }
        });
    }
})
Template.activeDetail.onRendered(function() {
    $(window).scrollTop(0);
});
