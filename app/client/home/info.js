Template.homeInfo.onCreated(function() {
    this.subscribe("userDetail", facc.user()._id);
});
Template.homeInfo.helpers({
    user: function() {
        return Meteor.users.findOne();
    },
});