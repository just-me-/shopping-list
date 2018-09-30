showMessage = function( type, text ) {
  var html = '<div class="message text-center"><p><span class="glyphicon glyphicon-' + type + '"></span></p><p>' + text + '</p></div>';

  $( '#main' ).append( html );

  setTimeout( function() { $( '.message' ).addClass( 'fade-out' ); }, 500 );
  setTimeout( function() { $( '.message' ).remove(); }, 1000 );
}
