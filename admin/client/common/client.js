Meteor.startup(function() {

    Template.registerHelper("reverse", function(arr) {
        if (arr) {
            return arr.reverse();
        } else {
            return [];
        }

    });

    Template.registerHelper("format", function(str) {
        if (str) {
            var d = new Date(str);

            return d.getFullYear() + "年" + (d.getMonth() + 1) + "月" + d.getDate() + "日 " + pad(d.getHours(), 2) + ":" + pad(d.getMinutes(), 2);
        } else {
            return "-/-/- --:--"
        }

    });
    
    
});
