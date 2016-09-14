WxPayUtil={
    generateNonceString:function(length){
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var maxPos = chars.length;
        var noceStr = "";
        for (var i = 0; i < (length || 32); i++) {
            noceStr += chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return noceStr;
    },
    mix:function(){
        var root = arguments[0];
        if (arguments.length==1) { return root; }
        for (var i=1; i<arguments.length; i++) {
            for(var k in arguments[i]) {
                root[k] = arguments[i][k];
            }
        }
        return root;
    },
    encodeUTF8:function(str){
            var temp = "",rs = "";
            for( var i=0 , len = str.length; i < len; i++ ){
                temp = str.charCodeAt(i).toString(16);
                rs  += "\\u"+ new Array(5-temp.length).join("0") + temp;
            }
            return rs;
    },
    buildXML :function(json){
       
      var builder = new xml2js.Builder();  
        return builder.buildObject(json);
    },
   parseXML :function(xml, fn){
        var parser = new xml2js.Parser({ trim:true, explicitArray:false, explicitRoot:false });
     parser.parseString(xml, fn||function(err, result){});
    }

}