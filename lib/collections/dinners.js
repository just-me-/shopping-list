Dinners = new Mongo.Collection( 'dinners' );

Dinners.allow({
  update: function(userId, dinner) {
    return userId;
  }
});


Meteor.methods( {

  clearWeek: function( ) {
    // first update history log
    var list = Dinners.find({"cook" : {"$exists" : true, "$ne" : ""}}, {sort: {order_prio: 1}});
    list.forEach(function(dinner){
      // get correct user entry
      Meteor.users.update({"profile.first_name": dinner.cook}, {"$inc": {"profile.dinnerCounter": 1}});
    })

    // clear week - reset dinner data
    Dinners.update( { }, { $set: { desc: '', cook: '', sign: null } }, { multi: true } );
    return true;
  },
  resetCooking: function() {
    Meteor.users.update({}, { "$set": {"profile.dinnerCounter": 0} }, {multi: true} );
  }

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
