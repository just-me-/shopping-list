Template.registerHelper('isModerator', function () {
  return (Meteor.users.findOne(Meteor.userId()).profile.isModerator === true);
});

Template.dinnerList.helpers({
  dinners: function() {
    return Dinners.find({}, {sort: {order_prio: 1}});
  }
});

Template.dinnerList.events({
  'click #clear-week': function( e ) {
    // not a safe way but good enough for our wg use
    if (Meteor.users.findOne(Meteor.userId()).profile.isModerator !== true) {
      showMessage( 'thumbs-down', 'Fehlende Berechtigung.' );
      return;
    }
    if ( confirm( 'Möchtest Du wirklich alle Einträge dieser Woche löschen?' ) ) {
      // Dinners.update( { }, { $set: { desc: '', cook: '', sign: null } } );
      Meteor.call( 'clearWeek', function( error, result ) {
        // display the error to the user and abort
        if (error) {
          return alert(error.reason);
        }
        showMessage( 'ok', 'Die Woche wurde zurückgesetzt.' );
      });
    }
  },
  'click #block-today': function( e ) {
    showMessage( 'ok', 'Noch ned implementiert...' );
  }
});
