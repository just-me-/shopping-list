Template.historyList.helpers({
  users: function() {
    return Meteor.users.find({}, {sort: {
      'profile.shoppingCounter': -1, 'profile.dinnerCounter': -1, 'profile.first_name': 1
    }});
  }
});
Template.registerHelper('formatDate', function(date) {
  if(!date)
    return ">>nicht vorhanden<<";
  return date.getDate() + "." + (1+date.getMonth()) + "." + date.getFullYear();
});

Template.historyList.events({
  'click #reset-history': function( e ) {
    // not a safe way but good enough for our wg use
    if (Meteor.users.findOne(Meteor.userId()).profile.isModerator !== true) {
      showMessage( 'thumbs-down', 'Fehlende Berechtigung.' );
      return;
    }
    Meteor.call( 'resetShopping', function( error ) {
      if (error) {
        return alert(error.reason);
      }
    });
    Meteor.call( 'resetCooking', function( error ) {
      if (error) {
        return alert(error.reason);
      }
    });
    showMessage( 'trash', 'Statistik zurückgesetzt.' );
  }
});
