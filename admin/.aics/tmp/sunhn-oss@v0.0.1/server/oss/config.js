oss = null;
Meteor.startup(function() {
    oss = new ALY.OSS({
        accessKeyId: "eMR13xzds76gUI4n",
        secretAccessKey: "dEtSwWNf7pGjiKIJR6xeA2Lsm8zbXL",
        // endpoint: 'http://oss-cn-beijing-internal.aliyuncs.com',
        endpoint: 'http://oss-cn-beijing.aliyuncs.com',
        apiVersion: '2013-10-15'
    });
});