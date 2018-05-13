Template.user.helpers( {
  username: function() {
    if ( Meteor.user() )
      return Meteor.user().username;
  },
  user_icon: function() {
    if ( Meteor.user() && Meteor.user().profile.icon )
      return Meteor.user().profile.icon;
      // return JSON.stringify(Meteor.user());

    return 'user';
  },
  user_first_name: function() {
    if ( Meteor.user() )
      return Meteor.user().profile.first_name;
  }
} );
