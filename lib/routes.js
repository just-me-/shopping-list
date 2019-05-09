Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    return Meteor.subscribe( 'items' )
    && Meteor.subscribe( 'dinners' )
    && Meteor.subscribe( 'events' )
    && Meteor.subscribe( 'version' )
    && Meteor.subscribe( 'allUsers' ); }
});

Router.route('/', {name: 'itemsList'});
Router.route('/dinner', {name: 'dinnerList'});
Router.route('/event', {name: 'eventList'});
Router.route('/history', {name: 'historyList'});
// Router.route('/items/:_id/edit', {
//   name: 'itemEdit',
//   data: function() { return Items.findOne(this.params._id) }
// });

// Router.route('/submit', {name: 'itemSubmit'});

var requireLogin = function() {
  // api has own login security (token)
  if ( ! this.url.match(/^\/api\//g) && ! Meteor.user() ) {
    if ( Meteor.loggingIn() ) {
      this.render( this.loadingTemplate );
    } else {
      this.render( 'login' );
    }
  } else {
    this.next();
  }
}

Router.onBeforeAction( 'dataNotFound', {only: 'itemPage'} );
Router.onBeforeAction( requireLogin );
