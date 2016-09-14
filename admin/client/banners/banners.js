Meteor.startup(function() {
    navigations.add("banners", "轮播广告", "/banners", "user");
});

FlowRouter.route('/banners', {
    action: function(params, queryParams) {
        FlowLayout.render('layout', {
            content: "banners"
        });
    }
});

Template.banners.onCreated(function() {
    navigations.focus("banners");
    this.subscribe("banners");
});

Template.banners.helpers({

});

Template.banners.events({
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
    "click #update": function(event) {


        var obj = {
            "desc": $("#e-desc").val(),
            "orderBy": $("#e-orderBy").val() * 1,
            "group": $("#e-group").val(),
            "status": $("#e-status").val() * 1,
            "detail": $("#e-detail").val(),
            "thumb": $("#e-picture").attr("data-file"),
        };

        Banners.update({
            _id: $("#editFor").val()
        }, {
            $set: obj
        }, function() {
            if (obj.thumb.indexOf("base64") > -1) {
                Meteor.call("uploadBannerThumb", {
                    _id: $("#editFor").val()
                });
            }
        });
        $("#edit").hide();
    },
    "click #createLink": function() {
        $("#create").show();
    },
    "click #save": function() {
        var obj = {
            "desc": $("#c-desc").val(),
            "orderBy": $("#c-orderBy").val() * 1,
            "group": $("#c-group").val(),
            "status": $("#c-status").val() * 1,
            "detail": $("#c-detail").val(),
            "thumb": $("#c-picture").attr("data-file"),
            createAt: new Date(),
        };

        Banners.insert(obj, function(err, id) {
            Meteor.call("uploadBannerThumb", {
                _id: id
            });
        });

        $("#create").hide();

    },

});



Template.banners.onRendered(function() {
    var grid = $("#datagrid").ligerGrid({
        columns: [{
            display: 'Id',
            name: '_id',
        }, {
            display: '文字描述',
            name: 'desc',
        }, {
            display: '排序',
            name: 'orderBy',
        }, {
            display: '组',
            name: 'group',
        }, {
            display: '状态',
            render: function(r) {
                return r.status = 1 ? "上线" : "未上线";
            }
        }, {
            display: '创建时间',
            render: function(r) {
                return format(r.createAt);
            }
        }, {
            display: ' ',
            render: function(r) {
                return "<a onclick='editInfo(\"" + r._id + "\")'>详细</a>";
            }
        }, {
            render: function(r) {
                return "<a onclick='del(\"" + r._id + "\")'>删除</a>";
            }
        }],
        dataAction: "local",
        allowAdjustColWidth: true,
        height: "100%",
        pageSize: 30,
        pageSizeOptions: [30, 60, 100, 200],
        rownumbers: true,

    });

    Tracker.autorun(function() {
        var jsonObj = {};

        jsonObj.Rows = Banners.find({}).fetch();
        // console.log(jsonObj.Rows);
        grid.set({
            data: jsonObj
        });
    });

    editInfo = function(id) {
        var obj = Banners.findOne({
            _id: id
        });

        $("#editFor").val(id);
        $("#e-desc").val(obj.desc);
        $("#e-orderBy").val(obj.orderBy);
        $("#e-group").val(obj.group);
        $("#e-status").val(obj.status);
        $("#e-detail").val(obj.detail);
        $("#e-picture").parent().css({
            "background-image": "url(" + obj.thumb + ")"
        });
        $("#e-picture").attr("data-file", obj.thumb);

        $("#edit").show();
    }
    ff.editor();

    del = function(id){
            Banners.remove({_id:id});
        }
});

    