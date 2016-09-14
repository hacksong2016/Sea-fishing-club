Template.knowledgeDetailItem.onCreated(function() {
    this.subscribe("knowledgeDataItem", FlowRouter.getQueryParam("id"));
});
Template.knowledgeDetailItem.helpers({
    knoItems: function() {
        return KnoItems.findOne();
    }
});
Template.knowledgeDetailItem.events({
    
});

