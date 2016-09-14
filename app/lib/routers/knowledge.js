FlowRouter.route('/knowledge/list', {
  action: function(params, queryParams) {
   	FlowLayout.render("knowledgeList");
  }
});

FlowRouter.route('/knowledge/detail', {
  action: function(params, queryParams) {
   	FlowLayout.render("knowledgeDetail");
  }
});

FlowRouter.route('/knowledge/list/next', {
  action: function(params, queryParams) {
   	FlowLayout.render("knowledgeItem");
  }
});

FlowRouter.route('/knowledge/detailItem', {
  action: function(params, queryParams) {
   	FlowLayout.render("knowledgeDetailItem");
  }
});