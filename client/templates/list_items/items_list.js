Template.itemsList.helpers({
  items: function() {
    return Items.find({}, {sort: {checked: 1, important: -1, position: -1, title_index: 1}});
  }
});
Template.modal_shoppingDone.helpers({
  users: function() {
    return Meteor.users.find({}, {sort: {'profile.first_name': 1}});
  }
});
Template.registerHelper('isMe', function (id) {
  return (id === Meteor.user()._id);
});

var inputWidth;
Template.itemsList.events({
  'submit .form-inline': function(e) {
    e.preventDefault();

    var item = {
      title: $( 'input#new-item' ).val(),
      position: parseInt($( 'input[name=position]:checked' ).val()),
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
      $( "#position-icons #default" ).prop( "checked", true );
      $( "#position-icons" ).hide( 500 );

    });
  },
  'keypress input#new-item': function(e) {
    $( "#position-icons" ).show( 500 );
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
    $('#shopping-modal').modal('show');
  },
  'click #shopping-modal .btn-primary': function() {
    $('#shopping-modal').modal('hide');
    var countShopped = Items.find( {checked: true} ).count();
    _.each( Items.find( {checked: true} ).fetch(), function( item ) {
      Items.remove( { _id: item._id } );
    } )
    if(countShopped >= 3) {
      // log shoppers
      $("input.shopping-member:checked").each(function(){
        Meteor.call( 'hasShopped', $(this).val(), function( error ) {
          if (error) {
            return alert(error.reason);
          }
        });
      });
    }
    showMessage( 'trash', 'Einkauf abgeschlossen!<br/>'+countShopped+' Artikel gelöscht.' );
  },
  'click #show-cumulus': function() {
    $('#cumulus-modal').modal('show');
  }
});
