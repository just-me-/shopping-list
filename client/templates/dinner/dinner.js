Template.registerHelper('canRegister', function (cook) {
  return !(cook === Meteor.user().profile.first_name);
});
Template.dinner.helpers({
  registeredJoin : function () {
    var result = Dinners.findOne({_id: this._id}).sign;
    if(!result)
      return null;

    // remove cook from guest list
    var cook = this.cook;
    if(cook)
      delete result[cook];

    var array = _.map(result, function(val,key){
      return {name: key, status: val}
    });

    array.sort(function (a, b) {
      var prio = {
        yes : 1,
        later : 2,
        no : 3
      };
      if (prio[a.status] > prio[b.status])
        return 1;
      if (prio[a.status] < prio[b.status])
        return -1;
      return 0;
    });
    return array;
  },
  isStatus: function(status){
    return this.status === status;
  },
  listedAs: function(status){
    var result = Dinners.findOne({_id: this._id}).sign;
    if (result == null)
      return false;
    return result[Meteor.user().profile.first_name] === status;
  },
  isBlocked: function(){
    // dirty one for "only today gets blocked"
    var thisDinner = Dinners.findOne({_id: this._id, order_prio: new Date().getDay()});
    var firstName = Meteor.user().profile.first_name;
    // user alrdy registered == can change status
    return (thisDinner && thisDinner.sign && thisDinner.sign[firstName] == null);
  }
});

Template.dinner.events({
  'click .dinner .yes': function( e ) {
    e.stopPropagation();
    changeStatusForDinner( this, "yes" );
    showMessage( 'ok', 'Du isst mit.' );
  },
  'click .dinner .later': function( e ) {
    e.stopPropagation();
    changeStatusForDinner( this, "later" );
    showMessage( 'ok', 'Du kommst später.' );
  },
  'click .dinner .no': function( e ) {
    e.stopPropagation();
    changeStatusForDinner( this, "no" );
    showMessage( 'ok', 'Du bist nicht da.' );
  },
  'click input': function( e ) { e.stopPropagation(); },
  'areaLongPress .dinner': function( e ) {
    e.stopPropagation();
    editDinner( this );
    return false;
  },
  'blur .edit input': function( e ) {
    if ( ( value = $( '#dinner-' + this._id + ' .edit input' ).val().trim() ) && value != this.desc ) {
      Dinners.update( { _id: this._id }, { $set: { desc: value, cook: (! /^-$|^\.\.\.$/.test(value)) ? Meteor.user().profile.first_name : '' } } );
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
  // trigger only by pressing description
  var el = this.firstNode.getElementsByClassName('desc')[0];
  assignAreaLongPress( el, function() { $( el ).trigger( 'areaLongPress' ); } );
};

var changeStatusForDinner = function( _this, status ) {
  var user = Meteor.user().profile.first_name;
  var sign = Dinners.findOne({_id: _this._id}, {sign: 1});
  if(sign && sign.sign === null){
    // no entry yet
    var userObj = {};
    userObj[user] = status;
    Dinners.update( { _id: _this._id }, { $set: { sign: userObj } } );
  } else {
    // update.. but do not del other users signs
    var update = { "$set": {} };
    update["$set"]["sign."+user] = status;
    Dinners.update( { _id: _this._id }, update );
  }
}
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
