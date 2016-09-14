Meteor.startup(function() {

    //格式化时间
    Template.registerHelper("format", function(str) {

        return format(str);

    });

    //反转数组
    Template.registerHelper("reverse", function(arr) {
        if (arr) {
            return arr.reverse();
        } else {
            return [];
        }

    });
    //登录状态
    Template.registerHelper("islogin", function(arr) {
       return !facc.isGuest();

    });

});
urlrefer = [];
var urlexcept = [
    "login",
    "register",
    "registercode",
    "forget",
    "forgetcode",
    "logout",
    "city",
    "instantRecords",
];
format = function(str) {
    if (str) {
        var d = new Date(str);

        return d.getFullYear() + "年" + (d.getMonth() + 1) + "月" + d.getDate() + "日 " + pad(d.getHours(), 2) + ":" + pad(d.getMinutes(), 2);
    } else {
        return "-/-/- --:--"
    }
}
pad = function(num, n) {
    var len = num.toString().length;
    while (len < n) {
        num = "0" + num;
        len++;
    }
    return num;
}

backaction = function() {

    urlrefer.pop();
    FlowRouter.go(urlrefer[urlrefer.length - 1] ? urlrefer[urlrefer.length - 1] : "/");
    urlrefer.pop();
}

FlowRouter.triggers.enter([function(context, redirect) {
    
    // if(urlrefer.indexOf(context.path)<0){
        urlrefer.push(context.path);
    // }else{

    // }
    // console.log(urlrefer)
    // console.log(urlrefer);


}], { except: [] });



Meteor.startup(function() {



});
