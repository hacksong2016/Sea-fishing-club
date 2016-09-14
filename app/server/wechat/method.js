Meteor.methods({
    logres:function(args){
        console.log(args);
    },
    signatureWechat: function(args) {


 
        var signobj = {
            jsapi_ticket: getTicket(),
            noncestr: CryptoJS.MD5(Math.random() + "").toString(),
            timestamp: Math.floor(Date.now() / 1000),
            url: process.env.ROOT_URL + args.path.replace("/", ""),
        }

        var signstr = json2query(signobj);

        signobj.signature = CryptoJS.SHA1(signstr).toString();
        signobj.appId = wechatConfig.appid;

        console.log(signobj);

        return signobj;
    },
    setWxUserInfo: function(args) {
        var url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + wechatConfig.appid + "&secret=" + wechatConfig.secret+ "&code=" + args.code + "&grant_type=authorization_code";
        Meteor.http.get(url, function(error, response) {
            if (response.statusCode === 200) {
                var json = JSON.parse(response.content);
                if (json.errcode) {
                    console.log(response.content);
                } else {
                    Meteor.users.update({ _id: args.userid }, {
                        $set: { openid: json.openid }
                    })
                }

            }
        })

    },
    createWxPay: function(args) {
        // {
        //     tradeNo: 'AmnJBH8oiZp5BrcQs',
        //     subject: '车是一个特殊的商品车是一个特殊的商品车是一个特殊的商品车是一个特殊的商品车是一个特殊的商品',
        //     body: 'sdfasdfasdf。水电费水电费sdfsdf。水电费水电费sdfsdf。水电费水电费sdfsdf。水电费水电费sdfsdf。水电费水电费sdfsdf。sdfsdf。',
        //     price: 100,
        //     notifyUrl: 'http://mfynotify.fami2u.com/wxpay'
        // }

        var u = Meteor.users.findOne({ _id: args.userid });
         // u = {openid:'ozH35styOKXXJYkAjJ3ppl9iR-_0'}
        if (!u.openid) {
            return {
                status: "UNOPENID",
                url: "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + wechatConfig.appid + "&redirect_uri=REDIRECT_URI&response_type=code&scope=snsapi_userinfo&state=wxLogin#wechat_redirec",
                root: process.env.ROOT_URL,
            }
        } else {

           var obj = {};
            WXPay.createUnifiedOrder({
                body: args.subject.substring(0, 15),
                out_trade_no: args.tradeNo,
                total_fee: args.price*100,
                spbill_create_ip: this.connection.clientAddress,
                notify_url: args.notifyUrl,
                trade_type: 'JSAPI',
                openid: u.openid,
                attach: ""
            }, function(error, result) {

                // {
                //     return_code: 'SUCCESS',
                //     return_msg: 'OK',
                //     appid: 'wx8ebaf504c1a1cff0',
                //     mch_id: '1330496001',
                //     device_info: 'WEB',
                //     nonce_str: 'pxDRgwbUDs9hy2Vq',
                //     sign: '2BE8D192D6F657A4C2C7C6F65214D912',
                //     result_code: 'SUCCESS',
                //     prepay_id: 'wx2016041517332985ae581e3b0294170827',
                //     trade_type: 'NATIVE',
                //     code_url: 'weixin://wxpay/bizpayurl?pr=9fWMYm1'
                // }

                // "appId"：
                // "wx2421b1c4370ec43b", //公众号名称，由商户传入     
                //"timeStamp"：
                //" 1395712654", //时间戳，自1970年以来的秒数     
                //"nonceStr"：
                //"e61463f8efa94090b1f366cccfbbb444", //随机串     
                //"package"：
                //"prepay_id=u802345jgfjsdfgsdg888",
                //"signType"：
                //"MD5", //微信签名方式：     
                //"paySign"：
                //"70EA570631E4BB79628FBCA90534C63FF7FADD89" //微信签名 
                obj = {
                    appId: wechatConfig.appid,
                    timeStamp: Math.floor(Date.now() / 1000),
                    nonceStr: CryptoJS.MD5(Math.random() + "").toString(),
                    package: ("prepay_id=" + result.prepay_id),
                    signType: "MD5"
                }
                obj.paySign = WXPay.sign(obj);
                

            });
            return obj
        }



    }

});

json2query = function(json) {
    var arr = [];
    for (var k in json) {
        arr.push(k + "=" + json[k]);
    }
    return arr.join("&");
}

getTicket = function() {
    var token = getWxToken();
    if (token) {
        var wt = wxticket.findOne({ expiresAt: { $gt: (Math.floor(Date.now() / 1000)) } });

        if (wt) {
            return wt.ticket;
        } else {
            var url = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + token + '&type=jsapi';

            var response = Meteor.http.get(url);

            if (response.statusCode === 200) {
                wxticket.update({}, {
                    ticket: response.data.ticket,
                    expiresAt: Math.floor(Date.now() / 1000 + 7200)
                });
                return response.data.ticket;
            } else {
                console.log("ticket error");
                return false;
            }
        }
    }

}
getWxToken = function() {

    var ack = wxaccesstoken.findOne({ expiresAt: { $gt: (Math.floor(Date.now() / 1000)) } });

    if (ack) {
        return ack.token;
    } else {
        var url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + wechatConfig.appid + '&secret=' + wechatConfig.secret;
        console.log(url);
        var response = Meteor.http.get(url);

        if (response.statusCode === 200) {
            wxaccesstoken.update({}, {
                token: response.data.access_token,
                expiresAt: (Math.floor(Date.now() / 1000) + 7200)
            });
            return response.data.access_token;
        } else {
            console.log("accesstoken error");
            return false;
        }
    }
}
Meteor.startup(function() {
    if (wxaccesstoken.find().count() == 0) {
        wxaccesstoken.insert({});

    }
    if (wxticket.find().count() == 0) {
        wxticket.insert({});
    }

});
