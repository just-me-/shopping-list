Template.item.events({
  'click li': function( e ) {
    e.stopPropagation();
    Items.update( { _id: this._id }, { $set: { checked: !this.checked } } );
    if ( this.checked ) {
      showMessage( 'unchecked', 'Item unchecked' );
    } else {
      showMessage( 'check', 'Item checked' );
    }
  },
  'click a.btn-important': function( e ) {
    e.stopPropagation();
    Items.update( { _id: this._id }, { $set: { important: !this.important } } );
    showMessage( 'heart-empty', 'Item ' + (!this.important ? '' : 'not ') + 'important' );
  },
  'click a.btn-delete': function( e ) {
    e.stopPropagation();
    if ( confirm( 'Möchtest Du diesen Artikel löschen?' ) ) {
      Items.remove( { _id: this._id } );
      showMessage( 'remove', 'Artikel gelöscht.' );
    }
  },
  'click input': function( e ) { e.stopPropagation(); },
  'click a.btn-edit, longPress li': function( e ) {
    e.stopPropagation();
    editItem( this );
    return false;
  },
  'blur .edit input': function( e ) {
    if ( $( window ).width() >= 768 ) {
      return;
    }

    if ( ( value = $( '#item-' + this._id + ' .edit input' ).val() ) && value != this.title ) {
      Items.update( { _id: this._id }, { $set: { title: value } } );
      showMessage( 'ok', 'Artikel aktualisiert.' );
    }
    editItem( this );
  },
  'keyup .edit input': function( e ) {
    if ( e.which == 13 ) {
      $( '#item-' + this._id + ' .edit input' ).blur();
    }
  }
});

Template.item.rendered = function() {
  var el = this.firstNode;
  assignLongPress( el, function() { $( el ).trigger( 'longPress' ); } );
};

var editItem = function( _this ) {
  $( '#item-' + _this._id + ' .btn-edit span' )
    .toggleClass( 'glyphicon-pencil glyphicon-ok text-danger' );
  $( '#item-' + _this._id + ' .title' )
    .toggleClass( 'edit' )
    .find( 'input' ).focus();
}

var assignLongPress = function( el, callback ) {
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
