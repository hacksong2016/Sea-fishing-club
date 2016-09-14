Template.shop.onCreated(function() {
    this.subscribe("allGoods", facc.user()._id);
});
Template.shop.helpers({
    
    goods:function(){
    	return Goods.find({},{sort:{createAt:-1}});
    },
    compare:function(str1,str2){
    	return str1 == str2;
    }
});
Template.shop.onRendered(function() {
	
});
