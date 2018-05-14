Template.registerHelper('canRegister', function (cook) {
  return !(cook === Meteor.user().profile.first_name);
});

Template.dinner.helpers({
  registeredJoin: function() {
    console.log(Dinners.findOne({_id: this._id}));
    // left here 
    return Dinners.findOne({_id: this._id});
  }
});

Template.dinner.events({
  'click input': function( e ) { e.stopPropagation(); },
  'areaLongPress .dinner': function( e ) {
    e.stopPropagation();
    editDinner( this );
    return false;
  },
  'blur .edit input': function( e ) {
    if ( ( value = $( '#dinner-' + this._id + ' .edit input' ).val().trim() ) && value != this.desc ) {
      Dinners.update( { _id: this._id }, { $set: { desc: value, cook: (value != "-") ? Meteor.user().profile.first_name : '' } } );
      showMessage( 'ok', 'Kocheintrag aktualisiert.' );
    }
    editDinner( this );
  },
  'keyup .edit input': function( e ) {
    if ( e.which == 13 ) {
      $( '#dinner-' + this._id + ' .edit input' ).blur();
    }
  }
});

Template.dinner.rendered = function() {
  var el = this.firstNode;
  assignAreaLongPress( el, function() { $( el ).trigger( 'areaLongPress' ); } );
};

var editDinner = function( _this ) {
  $( '#dinner-' + _this._id + ' .desc' ).toggleClass( 'edit' ).find( 'input' ).focus();
}
var assignAreaLongPress = function( el, callback ) {
  $( el )
    .on( 'mousedown touchstart', function ( e ) {
      e.stopPropagation();
      $( this ).data( 'checkdown', setTimeout( callback, 1000 ) );
    }).on( 'mouseup touchend', function ( e ) {
      e.stopPropagation();
      clearTimeout( $( this ).data( 'checkdown' ) );
    }).on( 'mouseout touchleave', function () {
      clearTimeout( $( this ).data( 'checkdown' ) );
    });
}
