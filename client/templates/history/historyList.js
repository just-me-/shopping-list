Template.historyList.helpers({
  users: function() {
    return Meteor.users.find({});
  }
});

Template.historyList.events({
  'click #reset-history': function( e ) {
    showMessage( 'thumbs-down', 'Fehlende Berechtigung.' );
    return;
  }
});
