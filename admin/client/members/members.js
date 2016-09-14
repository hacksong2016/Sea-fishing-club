Meteor.startup(function() {
   navigations.add("members","用户管理","/members","users");
});

FlowRouter.route('/members', {
  action: function(params, queryParams) {
    FlowLayout.render('layout', { content: "members"});
  }
});

Template.members.onCreated(function() {
    navigations.focus("members");
    this.subscribe("users");
});

Template.members.helpers({

});

Template.members.events({
    "click #saveUser": function(event) {
        Meteor.call("saveUserInfo", {
            select: {
                _id: $("#editFor").val()
            },
            fields: {
                    point: $("#e-point").val()*1,
                    isadmin: $("#e-isadmin").val()*1,
                    balance: $("#e-balance").val()*1
            }
        },function(){
            $("#editForm").hide();
        });
    }
});

Template.members.onRendered(function() {
    var grid = $("#datagrid").ligerGrid({
        columns: [{
            display: 'Id',
            name: '_id',
        },{    
            display: '昵称',
            name: 'nickname',
            width:100,
            sort:false,
        },{
            display: '用户名',
            sort:false,
            name:"username",
        },{
            display: '手机号',
            name: 'tel',
            width:100,
            sort:true,
            type:"int",
        },  {
            display: '注册时间',
            sort:true,
            width:120,
            render: function(r) {return format(r.createAt);}
        },{
            display: '权限',
            render: function(r) {return r.isadmin == 1 ? "管理员":"用户";}
        }, {
            display: '积分',
            name: 'point',
            sort:true,
            type:"int"
        }, {
            display: '余额',
            name: 'balance',
            sort:true,
            type:"int"
        }, {
            display: ' ',
            render: function(r) {return "<a onclick='editInfo(\"" + r._id + "\")'>详细</a>";}
        },{
            display: ' ',
            render: function(r) {return "<a href='/records?tel=" + r.tel + "'>档案</a>";}
        }],
        dataAction:"local",
        allowAdjustColWidth:true,
        height:"100%",
        pageSize: 30,
        pageSizeOptions: [30, 60, 100, 200],
        
        rownumbers: true,

    });

    Tracker.autorun(function() {
        var jsonObj = {};

        jsonObj.Rows = Meteor.users.find({}, {
            feilds: {
                username: 1,
                email: 1,
                tel: 1,
                point: 1,
                balance:1,
                createAt:1,
                isadmin:1,
            }
        }).fetch();
        // console.log(jsonObj.Rows);
        grid.set({
            data: jsonObj
        });
    });

    editInfo = function(id) {
        var user = Meteor.users.findOne({
            _id: id
        });
        
        $("#editFor").val(id);
        $("#e-point").val(user.point);
        $("#e-isadmin").val(user.isadmin);
        $("#e-avatar").css({"background-image":"url(" +user.avatar+ ")"});
        $("#editForm").show();
    }

});
