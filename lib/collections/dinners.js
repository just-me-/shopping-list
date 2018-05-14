Dinners = new Mongo.Collection( 'dinners' );

Dinners.allow({
  update: function(userId, dinner) {
    return userId;
  }
});


Meteor.methods( {
  /*
  dinnerInsert: function( dinnerAttributes ) {
    check( Meteor.userId(), String );
    check( itemAttributes, {
      description: String,
      day: String,
      cook: String
    });

    var user = Meteor.user();
    var dinner = _.extend( dinnerAttributes, {
      userId: user._id,
      creator: user.profile.first_name + ' ' + user.profile.last_name,
      submitted: new Date()
    });

    var dinnerId = Dinners.insert(dinner);
    return {
      _id: dinnerId
    };
  }
  */
});
