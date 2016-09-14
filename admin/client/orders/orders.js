Meteor.startup(function() {
    navigations.add("orders", "订单管理", "/orders", "cart-arrow-down");
});

FlowRouter.route('/orders', {
    action: function(params, queryParams) {
        FlowLayout.render('layout', {
            content: "orders"
        });
    }
});


Template.orders.onCreated(function() {
    this.subscribe("orders");
    this.subscribe("goods");
    this.subscribe("users");
    navigations.focus("orders");
});

Template.orders.onRendered(function() {
    var grid = $("#datagrid").ligerGrid({
        columns: [{
            display: '订单ID',
            name: '_id',
        }, {
            display: '商品名称',
            render: function(r, d) {
                var goods = Goods.findOne({
                    _id:r.gid
                });
                if (goods) {
                    return goods.name;
                }
            }
        }, {
            display: '创建时间',
            render: function(r, d) {

                return format(r.createAt);
            }
        }, {
            display: '收货人',
            render: function(r, d) {

                return r.address.name
            }
        }, {
            display: '收获地址',
            render: function(r, d) {

                return r.address.street
            }
        }, {
            display: '手机号',
            render: function(r, d) {

                return r.address.tel
            }
        }, {
            display: '状态',
            render: function(r, d) {

                if (r.status == "SUBMIT") {
                    return "已提交";
                } else if (r.status == "CHECKIN") {
                    return "已确认";
                } else if (r.status == "RECEIV") {
                    return "待收货";
                } else if (r.status == "COMPLETED") {
                    return "已完成";
                }
            }
        },{
            render: function(r) {
                return "<a onclick='edit(\"" + r._id + "\")'>更新</a>";
            }
        }, {
            render: function(r) {
                return "<a onclick='del(\"" + r._id + "\")'>删除</a>";
            }
        }],
        width: '100%',
        height: '100%',
        pageSize: 30,
        pageSizeOptions: [30, 60, 100, 200],
        dataAction: "client",
        rownumbers: true,

    });

    Tracker.autorun(function() {
        var jsonObj = {};
        jsonObj.Rows = Orders.find({}).fetch();
        grid.set({
            data: jsonObj
        });
    });
     edit = function(id) {
            var orders = Orders.findOne({
                _id: id
            });
           
            $("#editFor").val(id);
            $("#e-status").val(orders.status);

            $("#edit").show();

        }

    del = function(id){
        Orders.remove({_id:id});
    }


});
Template.orders.events({
    "click #update": function() {
        Orders.update({
            _id: $("#editFor").val()
        }, {
            $set: {status:$("#e-status").val()}
        });
        $("#edit").hide();


    }
});
