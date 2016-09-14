Meteor.startup(function() {
  
    if(!localStorage.getItem("tempid")){
         localStorage.setItem("tempid","TEMP" + CryptoJS.MD5(new Date() + Math.random() +  "").toString());
     }
});
