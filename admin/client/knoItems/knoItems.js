Meteor.startup(function() {
   navigations.add("knoItems","二级知识","/knoItems","book");
});

FlowRouter.route('/knoItems', {
  action: function(params, queryParams) {
    FlowLayout.render('layout', { content: "knoItems"});
  }
});

Template.knoItems.onCreated(function() {
    navigations.focus("knoItems");
    this.subscribe("knoItems");
    this.subscribe("dynItems");
    this.subscribe("dynamics");
});

Template.knoItems.helpers({
     dynItems: function() {
        return DynItems.find();
    },
     dynamics: function() {
        return Dynamics.find();
    }
});

Template.knoItems.onRendered(function() {
    var grid = $("#datagrid").ligerGrid({
        columns: [{
            display: 'ID',
            name: '_id',
        }, {
            display: '主题',
            name: 'topic',
        }, {
            display: '简介',
            name: 'summray',
        }, {
            display: '类型',
            render: function(r) {
                var dynItem = DynItems.findOne(r.dynItem);
                return dynItem ? dynItem.topic : "";
            }
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
                return "<a onclick='del(\"" + r._id + "\")'>删除</a>";
            }
        }],
        width: '100%',
        height: '100%',
        pageSize:30,
        pageSizeOptions: [30, 60, 100, 200],
        dataAction: "client",
        rownumbers:true,

    });

    Tracker.autorun(function() {
        var jsonObj = {};
        var select = {};
        if(FlowRouter.getQueryParam("id")){
            select._id = FlowRouter.getQueryParam("id");
        }
        jsonObj.Rows = KnoItems.find(select).fetch();

        grid.set({
            data: jsonObj
        });
    });
     edit = function(id) {
        var knoItem = KnoItems.findOne({
            _id: id
        });
        $("#editFor").val(id);
        $("#e-topic").val(knoItem.topic);
        $("#e-time").val(format2(knoItem.endAt));
        $("#e-summray").val(knoItem.summray);
        $("#e-category").val(knoItem.dynItem);
        $("#e-type").val(knoItem.type);
        $("#e-detail").html(knoItem.detail);
        
        $("#e-thumb").parent().css({
            "background-image": "url(" + knoItem.thumb + ")"
        });
        $("#e-thumb").attr("data-file", knoItem.thumb);
        $("#edit").show();

    }

    del = function(id){
        KnoItems.remove({_id:id});
    }

    ff.editor();

});
Template.knoItems.events({
    "click #createLink": function() {
        // $("#c-time").val(format2(new Date()));
        $("#create").show();
    },
    "change .ff-file input": function(event) {
        var that = $(event.currentTarget);
        lrz(event.currentTarget.files[0], {
            width:1200
        }).then(function(rst) {
            that.parent().css({
                "background-image": "url(" + rst.base64 + ")"
            });
            that.attr("data-file", rst.base64);
        });
    },
    "click #save": function() {
        var knoItem = {
            "topic": $("#c-topic").val(),
            "summray": $("#c-summray").val(),
            "thumb": $("#c-thumb").attr("data-file"),
            "detail": $("#c-detail").html(),
            "dynItem": $("#c-categroy").val(),
            "status":$("#c-status").val()*1,
            "users": [],
        };
        var knoItemid = KnoItems.insert(knoItem, function(err, id) {
            Meteor.call("uploadKnoItemThumb", {
                _id: id
            });
        });
        $("#create").hide();

    },
    "click #update": function() {
        // console.log($("#e-time").val());
        var knoItem = {
            "topic": $("#e-topic").val(),
            // "endAt": new Date($("#e-time").val()),
            "summray": $("#e-summray").val(),
            "detail": $("#e-detail").html(),
            "thumb": $("#e-thumb").attr("data-file"),
            "dynItem": $("#e-categroy").val(),
            "status":$("#e-status").val()*1,
        };
        KnoItems.update({
            _id: $("#editFor").val()
        }, {
            $set: knoItem
        }, function() {
            if (knoItem.thumb.indexOf("base64") > -1) {
                Meteor.call("uploadKnoItemThumb", {
                    _id: $("#editFor").val()
                });
            }
        });
        $("#edit").hide();


    }
});
