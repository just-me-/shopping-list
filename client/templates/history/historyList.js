Template.historyList.helpers({
  users: function() {
    return Meteor.users.find({}, {sort: {'profile.first_name': 1}});
  }
});
Template.registerHelper('formatDate', function(date) {
  if(!date)
    return ">>nicht vorhanden<<";
  return date.getDate() + "." + (1+date.getMonth()) + "." + date.getFullYear();
});

Template.historyList.events({
  'click #reset-history': function( e ) {
    showMessage( 'thumbs-down', 'Fehlende Berechtigung.' );
    return;
  }
});
