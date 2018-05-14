Template.itemsList.helpers({
  items: function() {
    return Items.find({}, {sort: {checked: 1, important: -1, title_index: 1}});
  }
});

var inputWidth;
Template.itemsList.events({
  'submit .form-inline': function(e) {
    e.preventDefault();

    var item = {
      title: $( 'input#new-item' ).val(),
      checked: false
    };

    if(item.title.replace(/\s/g, '') === "" || item.title === null) {
      showMessage( 'remove', 'Bitte einen Artikel angeben.' );
      return;
    }

    Meteor.call( 'itemInsert', item, function( error, result ) {
      // display the error to the user and abort
      if (error) {
        return alert(error.reason);
      }

      $( 'input#new-item' ).val( '' );
    });
  },
  'focus input#new-item': function(e) {
    e.preventDefault();

    var _this = $( 'input#new-item' );
    var width = _this.parents( '.form-inline' ).innerWidth();

    inputWidth = _this.outerWidth();

    _this.animate({
        width: width - 83
    }, 400 ); // hmm... well... 2Do...
  },
  'blur input#new-item': function(e) {
    e.preventDefault();

    var _this = $( 'input#new-item' );
    _this.animate({
        width: inputWidth
    }, 400 );
  },
  'click #shopping-done': function() {
    if ( confirm( 'Möchtest Du wirklich alle als gekauft markierten Artikel von der Liste löschen?' ) ) {
      _.each( Items.find( {checked: true} ).fetch(), function( item ) {
        Items.remove( { _id: item._id } );
      } )
    }
  },
  'click #show-cumulus': function() {
    $('#cumulus-modal').modal('show');
  }
});
