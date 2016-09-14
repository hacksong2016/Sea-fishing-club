
upload = function(img, callback) {

    var prefix = img.substr(0, img.indexOf("base64") + 7);

    var ext = "jpg";
    var mine = "image/jpeg";
    if (prefix.indexOf("png") > 0) {
        ext = "png";
        mine = "image/png";
    } else if (prefix.indexOf("gif") > 0) {
        ext = "gif";
        mine = "image/gif";
    }

    var name = "pictures/" + parseInt(Math.random() * 10000000000) + "." + ext;

    var data = img.replace(/^data:image\/\w+;base64,/, "");
    var base64 = new Buffer(data, "base64");


    var url = "http://kanyayi.oss-cn-beijing.aliyuncs.com/" + name;
    oss.putObject({
            Bucket: 'kanyayi',
            Key: name, // 注意, Key 的值不能以 / 开头, 否则会返回错误.
            Body: base64,
            AccessControlAllowOrigin: '*',
            ContentType: mine,
            CacheControl: 'no-cache', // 参考: http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.9
            ContentDisposition: '', // 参考: http://www.w3.org/Protocols/rfc2616/rfc2616-sec19.html#sec19.5.1
            ContentEncoding: 'utf-8', // 参考: http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.11
            ServerSideEncryption: 'AES256',
            Expires: null // 参考: http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.21
        },
        Meteor.bindEnvironment(function(err, msg) {
            if (err) {
                console.log(err);
            } else {
                callback(url);
            }

        })
    );
};