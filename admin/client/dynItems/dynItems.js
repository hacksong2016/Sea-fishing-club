Meteor.startup(function() {
   navigations.add("dynItems","二级分类","/dynItems","book");
});

FlowRouter.route('/dynItems', {
  action: function(params, queryParams) {
    FlowLayout.render('layout', { content: "dynItems"});
  }
});

Template.dynItems.onCreated(function() {
    navigations.focus("dynItems");
    this.subscribe("dynItems");
    this.subscribe("dynamics");
});

Template.dynItems.helpers({
	dynamics: function() {
        return Dynamics.find();
    }
});

Template.dynItems.onRendered(function() {
    var grid = $("#datagrid").ligerGrid({
        columns: [{
            display: 'ID',
            name: '_id',
        }, {
            display: '分类名称',
            name: 'topic',
        }, {
            display: '类型',
            render: function(r) {
                var dynamic = Dynamics.findOne(r.dynamic);
                return dynamic ? dynamic.topic : "";
            }
        }, {
            display: '状态',
            render: function(r, d) {
                return r.status == 1 ? "上线" : "下线";
            }
        }, {
            display: '创建时间',
            render: function(r) {
                return format(new Date());
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
        jsonObj.Rows = DynItems.find(select).fetch();

        grid.set({
            data: jsonObj
        });
    });
     edit = function(id) {
        var dynItem = DynItems.findOne({
            _id: id
        });
        $("#editFor").val(id);
        $("#e-topic").val(dynItem.topic);
        $("#e-thumb").parent().css({
            "background-image": "url(" + dynItem.thumb + ")"
        });
        $("#e-thumb").attr("data-file", dynItem.thumb);
        $("#edit").show();

    }

    del = function(id){
        DynItems.remove({_id:id});
    }

    ff.editor();

});
Template.dynItems.events({
    "click #createLink": function() {
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
        var dynItem = {
            "topic": $("#c-topic").val(),
            "thumb": $("#c-thumb").attr("data-file"),
            "dynamic": $("#c-categroy").val(),
            "status":$("#c-status").val()*1,
        };
        var dynItemid = DynItems.insert(dynItem, function(err, id) {
            Meteor.call("uploadDynItemThumb", {
                _id: id
            });
        });
        $("#create").hide();

    },
    "click #update": function() {
        var dynItem = {
            "topic": $("#e-topic").val(),
            "thumb": $("#e-thumb").attr("data-file"),
            "dynamic": $("#e-categroy").val(),
            "status":$("#e-status").val()*1,
        };
        DynItems.update({
            _id: $("#editFor").val()
        }, {
            $set: dynItem
        }, function() {
            if (dynItem.thumb.indexOf("base64") > -1) {
                Meteor.call("uploadDynItemThumb", {
                    _id: $("#editFor").val()
                });
            }
        });
        $("#edit").hide();


    }
});
