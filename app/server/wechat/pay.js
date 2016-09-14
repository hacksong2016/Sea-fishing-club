WXPay = (function buildAPI() {
    var APP_ID = wechatConfig.appid;
    var APP_SECRET = wechatConfig.secret;
    var PARTNER_KEY = wechatConfig.partnerKey;
    var MCH_ID = wechatConfig.mchid;
    return {
        //创建统一支付订单
        createUnifiedOrder: function(opts, fn) {
           
            //this.showConfig();
            var unifiedorderUrl = "https://api.mch.weixin.qq.com/pay/unifiedorder";
            this.wxpayID = {
                appid: APP_ID,
                mch_id: MCH_ID,
                device_info: "WEB"
            }
            opts.nonce_str = opts.nonce_str || WxPayUtil.generateNonceString();
            _.extend(opts, this.wxpayID);
            opts.sign = this.sign(opts);

            var postXml = WxPayUtil.buildXML({ xml: opts });
            var response = Meteor.http.post(unifiedorderUrl, { content: postXml })
            if (response.statusCode === 200) {
                WxPayUtil.parseXML(response.content, fn);
            }
        },
        //根据微信订单号查询支付订单
        queryOrder: function(query, fn) {
            var wxUrl = "https://api.mch.weixin.qq.com/pay/orderquery";
            if (!(query.transaction_id || query.out_trade_no)) {
                fn(null, { return_code: 'FAIL', return_msg: '缺少参数' });
            }
            _.extend(query, this.wxpayID);
            query.sign = this.sign(query);
            var postXml = WxPayUtil.buildXML({ xml: query });
            var response = Meteor.http.post(wxUrl, { content: postXml })
            if (response.statusCode === 200) {
                 WxPayUtil.parseXML(response.content, fn);
            }
          

        },
        //show config
        showConfig: function(content) {
            //console.log("APP_ID",APP_ID);
            //console.log("APP_SECRET",APP_SECRET);
            //console.log("PARTNER_KEY",PARTNER_KEY);
            //console.log("MCH_ID",MCH_ID);
        },
        //weixin sign
        sign: function(param) {
            var querystring = Object.keys(param).filter(function(key) {
                return param[key] !== undefined && param[key] !== '' && ['pfx', 'partner_key', 'sign', 'key'].indexOf(key) < 0;
            }).sort().map(function(key) {
                return key + '=' + param[key];
            }).join("&") + "&key=" + PARTNER_KEY;

            var hash = CryptoJS.MD5(querystring).toString().toUpperCase();
            return hash
        }
    };
})();
