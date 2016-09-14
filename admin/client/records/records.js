Meteor.startup(function() {
    navigations.add("records", "档案管理", "/records", "file");
});

FlowRouter.route('/records', {
    action: function(params, queryParams) {
        FlowLayout.render('layout', {
            content: "records"
        });
    }
});

Template.records.onCreated(function() {
    navigations.focus("records");
    this.subscribe("records");
    this.subscribe("users");
    this.subscribe("regions");
});

Template.records.helpers({
    regions: function() {
        return Regions.find({
            status: 1
        }, {
            sort: {
                orderBy: -1
            }
        })
    }
});

Template.records.events({
    
});



Template.records.onRendered(function() {
    var grid = $("#datagrid").ligerGrid({
        columns: [{
            display: 'Id',
            name: '_id',
        }, {
            display: '城市',
            render: function(r) {
                var r = Regions.findOne({
                    _id: r.city
                });
                return r ? r.name :  "";
            }
        },{
            display: '姓名',
            name: 'fullname',
        }, {
            display: '年龄',
            name: "year",
        }, {
            display: '手机号',
            name: 'tel',
        },{
            display: '角色',
            render: function(r) {
                if(r == "M"){
                    return "妈妈";
                }else if(r == "D"){
                    return "女孩";
                }else if(r == "S"){
                    return "男孩";
                }
            }
        }, {
            display: '创建时间',
            width: 120,
            render: function(r) {
                return format(r.createAt);
            }
        }, {
            display: ' ',
            render: function(r) {
                return "<a href='/records/manage?id=" + r._id + "'>管理</a>";
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

    del = function(id){
        Records.remove({_id:id});
    }

    Tracker.autorun(function() {
        var jsonObj = {};
        var select = {};
        if(FlowRouter.getQueryParam("tel")){
            select.tel = FlowRouter.getQueryParam("tel");
        }
        jsonObj.Rows = Records.find(select).fetch();
        // console.log(jsonObj.Rows);
        grid.set({
            data: jsonObj
        });
    });

   

});
