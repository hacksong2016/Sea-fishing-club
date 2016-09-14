Template.knowledgeDetail.onCreated(function() {
    this.subscribe("knowledgeData", FlowRouter.getQueryParam("id"));
});
Template.knowledgeDetail.helpers({
    knowledge: function() {
        return Knowledges.findOne();
    }
});
Template.knowledgeDetail.events({
    
});

