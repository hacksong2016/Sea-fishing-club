Template.select.helpers({
    knowledges:function(){
        return Knowledges.find({},{sort:{orderBy:-1,createAt:-1}})
    },
    settings: function() {
    return {
      limit: 10,  // more than 20, to emphasize matches outside strings *starting* with the filter
      rules: [
        {
          token: '',
          collection: Knowledges,  // Mongo.Collection object means client-side collection
          field: 'topic',
          // set to true to search anywhere in the field, which cannot use an index.
          matchAll: true,  // 'ba' will match 'bar' and 'baz' first, then 'abacus'
          template: Template.serverCollectionPill
        }
      ]
     }
    }
});
Template.select.events({
 	"autocompleteselect input": function(e, t, doc) {
    	// console.log("selected ", doc);
      FlowRouter.go('/knowledge/detail?id='+ doc._id);
  }
});
