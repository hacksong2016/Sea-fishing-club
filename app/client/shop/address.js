Template.address.onCreated(function() {
    this.subscribe("myAllAddress", facc.user()._id);
});
Template.address.helpers({
    address: function() {
        return Addresses.find({}, {
            sort: {
                default: 1
            }
        });
    }
});
Template.address.events({
    "click .address-save": function(event) {
        var that = $(event.currentTarget);
        if (!that.hasClass("so-inorder")) {
            that.addClass("so-inorder");
            that.html("正在处理中");
            Meteor.call("saveAddress", {
                uid: facc.user()._id,
                name: $("#addressName").val(),
                street: $("#addressAddress").val(),
                tel: $("#addressTel").val(),
            }, function(err, result) {
                alert("默认地址已更改");
                that.removeClass("so-inorder");
                that.html("保存地址");
                FlowRouter.go("/shop/order?id=" + FlowRouter.getQueryParam("id"));
            });

        }
    },
    "click .address-ct":function(event){
        var that = $(event.currentTarget);
         Meteor.call("changeAddress", {
                uid: facc.user()._id,
                addressid: that.attr("data-aid"),
            }, function(err, result) {
                alert("默认地址已更改");
                FlowRouter.go("/shop/order?id=" + FlowRouter.getQueryParam("id"));
            });
    }
});
