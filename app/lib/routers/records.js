FlowRouter.route('/records', {
  name:"records",
  action: function(params, queryParams) {
   	FlowLayout.render("records");
  },
    triggersEnter: function(context, redirect) {
        if (facc.isGuest()) {
            FlowRouter.go("/login");
        }
    }
});
FlowRouter.route('/records/add', {
  action: function(params, queryParams) {
   	FlowLayout.render("recordsAdd");
  },
    triggersEnter: function(context, redirect) {
        if (facc.isGuest()) {
            FlowRouter.go("/login");
        }
    }
});

FlowRouter.route('/records/list', {
  action: function(params, queryParams) {
   	FlowLayout.render("recordsList");
  },
    triggersEnter: function(context, redirect) {
        if (facc.isGuest()) {
            FlowRouter.go("/login");
        }
    }
});
FlowRouter.route('/records/document/add', {
  action: function(params, queryParams) {
   	FlowLayout.render("recordsDocumentAdd");
  },
    triggersEnter: function(context, redirect) {
        if (facc.isGuest()) {
            FlowRouter.go("/login");
        }
    }
});
FlowRouter.route('/records/document/edit', {
  action: function(params, queryParams) {
   	FlowLayout.render("recordsDocumentEdit");
  },
    triggersEnter: function(context, redirect) {
        if (facc.isGuest()) {
            FlowRouter.go("/login");
        }
    }
});
FlowRouter.route('/records/document/view', {
  action: function(params, queryParams) {
    FlowLayout.render("recordsDocumentView");
  },
    triggersEnter: function(context, redirect) {
        if (facc.isGuest()) {
            FlowRouter.go("/login");
        }
    }
});
