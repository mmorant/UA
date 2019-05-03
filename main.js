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
	var modal_lvl = ["Siguiente nivel", "Mostrar resultados"];
	var fallos = [0, 0];
	var tiempos = [0, 0]; 
	var timer0, timer1;
	
	if(window.location.href.endsWith("resultados.html")){
		muestraResultados();
	}
	else{
		nextLvl();
	}
    function nextLvl(){
    	timer0 = new Date() / 1000;
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
	     			timer1 = new Date() / 1000;
	     			tiempos[lvl] = (timer1 - timer0).toFixed(2);
		     		if(formas.length-1 > lvl){
		     			$( "#dialog-confirm" ).dialog({
					      resizable: false,
					      height: "auto",
					      width: 400,
					      modal: true,
					      buttons: {
						        "Siguiente nivel": function() {
						          $( this ).dialog( "close" );
						          nextLvl();
						          $("#modalError").hide();
						        },
						        Salir: function() {
						          $( this ).dialog( "close" );
						        }
				    		}
				  		}).prev(".ui-dialog-titlebar").css("color","green");
		     		}
		     		else{
		     			$("#dialog-confirm").dialog({
		     				resizable: false,
					      	height: "auto",
						    width: 400,
						    modal: true,
						    buttons: {
						    	"Mostrar resultados": function(){
						    		$(this).dialog("close");
						    		document.cookie = "fallos="+JSON.stringify(fallos);
						    		document.cookie = "tiempos="+JSON.stringify(tiempos);
						    		window.location.href = "resultados.html";
						    	},
						    	Salir: function(){
						    		$(this).dialog("close");
						    	}
						    }
		     			}).prev(".ui-dialog-titlebar").css("color","green");
		     		}
		    	}
	     		else{
	     			$(ui.draggable).draggable({ revert: true});
	     			$("#modalError").show();
	     			fallos[lvl]++;

	     		}
	     	}
	    });
    }


    function muestraResultados(){
    	if(getCookie("fallos") != "" && getCookie("tiempos") != ""){
	    	let fails = JSON.parse(getCookie("fallos"));
	    	let times = JSON.parse(getCookie("tiempos"));
	    	console.log(fails);
	    	for(let i = 0; i < fails.length; i++)
	    	{
	    		
	    		$("#result-table").append("<tr><td>"+(i+1)+"</td><td>"+fails[i]+"</td><td>"+times[i]+"</td></tr>");
	    	}
	    	deleteCookie("fallos");
	    	deleteCookie("tiempos");
	    }
    }

    function getCookie(cname) {
	  var name = cname + "=";
	  var decodedCookie = decodeURIComponent(document.cookie);
	  var ca = decodedCookie.split(';');
	  for(var i = 0; i <ca.length; i++) {
	    var c = ca[i];
	    while (c.charAt(0) == ' ') {
	      c = c.substring(1);
	    }
	    if (c.indexOf(name) == 0) {
	      return c.substring(name.length, c.length);
	    }
	  }
	  return "";
	}
	function deleteCookie( name ) {
	  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	}
	$("#restart").click(function(){
		window.location.href = "index1.html";
	})
});

