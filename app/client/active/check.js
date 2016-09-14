Template.activeCheck.helpers({
	qrcode:function(){
		return  "http://xdb.fami2u.com/checkActive?id=" + FlowRouter.getQueryParam("id");
	}
});