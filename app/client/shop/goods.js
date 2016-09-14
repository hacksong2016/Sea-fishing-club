Template.goods.onCreated(function() {
    this.subscribe("goodsDetail", facc.user()._id, FlowRouter.getQueryParam("id"));
});
Template.goods.helpers({
    goods: function() {
        return Goods.findOne({_id:FlowRouter.getQueryParam("id")});
    },
    compare:function(str1,str2){
        return str1 == str2;
    }
});

Template.goods.onRendered(function() {
    Meteor.setTimeout(function() {
        var mySwiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            autoplay: 2500,
            loop:true,
            autoplayDisableOnInteraction: false
        });
       
    }, 500);
});
