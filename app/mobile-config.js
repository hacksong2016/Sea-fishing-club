// This section sets up some basic app metadata,
// the entire section is optional.
App.info({
    id: 'com.fami2u.xdb',
    name: 'xdb',
    description: 'xdb',
    author: 'fami2u',
    email: 'sunhannan@fami2u.com',
    website: 'http://fami2u.com'
});

// App.icons({
//     "iphone": 'icons/ios/Icon-40.png',
//     "iphone_2x": 'icons/ios/Icon-40@2x.png',
//     "iphone_3x": 'icons/ios/Icon-40@3x.png',
//     "ipad": 'icons/ios/Icon-60@2x.png',
//     "ipad_2x": 'icons/ios/Icon-60@3x.png',
//     "android_ldpi": 'icons/android/mdpi/ic_launcher_APP.png',
//     "android_mdpi": 'icons/android/mdpi/ic_launcher_APP.png',
//     "android_hdpi": 'icons/android/hdpi/ic_launcher_APP.png',
//     "android_xhdpi": 'icons/android/xhdpi/ic_launcher_APP.png'
// });

// App.launchScreens({
//     "iphone": 'splash/ios/iPhone 4@2x.png',
//     "iphone_2x": 'splash/ios/iPhone 4@2x.png',
//     "iphone5": 'splash/ios/iPhone 5@2x.png',
//     "iphone6": 'splash/ios/iPhone 6@2x.png',
//     "iphone6p_portrait": 'splash/ios/iPhone 6p@3x.png',
//     "android_ldpi_portrait": 'splash/android/hdpi.png',
//     "android_mdpi_portrait": 'splash/and  roid/xhdpi.png',
//     "android_hdpi_portrait": 'splash/android/xxhdpi.png',
//     "android_xhdpi_portrait": 'splash/android/xxxhdpi.png',
// });

// Set PhoneGap/Cordova preferences
App.setPreference('BackgroundColor', '0xff0000ff');
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference("Fullscreen", true);
App.setPreference("DisallowOverscroll", true);
App.setPreference("StatusBarOverlaysWebView", true);
App.setPreference("StatusBarBackgroundColor", "#000000");
App.setPreference("StatusBarStyle", "lightcontent");


App.configurePlugin('nl.xservices.plugins.LaunchMyApp', {
    URL_SCHEME: 'xdb'
});

// App.configurePlugin('wang.imchao.plugin.alipay', {
//     'PARTNER_ID': 'value',
//     'SELLER_ACCOUNT': 'value',
//     'PRIVATE_KEY': 'value'
// });
App.configurePlugin('wechat.fami2u.com', {
    WECHATAPPID: 'wx8ebaf504c1a1cff0'
});

// App.configurePlugin('cn.jpush.phonegap.JPushPlugin', {
//     API_KEY: '6953089cfd6767dba36da835'
// });

App.accessRule('http://*');
App.accessRule('https://*');

