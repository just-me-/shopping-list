Template.eventList.helpers({
  events: function() {
    return Events.find({}, {sort: {created: 1}});
  }
});

Template.eventList.events({
  'submit form': function(e) {
    e.preventDefault();

    var event = {
      title: $( 'input#new-event' ).val(),
      typ: $( 'input[name=typ]:checked' ).val()
    };

    // console.log(event);

    if(event.title.replace(/\s/g, '') === "" || event.title === null) {
      showMessage( 'remove', 'Bitte ein Event angeben.' );
      return;
    }

    Meteor.call( 'eventInsert', event, function( error, result ) {
      if (error) {
        return alert(error.reason);
      }
      $( 'input#new-event' ).val( '' );
    });
  }
});
