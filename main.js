$(document).ready(function(){
	$("#draggable").draggable();
	$( "#dropable" ).droppable({
      drop: function( event, ui ) {
        $( this )
          .addClass( "green" )
          .find( "p" )
            .html( "Dropped!" );
      }
    });
});