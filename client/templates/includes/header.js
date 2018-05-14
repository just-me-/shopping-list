Template.registerHelper('currentRoute', function (route) {
  return Router.current().route.getName() === route;
});

Template.header.events({
  'click .logout': function() {
    Meteor.logout();
  }
})
