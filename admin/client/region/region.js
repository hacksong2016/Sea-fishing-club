Meteor.startup(function() {
    navigations.add("region", "地区管理", "/region", "cubes");
});

FlowRouter.route('/region', {
    action: function(params, queryParams) {
        FlowLayout.render('layout', {
            content: "region"
        });
    }
});

Template.region.onCreated(function() {
    navigations.focus("region");
    this.subscribe("regions");
});

Template.region.onRendered(function() {
    var grid = $("#datagrid").ligerGrid({
        columns: [{
            display: '名称',
            name: 'name',
        }, {
            display: '创建时间',
            render: function(r, d) {

                return format(r.createAt);
            }
        },{
            display: '排序',
            name: 'orderBy',
        }, {
            display: '状态',
            render: function(r, d) {
                return r.status == 1 ? "上线" : "下线";
            }
        }, {
            render: function(r) {
                return "<a onclick='edit(\"" + r._id + "\")'>编辑</a>";
            }
        }, {
            render: function(r) {
                return "<a href='/regionChild?id=" + r._id + "'>子分类</a>";
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
        jsonObj.Rows = Regions.find({
             parent:"root"
        }, {
            sort: {
                orderBy: -1
            }
        }).fetch();
        grid.set({
            data: jsonObj
        });
    });

    edit = function(id) {
        var region = Regions.findOne({
            _id: id
        });

        $("#editFor").val(id);
        $("#e-name").val(region.name);
        $("#e-summary").val(region.summary);
        $("#e-status").val(region.status);
        $("#e-orderBy").val(region.orderBy);
        $("#e-thumb").parent().css({
            "background-image": "url(" + region.thumb + ")"
        });
        $("#e-thumb").attr("data-file", region.thumb);
        $("#edit").show();

    }

    del = function(id){
        Regions.remove({_id:id});
    }


});
Template.region.events({
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
    "click #save": function() {
        var region = {
            "name": $("#c-name").val(),
            "summary": $("#c-summary").val(),
            "status": $("#c-status").val() * 1,
            "orderBy": $("#c-orderBy").val() * 1,
            "thumb": $("#c-thumb").attr("data-file"),
            "createAt": new Date(),
            "parent":"root"
        };

        Regions.insert(region, function(err, id) {
            Meteor.call("uploadregionThumb", {
                _id: id
            });
        });
        $("#create").hide();

    },
    "click #update": function() {
        var region = {
            "name": $("#e-name").val(),
            "summary": $("#e-summary").val(),
            "status": $("#e-status").val() * 1,
            "orderBy": $("#e-orderBy").val() * 1,
            "thumb": $("#e-thumb").attr("data-file"),
        };
        Regions.update({
            _id: $("#editFor").val()
        }, {
            $set: region
        }, function() {
            if (coupons.thumb.indexOf("base64") > -1) {
                Meteor.call("uploadregionThumb", {
                    _id: $("#editFor").val()
                });
            }
        });
        $("#edit").hide();


    }
});
