Template.registerHelper('currentRoute', function (route) {
  return Router.current().route.getName() === route;
});

Template.header.events({
  'click ul.navbar-nav li a': function(e) {
    animateOnce($(e.target).closest('li'), 'jello');
      animateOnce($('footer'), 'fadeInUpBig');
  },
  'click .logout': function() {
    Meteor.logout();
  }
})

var animateOnce = function( object, animation ) {
  object.addClass(animation+' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
  function(){
    $(this).removeClass(animation+' animated');
  });
}
