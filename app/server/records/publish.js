Meteor.publish("records", function(uid) {
   
    return Records.find({
        "userid": uid,
         status:1
    });
});
Meteor.publish("record", function(id) {
    return Records.find({
        "_id": id
    });
});