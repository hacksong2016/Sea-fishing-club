Meteor.publish("regions", function() {
    return Regions.find({
        status: 1
    });;
})