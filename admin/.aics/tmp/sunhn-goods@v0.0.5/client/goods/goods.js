Meteor.startup(function() {
    navigations.add("goods", "商品管理", "/goods", "cubes");
});

FlowRouter.route('/goods', {
    action: function(params, queryParams) {
        FlowLayout.render('layout', {
            content: "goods"
        });
    }
});

Template.goods.onCreated(function() {
    navigations.focus("goods");
    this.subscribe("goods");
});

Template.goods.onRendered(function() {
    var grid = $("#datagrid").ligerGrid({
        columns: [{
            display: '名称',
            name: 'name',
        }, {
            display: '创建时间',
            render: function(r, d) {

                return format(r.createAt);
            }
        }, {
            display: '积分',
            name: 'point',
        }, {
            display: '价格',
            name: 'price',
        }, {
            display: '库存',
            name: 'kc',
        }, {
            display: '类型',
            render: function(r, d) {
                return r.type == "point" ? "积分" : "支付";
            }
        }, {
            display: '状态',
            render: function(r, d) {
                return r.status == 1 ? "上线" : "下线";
            }
        }, {
            display: "图片",
            render: function(r) {
                return "<a onclick='pics(\"" + r._id + "\")'>" + r.pictures.length + "</a>";
            }
        }, {
            render: function(r) {
                return "<a onclick='edit(\"" + r._id + "\")'>编辑</a>";
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
        jsonObj.Rows = Goods.find({}).fetch();
        grid.set({
            data: jsonObj
        });
    });

    edit = function(id) {
        var goods = Goods.findOne({
            _id: id
        });

        $("#editFor").val(id);
        $("#e-name").val(goods.name);
        $("#e-point").val(goods.point);
        $("#e-summary").val(goods.summary);
        $("#e-detail").val(goods.detail);
        $("#e-status").val(goods.status);
        $("#e-price").val(goods.price);
        $("#e-type").val(goods.type);
        $("#e-kc").val(goods.kc);

        $("#e-thumb").parent().css({
            "background-image": "url(" + goods.thumb + ")"
        });
        $("#e-thumb").attr("data-file", goods.thumb);
        $("#edit").show();

    }


    pics = function(id) {
        var goods = Goods.findOne({
            _id: id
        });
        $("#picFor").val(id);
        $("#pics").show();
        $(".ff-pics-item").remove();
        for (var i = 0; i < goods.pictures.length; i++) {
            $(".ff-pics").prepend($("<div class='ff-pics-item' data-index='" + i + "' style='background-image:url(" + goods.pictures[i] + ")'></div>").click(_removeGoodsPics));
        }
    }
});
Template.goods.events({
    "click #createLink": function() {
        $("#create").show();
    },
    "change .ff-file input": function(event) {
        var that = $(event.currentTarget);
        lrz(event.currentTarget.files[0], {
            width: 720
        }).then(function(rst) {
            that.parent().css({
                "background-image": "url(" + rst.base64 + ")"
            });
            that.attr("data-file", rst.base64);
        });
    },
    "change .ff-add input": function(event) {
        var that = $(event.currentTarget);
        lrz(event.currentTarget.files[0], {
            width: 720
        }).then(function(rst) {
            that.parent().parent().prepend($("<div class='ff-pics-item' data-index='" + $(".ff-pics-item").size() + "' style='background-image:url(" + rst.base64 + ")'></div>").click(_removeGoodsPics));
            var goodsid = $("#picFor").val();
            Goods.update({
                _id: goodsid
            }, {
                $addToSet: {
                    pictures: rst.base64
                }
            });
            Meteor.call("uploadGoodsPics", {
                _id: goodsid,
            });
        });
    },
    "click #save": function() {
        var goods = {
            "name": $("#c-name").val(),
            "point": $("#c-point").val() * 1,
            "summary": $("#c-summary").val(),
            "detail": $("#c-detail").val(),
            "type": $("#c-type").val(),
            "status": $("#c-status").val() * 1,
            "price": $("#c-price").val() * 1,
            "kc": $("#c-kc").val() * 1,
            "thumb": $("#c-thumb").attr("data-file"),
            "createAt": new Date(),
            "pictures": [],
        };

        Goods.insert(goods, function(err, id) {
            Meteor.call("uploadGoodsThumb", {
                _id: id
            });
        });
        $("#create").hide();

    },
    "click #update": function() {
        var goods = {
            "name": $("#e-name").val(),
            "point": $("#e-point").val() * 1,
            "summary": $("#e-summary").val(),
            "detail": $("#e-detail").val(),
            "status": $("#e-status").val() * 1,
            "kc": $("#e-kc").val() * 1,
            "price": $("#e-price").val() * 1,
            "type": $("#e-type").val(),
            "thumb": $("#e-thumb").attr("data-file"),
        };
        Goods.update({
            _id: $("#editFor").val()
        }, {
            $set: goods
        }, function() {
            if (goods.thumb.indexOf("base64") > -1) {
                Meteor.call("uploadGoodsThumb", {
                    _id: $("#editFor").val()
                });
            }
        });
        $("#edit").hide();


    }
});
_removeGoodsPics = function() {

    var that = $(this);
    var index = that.attr("data-index");
    var mod = {};
    mod["pictures." + index] = 1;

    
    Goods.update({
        _id: $("#picFor").val()
    }, {
        $unset: mod
    }, function() {
        Goods.update({
            _id: $("#picFor").val()
        }, {
            $pull: {
                pictures: null
            }
        });
    });
    that.remove();
}
