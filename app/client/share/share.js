showShare = function() {
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
}
shareClose = function() {
    $(".share-warp").removeClass("bounceInDown")
        .addClass("bounceOutDown");
    window.setTimeout(function() {
        $(".share-bg").fadeOut(300);
        $("#__flow-root").removeClass("blur");
    }, 700);
}
shareFor = function(type) {
    var shareObj = Session.get("SHAREOBJ");

    if (Meteor.isCordova) {
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
    } else {
        var shareObj = {
            title: shareObj.title, // 分享标题
            desc: shareObj.desc, // 分享描述
            link: shareObj.url, // 分享链接
            imgUrl: shareObj.image, // 分享图标
            success: function () { 
                 shareClose();
            },
            cancel: function () { 
                 shareClose();
            }
        };
        if(type == 0){
            wx.onMenuShareAppMessage(shareObj);
            alert("开发中~");
        }else{
            wx.onMenuShareTimeline(shareObj);
            alert("开发中~");
        }

    }



}

if (!Meteor.isCordova) {
    FlowRouter.triggers.enter([function(context, redirect) {
        Meteor.call("signatureWechat", { path: (context.path) }, function(err, obj) {
            wx.config({
                debug: false,
                appId: obj.appId,
                timestamp: obj.timestamp,
                nonceStr: obj.noncestr,
                signature: obj.signature,
                jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "hideOptionMenu", "chooseWXPay"]
            });
            // wx.ready(function() {
               
            // });

        });
    }],{only:["activeDetail"]});
}
