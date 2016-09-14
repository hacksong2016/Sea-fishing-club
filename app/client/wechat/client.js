wechat = {
    notifyUrl: "http://notify.kuaitouhui.cn/wechat",
    pay: function(pay, fn) {
        //测试微信支付
        Meteor.call("createWxPay", {
            tradeNo: pay._id,
            subject: pay.subject,
            body: pay.body,
            price: pay.price,
            notifyUrl: wechat.notifyUrl,
            userid: pay.userid,
        }, function(err, res) {
            if (res.status && (res.status == "UNOPENID")) {
                var url = res.root + FlowRouter.current().path.replace("/", "");
                res.url = res.url.replace("REDIRECT_URI", encodeURIComponent(url));
                window.location.href = res.url;
            } else {
                wx.chooseWXPay({
                    appId: res.appId,
                    timestamp: res.timeStamp,
                    nonceStr: res.nonceStr,
                    package: res.package,
                    signType: res.signType,
                    paySign: res.paySign,
                    success: function(result) {
                        fn(result);
                    }
                });

            }
        });
    },
    showShare: function() {
        if (Meteor.isCordova) {
            var sw = $(".share-warp");
            $(".share-bg").fadeIn(300);
            $("#__flow-root").addClass("blur");
            sw.css({
                    left: (($(window).width() - sw.width()) / 2),
                    top: (($(window).height() - sw.height()) / 2)
                }).removeClass("bounceOutDown")
                .addClass("bounceInDown");

            if (!$(".share-bg").attr("init")) {
                $(".share-bg").attr("init", true).click(function() { shareClose(); });

                sw.click(function() {
                    return false;
                });

                $(".share-wechat").click(function() {
                    shareFor(0);

                });
                $(".share-frd").click(function() {
                    shareFor(1);
                });

            }
        } else {
            var shareObj = Session.get("SHAREOBJ");
            var shareObj = {
                title: shareObj.title, // 分享标题
                desc: shareObj.desc, // 分享描述
                link: shareObj.url, // 分享链接
                imgUrl: shareObj.image, // 分享图标
                success: function() {
                    shareClose();
                },
                cancel: function() {
                    shareClose();
                }
            };
            wx.onMenuShareAppMessage(shareObj);
            wx.onMenuShareTimeline(shareObj);
            wx.onMenuShareQQ(shareObj);
            wx.onMenuShareQZone(shareObj);
            wx.onMenuShareWeibo(shareObj);
            wx.showAllNonBaseMenuItem();
            wx.showOptionMenu();

            $(".share-wx").fadeIn();

        }
    },
    hideShareWx: function() {
        $(".share-wx").fadeOut();
    },
    shareClose: function() {
        $(".share-warp").removeClass("bounceInDown")
            .addClass("bounceOutDown");
        window.setTimeout(function() {
            $(".share-bg").fadeOut(300);
            $("#__flow-root").removeClass("blur");
        }, 700);
    },
    shareFor: function(type) {
        var shareObj = Session.get("SHAREOBJ");


        Wechat.share({
            message: {
                title: shareObj.title,
                description: shareObj.desc,
                // thumb: "http://mfy-cdn.fami2u.com/pictures/2698716123.jpg",
                "thumb": "www/application/app/logo2.png",
                messageExt: (shareObj.message ? shareObj.message : shareObj.desc),
                media: {
                    type: Wechat.Type.WEBPAGE,
                    webpageUrl: shareObj.url
                }
            },
            scene: type
        }, function() {
            shareClose();
        }, function(reason) {
            shareClose();
        });


    },
    isWeiXin: function() {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    }
}


if (!Meteor.isCordova && wechat.isWeiXin()) {
    FlowRouter.triggers.enter([function(context, redirect) {
        Meteor.call("signatureWechat", { path: (context.path) }, function(err, obj) {
            wx.config({
                debug: false,
                appId: obj.appId,
                timestamp: obj.timestamp,
                nonceStr: obj.noncestr,
                signature: obj.signature,
                jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareQZone", "onMenuShareWeibo", "hideOptionMenu", "hideMenuItems", "showMenuItems", "hideAllNonBaseMenuItem", "showAllNonBaseMenuItem", "showOptionMenu", "chooseWXPay"]
            });
            wx.ready(function() {
                if (context.context.pathname == "/apply/class/detail") {
                    wx.hideAllNonBaseMenuItem();
                    wx.hideOptionMenu();
                }

            });

        });

    }]);
    FlowRouter.triggers.enter([function(context, redirect) {

        if (!facc.isGuest()) {
            if (context.queryParams.state && context.queryParams.code && (context.queryParams.state == "wxLogin")) {
                Meteor.call("setWxUserInfo", { code: context.queryParams.code, userid: facc.user()._id }, function(err, obj) {});
            }
        }

        $(".share-wx").hide();
    }]);
}
FlowRouter.triggers.enter([function(context, redirect) {
    if (context.queryParams.fruid) {
        Session.set("FRUID", context.queryParams.fruid);
        console.log("set uid");
    }
    if (context.queryParams.curstate) {
        Session.set("CURSTATE", context.queryParams.curstate);
        console.log("set curstate");
    }

}]);
