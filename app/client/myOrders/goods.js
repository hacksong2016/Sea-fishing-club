Template.myOrdersGoodsSimple.onCreated(function() {
    this.subscribe("myOrdersGoodsSimple", this.data.gid);
});
Template.myOrdersGoodsSimple.helpers({
    goods:function(){
        var goods = Goods.findOne({_id:this.gid});
        return goods;
    },
    
    step:function(status){
    	if(status == "SUBMIT"){
    		return "已提交";
    	}else if(status == "CHICKIN"){
    		return "已确认";
    	}else if(status == "RECEIV"){
    		return "待收货";
    	}else if(status == "COMPELET"){
    		return "已完成";
    	}
    	
    },
    compare:function(str1 ,str2){
       return str1 == str2;
    }
});