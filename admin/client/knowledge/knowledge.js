Meteor.startup(function() {
   navigations.add("knowledges","首页知识","/knowledges","book");
});

FlowRouter.route('/knowledges', {
  action: function(params, queryParams) {
    FlowLayout.render('layout', { content: "knowledgeList"});
  }
});

Template.knowledgeList.onCreated(function() {
    navigations.focus("knowledges");
    this.subscribe("knowledges");
    this.subscribe("dynamics");
});

Template.knowledgeList.helpers({
     dynamics: function() {
        return Dynamics.find();
    }
});

Template.knowledgeList.onRendered(function() {
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
                var dynamic = Dynamics.findOne(r.dynamic);
                return dynamic ? dynamic.topic : "";
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
        jsonObj.Rows = Knowledges.find(select).fetch();

        grid.set({
            data: jsonObj
        });
    });
     edit = function(id) {
        var knowledge = Knowledges.findOne({
            _id: id
        });
        $("#editFor").val(id);
        $("#e-topic").val(knowledge.topic);
        $("#e-time").val(format2(knowledge.endAt));
        $("#e-summray").val(knowledge.summray);
        $("#e-category").val(knowledge.dynamic);
        $("#e-type").val(knowledge.type);
        $("#e-detail").html(knowledge.detail);
        
        $("#e-thumb").parent().css({
            "background-image": "url(" + knowledge.thumb + ")"
        });
        $("#e-thumb").attr("data-file", knowledge.thumb);
        $("#edit").show();

    }

    del = function(id){
        Knowledges.remove({_id:id});
    }

    ff.editor();

});
Template.knowledgeList.events({
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
        var knowledge = {
            "topic": $("#c-topic").val(),
            "summray": $("#c-summray").val(),
            "thumb": $("#c-thumb").attr("data-file"),
            "detail": $("#c-detail").html(),
            "dynamic": $("#c-categroy").val(),
            "status":$("#c-status").val()*1,
            "users": [],
        };
        var knowledgeid = Knowledges.insert(knowledge, function(err, id) {
            Meteor.call("uploadKnowledgeThumb", {
                _id: id
            });
        });
        $("#create").hide();

    },
    "click #update": function() {
        // console.log($("#e-time").val());
        var knowledge = {
            "topic": $("#e-topic").val(),
            // "endAt": new Date($("#e-time").val()),
            "summray": $("#e-summray").val(),
            "detail": $("#e-detail").html(),
            "thumb": $("#e-thumb").attr("data-file"),
            "dynamic": $("#e-categroy").val(),
            "status":$("#e-status").val()*1,
        };
        Knowledges.update({
            _id: $("#editFor").val()
        }, {
            $set: knowledge
        }, function() {
            if (knowledge.thumb.indexOf("base64") > -1) {
                Meteor.call("uploadKnowledgeThumb", {
                    _id: $("#editFor").val()
                });
            }
        });
        $("#edit").hide();


    }
});
