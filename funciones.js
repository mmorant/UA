$(document).ready(function(){
$('.enlaces').keypress(function(e) {
     if(e.which == 13) {
     	e.preventDefault();
     	switch($(this).attr('tabIndex')){
     		case '1':
     			window.location = 'Ordenar/ordenar.html';
     		break;
     		case '2':
     			window.location = 'Juego2/index.html';
     		break;
     		case '3':
     			window.location = 'Juego1/index1.html';
     		break;
     	}
        
        console.log($(this).attr('tabIndex'));
     }
 });
});