Items = new Mongo.Collection( 'items' );

Items.allow({
  update: function(userId, item) {
    return userId;
  },
  remove: function(userId, item) {
    return userId;
  },
});


Meteor.methods( {
  itemInsert: function( itemAttributes ) {
    check( Meteor.userId(), String );
    check( itemAttributes, {
      title: String,
      checked: Boolean
    });

    var user = Meteor.user();
    var item = _.extend( itemAttributes, {
      userId: user._id,
      creator: user.profile.first_name + ' ' + user.profile.last_name,
      title_index: itemAttributes.title.toLowerCase(),
      checked: false,
      important: false,
      submitted: new Date()
    });

    var itemId = Items.insert(item);
    return {
      _id: itemId
    };
  },
  hasShopped: function( userId ) {
    var res = Meteor.users.update({_id: userId}, {
      "$inc": {"profile.shoppingCounter": 1},
      "$set": {"profile.shoppingLastDate": new Date()}
    });
  }
});
