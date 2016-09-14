FlowRouter.route('/', {
  name:"site",
  action: function(params, queryParams) {
    FlowLayout.render("site");
  }
});