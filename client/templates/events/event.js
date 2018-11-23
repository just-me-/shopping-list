Template.event.helpers({
  short : function () {
    var user = Meteor.users.findOne(this.userId);
    return user.profile.first_name.charAt(0) + user.profile.last_name.charAt(0);
  },
  typicon : function () {
    switch (this.typ) {
      case "movie":
        return "film";
      case "switch":
        return "tower";
      default:
        return "glass";
    }
  },
  hasTrailer: function () {
    console.log(this.typ);
    return this.typ == "movie";
  },
  trailer : function () {
    var url = encodeURI("https://www.youtube.com/results?search_query="+this.title+" trailer");
    return url;
  }
});

Template.event.events({
  'click a.btn-important': function( e ) {
    e.stopPropagation();
    Events.remove( { _id: this._id } );
    showMessage( 'remove', 'Eventeintrag gelöscht.' );
  }
});
