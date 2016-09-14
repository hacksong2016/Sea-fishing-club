navigations = {
    list:[],
    add:function(sn,name,url,icon){
        navigations.list.push({
            "sn":sn,
            "name":name,
            "url":url,
            "icon":(icon ? icon : "bars")
        });
    },
    focus:function(sn){
        Session.set("navigations-active",sn);
    }
}