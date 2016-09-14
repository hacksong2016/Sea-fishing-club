Template.myOrders.onCreated(function() {
    this.subscribe("myOrders", facc.user()._id);
});
Template.myOrders.helpers({
    filter:function(str){
        if(FlowRouter.getQueryParam("status")){
            return FlowRouter.getQueryParam("status") == str;
        }else if(str == "ALL"){
            return true;
        }
    },
    orders: function() {

        if (FlowRouter.getQueryParam("status") && (FlowRouter.getQueryParam("status") != "ALL")) {
            var status = FlowRouter.getQueryParam("status");
            return Orders.find({
                "status":status
            }, {
                sort: {
                    createAt: -1
                }
            });
        } else {
            return Orders.find({}, {
                sort: {
                    createAt: -1
                }
            });
        }

    }
});
