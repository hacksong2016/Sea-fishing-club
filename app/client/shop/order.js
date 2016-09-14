Template.shopOrder.onCreated(function() {
    this.subscribe("goodsDetail", facc.user()._id, FlowRouter.getQueryParam("id"));
    this.subscribe("myAddress", facc.user()._id);
});
Template.shopOrder.helpers({
    goods: function() {
        return Goods.findOne({
            _id: FlowRouter.getQueryParam("id")
        });
    },
    address: function() {
        return Addresses.findOne();
    },
    compare: function(str1, str2) {
        return str1 == str2;
    }
});
Template.shopOrder.events({
    "click .so-action": function(event) {
        var that = $(event.currentTarget);
        if (!that.hasClass("so-inorder")) {

            var gid = that.attr("data-gid");
            if ($("#addressName")[0] && ($("#addressName").val() != "")) {
                that.addClass("so-inorder");
                that.html("正在处理中");
                Meteor.call("saveAddress", {
                    uid: facc.user()._id,
                    name: $("#addressName").val(),
                    street: $("#addressAddress").val(),
                    tel: $("#addressTel").val(),
                }, function(err, result) {
                    if (result) {
                        Meteor.call("saveOrder", {
                            uid: facc.user()._id,
                            gid: gid,
                            address: result
                        }, function(err, result) {
                            if (result == "ERROR_POINT") {
                                that.html("积分不足");
                            } else if (result == "ERROR_KC") {
                                that.html("库存不足");
                            } else if (result.indexOf("ERROR") == -1) {
                                that.html("订单已提交");
                            }
                        });
                    }


                });
            } else if (!$("#addressName")[0]) {
                that.addClass("so-inorder");
                that.html("正在处理中");
                Meteor.call("saveOrder", {
                    uid: facc.user()._id,
                    gid: gid
                }, function(err, result) {
                    if (result == "ERROR_POINT") {
                        alert("积分不足");
                        that.html("积分不足");
                    } else if (result == "ERROR_KC") {
                        alert("库存不足");
                        that.html("库存不足");
                    } else if (result.indexOf("ERROR") == -1) {
                        alert("订单已提交");
                        that.html("订单已提交");
                    }
                });
            }
        }
    }
});
