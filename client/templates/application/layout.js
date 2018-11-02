Template.layout.helpers( {
  version: function() { return Version.findOne(); }
});

Meteor.users.find({ "status.online": true }).observe({
  added: function(user) {
    // id just came online
    if(Meteor.user()._id != user._id) {
      console.log(user.profile.first_name+"on");
    }
  },
  removed: function(user) {
    // id just went offline
    console.log(user.profile.first_name+"off");
  }
});
