$(document).ready(function(){
	var lvl = -1;
	//LVL1
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
	//LVL2
	var estrella = new Object();
	estrella.imagen = "./resources/estrella.png";
	estrella.nombre = "estrella";
	var ovalo = new Object();
	ovalo.imagen = "./resources/ovalo.png";
	ovalo.nombre = "ovalo";
	var pentagono = new Object();
	pentagono.imagen = "./resources/pentagono.png";
	pentagono.nombre = "pentagono";
	var hexagono = new Object();
	hexagono.imagen = "./resources/hexagono.png";
	hexagono.nombre = "hexagono";

	var formas = [[cuadrado, triangulo, circulo, rombo],[estrella, ovalo, pentagono, hexagono]];
	var rnd = Math.floor(Math.random()*4);
	
	
	nextLvl();
	

    function nextLvl(){
    	lvl++;
    	$(".item-container").html("");
    	formas[lvl] = formas[lvl].sort(function() {return Math.random() - 0.5});
    	for( let i = 0; i < formas[lvl].length; i++){
			console.log(formas[lvl][i]);
			$(".item-container").append("<div class='draggable "+formas[lvl][i].nombre+"'><img src='"+formas[lvl][i].imagen+"' alt='' width='100'></div>");
		}
		console.log(formas);
		$(".forma").html(formas[lvl][rnd].nombre);

		$(".draggable").each(function(){
			$(this).draggable({
				revert: "invalid",
				cursor: "move",
				containment: $(this).parent().parent()
			});
		})
		$( "#dropable" ).droppable({
			//accept: "."+formas[rnd].nombre,
	     	drop: function( event, ui ) {
	     		if(ui.draggable.hasClass(formas[lvl][rnd].nombre)){	  
				    $( "#dialog-confirm" ).dialog({
				      resizable: false,
				      height: "auto",
				      width: 400,
				      modal: true,
				      buttons: {
				        "Siguiente nivel": function() {
				          $( this ).dialog( "close" );
				          nextLvl();
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
    }
});

