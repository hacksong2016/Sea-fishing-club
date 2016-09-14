// Template.recordsAdd.onCreated(function(){
// 	this.subscribe("regions");
// });
// Template.recordsAdd.helpers({
// 	regions:function(){
// 		return Regions.find({},{sort:{orderBy:-1}});
// 	}
// });
Template.recordsAdd.events({
	"click .ra-save":function(){
		var record = {
			fullname:$("#fullname").val(),
			id:$("#id").val(),
			role:$("#role").val(),
			year:$("#year").val(),
			tel:$("#tel").val(),
			city:$("#city").val(),
			userid:facc.user()._id,
			createAt:new Date(),
			status:1,
		}
		if(record.fullname == ""){
			alert("请输入档案姓名");
			return;
		}
		if(record.tel == ""){
			alert("请输入联系方式");
			return;
		}
		if($("#year").val() == ""){
			alert("请填写年龄");
			return ;
		}
		var rid = Records.insert(record);

		FlowRouter.go("/records/list?id=" + rid);
	}
});