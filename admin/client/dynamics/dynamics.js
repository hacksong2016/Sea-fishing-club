Meteor.startup(function() {
   navigations.add("dynamics","首页分类","/dynamics","book");
});

FlowRouter.route('/dynamics', {
  action: function(params, queryParams) {
    FlowLayout.render('layout', { content: "dynamics"});
  }
});

Template.dynamics.onCreated(function() {
    navigations.focus("dynamics");
    this.subscribe("dynamics");
});

Template.dynamics.helpers({

});

Template.dynamics.onRendered(function() {
    var grid = $("#datagrid").ligerGrid({
        columns: [{
            display: 'ID',
            name: '_id',
        }, {
            display: '分类名称',
            name: 'topic',
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
        jsonObj.Rows = Dynamics.find(select).fetch();

        grid.set({
            data: jsonObj
        });
    });
     edit = function(id) {
        var dynamic = Dynamics.findOne({
            _id: id
        });
        $("#editFor").val(id);
        $("#e-topic").val(dynamic.topic);
        $("#e-thumb").parent().css({
            "background-image": "url(" + dynamic.thumb + ")"
        });
        $("#e-thumb").attr("data-file", dynamic.thumb);
        $("#edit").show();

    }

    del = function(id){
        Dynamics.remove({_id:id});
    }

    ff.editor();

});
Template.dynamics.events({
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
        var dynamic = {
            "topic": $("#c-topic").val(),
            "thumb": $("#c-thumb").attr("data-file"),
        };
        var dynamicid = Dynamics.insert(dynamic, function(err, id) {
            Meteor.call("uploadDynamicThumb", {
                _id: id
            });
        });
        $("#create").hide();

    },
    "click #update": function() {
        // console.log($("#e-time").val());
        var dynamic = {
            "topic": $("#e-topic").val(),
            "thumb": $("#e-thumb").attr("data-file"),
        };
        Dynamics.update({
            _id: $("#editFor").val()
        }, {
            $set: dynamic
        }, function() {
            if (dynamic.thumb.indexOf("base64") > -1) {
                Meteor.call("uploadDynamicThumb", {
                    _id: $("#editFor").val()
                });
            }
        });
        $("#edit").hide();


    }
});
