Events = new Mongo.Collection( 'events' );

Events.allow({
  update: function(userId, evemt) {
    return userId;
  },
  remove: function(userId, evemt) {
    return userId;
  },
});


Meteor.methods( {
  eventInsert: function( eventAttributes ) {
    check( Meteor.userId(), String );
    check( eventAttributes, {
      title: String,
      typ: String
    });

    var user = Meteor.user();
    var event = _.extend( eventAttributes, {
      userId: user._id,
      creator: user.profile.first_name + ' ' + user.profile.last_name,
      title: eventAttributes.title,
      typ: eventAttributes.typ,
      created: new Date()
    });

    var eventId = Events.insert(event);

    return {
      _id: eventId
    };
  }
});
