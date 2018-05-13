Template.user.helpers( {
  username: function() {
    if ( Meteor.user() )
      return Meteor.user().username;
  },
  user_icon: function() {
    if ( Meteor.user() && Meteor.user().icon )
      return Meteor.user().icon;
      // Meteor.users does not support icon. 2Do: add as option field...
      // return JSON.stringify(Meteor.user());

    return 'user';
  },
  user_first_name: function() {
    if ( Meteor.user() )
      return Meteor.user().profile.first_name;
  }
} );
