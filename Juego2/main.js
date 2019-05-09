$(document).ready(function(){

	var correcto = Math.floor(Math.random()*(11-1)+1),
		array =[correcto],
		fallos = 0,
		timer0 = new Date() / 1000;

	if(window.location.href.endsWith("resultados.html")){
		muestraResultados();
	}else{
		juego();
	}
	function juego(){
		for(let i = 0; i < correcto; i++){
			$("#grass").append('<img src="resources/manzana.png" class="manzana" id="'+i+'">');
			$("#"+i).css("top", Math.floor(Math.random()*(100-1)+1)).css("left", Math.floor(Math.random()*(1152-1)+1));
		}
		for(let i = 0; i < 3; i++)
			array.push(elegir());


		array = array.sort(function() {return Math.random() - 0.5});
		for(let i = 0; i < array.length; i++){
			$(".number-container").append("<button id='"+i+"'>"+array[i]+"</button>");
			if(array[i] == correcto){
				$("#"+i).addClass("correcto");
			}
			else{
				$("#"+i).addClass("incorrecto");
			}

		}



		function elegir(){
			let repe = false, aleatorio = Math.floor(Math.random()*(11-1)+1);
			for(let j = 0; j < array.length; j++){
				if(array[j] == aleatorio){
					repe = true;
					break;
				}
			}
			if(repe){
				aleatorio = elegir();
			}
			return aleatorio;
		}

		responsiveVoice.speak("¿Cúantas manzanas hay en el suelo?", "Spanish Female", {rate: 0.75});



		$(".correcto").click(function(){
			console.log("acierto");
			responsiveVoice.speak("¡Enhorabuena, has acertado!", "Spanish Female", {rate: 0.75});
			let timer1 = new Date() / 1000;

			document.cookie = "fallo="+JSON.stringify(fallos);
			document.cookie = "tiempo="+JSON.stringify((timer1 - timer0).toFixed(2));
			window.location.href = "resultados.html";

		});
		$(".incorrecto").click(function(){
			fallos++;
		});
	}

	 function muestraResultados(){
    	if(getCookie("fallo") != "" && getCookie("tiempo") != ""){
	    	let fails = JSON.parse(getCookie("fallo"));
	    	let time = JSON.parse(getCookie("tiempo"));
	    	$("#result-table").append("</td><td>"+fails+"</td><td>"+time+"</td></tr>");
	    	deleteCookie("fallo");
	    	deleteCookie("tiempo");
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
		window.location.href = "index.html";
	})

});