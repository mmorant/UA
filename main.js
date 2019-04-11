$(document).ready(function(){
	var cuadrado = new Object();
	cuadrado.imagen = "./resources/cuadrado.png";
	cuadrado.nombre = "cuadrado";
	var triangulo = new Object();
	triangulo.imagen = "./resources/triangulo.png";
	triangulo.nombre = "triangulo";
	var circulo = new Object();
	circulo.imagen = "./resources/circulo.png";
	circulo.nombre = "circulo";
	var rombo = new Object();
	rombo.imagen = "./resources/rombo.png";
	rombo.nombre = "rombo";

	var formas = [cuadrado, triangulo, circulo, rombo];
	var rnd = Math.floor(Math.random()*4);
	formas = formas.sort(function() {return Math.random() - 0.5});

	formas.forEach(function(el){
		$(".item-container").append("<div class='draggable "+el.nombre+"'><img src='"+el.imagen+"' alt='' width='100' height='100'></div>");
	});
	$(".forma").html(formas[rnd].nombre);

	$(".draggable").each(function(){
		$(this).draggable({
			revert: "invalid",
			cursor: "move",
			containment: $(this).parent().parent()
		});
		console.log($(this).parent().parent());
	})
	$( "#dropable" ).droppable({
		//accept: "."+formas[rnd].nombre,
     	drop: function( event, ui ) {
     		if(ui.draggable.hasClass(formas[rnd].nombre)){	  
			    $( "#dialog-confirm" ).dialog({
			      resizable: false,
			      height: "auto",
			      width: 400,
			      modal: true,
			      buttons: {
			        "Siguiente nivel": function() {
			          $( this ).dialog( "close" );
			        },
			        Salir: function() {
			          $( this ).dialog( "close" );
			        }
			      }
			  	}).prev(".ui-dialog-titlebar").css("color","green");;
     		}
     		else{
     			$(ui.draggable).draggable({ revert: true});
     			$("#modalError").show();
     		}
     	}
    });
});

