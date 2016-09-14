Meteor.startup(function() {
   navigations.add("actives","活动管理","/actives","book");
});

FlowRouter.route('/actives', {
  action: function(params, queryParams) {
    FlowLayout.render('layout', { content: "actives"});
  }
});

Template.actives.onCreated(function() {
    navigations.focus("actives");
    this.subscribe("actives");
});

Template.actives.helpers({

});

Template.actives.onRendered(function() {
    var grid = $("#datagrid").ligerGrid({
        columns: [{
            display: 'ID',
            name: '_id',
        }, {
            display: '主题',
            name: 'topic',
        }, {
            display: '上限',
            name: 'max',
        }, {
            display: '联系电话',
            name: 'tel',
        }, {
            display: '截止时间',
            render:function(r,d){
                return format(r.endAt);
            }
        }, {
            display: '报名数量',
            name: 'num',
        },{
            display: '地点',
            name: 'address',
        },
        // {
        //     display: '报名数量',
        //    render:function(r,d){
        //         return r.users.length + "";
        //     }
        // },  
        {
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
        jsonObj.Rows = Actives.find(select).fetch();

        grid.set({
            data: jsonObj
        });
    });
     edit = function(id) {
        var active = Actives.findOne({
            _id: id
        });
        $("#editFor").val(id);
        $("#e-topic").val(active.topic);
       
        $("#e-tel").val(active.tel);
        $("#e-time").val(format2(active.endAt));
        $("#e-address").val(active.address);
        $("#e-summray").val(active.summray);
        $("#e-max").val(active.max);
        $("#e-type").val(active.type);
        $("#e-detail").html(active.detail);
        
        $("#e-num").val(active.num);

        $("#e-thumb").parent().css({
            "background-image": "url(" + active.thumb + ")"
        });
        $("#e-thumb").attr("data-file", active.thumb);
        $("#edit").show();

    }

    del = function(id){
        Actives.remove({_id:id});
    }

    ff.editor();

});
Template.actives.events({
    "click #createLink": function() {
        $("#c-time").val(format2(new Date()));
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
        var active = {
            "topic": $("#c-topic").val(),
            
            "tel": $("#c-tel").val(),
            "max": $("#c-max").val()*1,
            "endAt": new Date($("#c-time").val()),
            "address": $("#c-address").val(),
            "summray": $("#c-summray").val(),
            "thumb": $("#c-thumb").attr("data-file"),
            "detail": $("#c-detail").html(),
           
            "num":$("#c-num").val()*1,
            "status":$("#c-status").val()*1,
            "users": [],
        };
        var activeid = Actives.insert(active, function(err, id) {
            Meteor.call("uploadActiveThumb", {
                _id: id
            });
        });
        $("#create").hide();

    },
    "click #update": function() {
        // console.log($("#e-time").val());
        var active = {
            "topic": $("#e-topic").val(),
            
            "tel": $("#e-tel").val(),
            "max": $("#e-max").val()*1,
            "endAt": new Date($("#e-time").val()),
            "address": $("#e-address").val(),
            "summray": $("#e-summray").val(),
            "detail": $("#e-detail").html(),
            "thumb": $("#e-thumb").attr("data-file"),
           
            "num":$("#e-num").val()*1,
            "status":$("#e-status").val()*1,
        };
        Actives.update({
            _id: $("#editFor").val()
        }, {
            $set: active
        }, function() {
            if (active.thumb.indexOf("base64") > -1) {
                Meteor.call("uploadActiveThumb", {
                    _id: $("#editFor").val()
                });
            }
        });
        $("#edit").hide();


    }
});
