Template.registerHelper('currentRoute', function (route) {
  return Router.current().route.getName() === route;
});

Template.header.events({
  'click ul.navbar-nav li a': function(e) {
    $(e.target).closest('li').addClass('jello animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
    function(){
      $(this).removeClass('jello animated');
    });
  },
  'click .logout': function() {
    Meteor.logout();
  }
})
