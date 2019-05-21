$(document).ready(function(){
	var nivel = 1;
	var max = 20, min = 0;
	var fallos = 0;
	var aux1, aux2;
	
	if (nivel==1) {
		max = 20;
		min = 1;
	}
	else if (nivel==2) {
		max = -1;
		min = -20;
	}
	else if (nivel==3) {
		max = 20;
		min = -20;
	}
	else{
		nivel = 1;
	}
	$('h2').html("Nivel "+nivel);
	ordenarNumeros(max, min);

	function ordenarNumeros(max, min){
		console.log(max);
		console.log(min);
		var html = '';
		var num;
		var dif = [];
		var mete = true;

		for(let i=0;i<5;i++){
			num = Math.floor(Math.random() * (max - (min))) + (min);
			mete = true;
			for(let j=0;j<dif.length;j++){
				if(dif[j]==num){
					mete = false;
					i--;
				}
			}
			if(mete){
				dif.push(num);
				html += '<li class="tab ui-state-default" tabIndex="'+(i+1)+'">'+ num +'</li>';
			}
		}

		$("#sortable").sortable({
		  placeholder: "ui-state-highlight"
		}).html(html).disableSelection();
		
		
		$("#terminar").click(function(){
			let orden = [];
			let termina = true;
			
			$('#sortable>li').each(function(index, item){
				orden[index] = parseInt($(item).text());
			});

			for(let i=0;i<orden.length-1;i++){
				for(let j=i+1;j<orden.length;j++){
					if(orden[i]>orden[j]){
						termina = false;
					}
				}
			}

			if(termina){
				$('#resultado').html("<h2>Muy Bien!!!</h2>");

				$( "#dialog-confirm" ).dialog({
				    resizable: false,
				    height: "auto",
				    width: 400,
				    modal: true,
				    buttons: [
				    	{
				        text: "Siguiente nivel",
				        click: function() {
				        	$('#resultado').html("");
				        	
				        	nivel++;
							if (nivel==1) {
								max = 20;
								min = 1;
							}
							else if (nivel==2) {
								max = -1;
								min = -20;
							}
							else if (nivel==3) {
								max = 20;
								min = -20;
							}
							else{
								nivel = 1;
								max = 20;
								min = 1;
							}

							$('h2').html("Nivel "+nivel);
							ordenarNumeros(max,min);

				        	$( this ).dialog( "close" );
				        }
				        }
			    	]
			    });
			}
			else{
				$('#resultado').html("<h2>Vuelve a intentarlo</h2>");

				fallos++;
				console.log(fallos);
			}
		});
	}

var entra = true;
	
	$('.tab').keypress(function(e) {
     	if(e.which == 13) {
	     	e.preventDefault();
	     	if(entra==true){
		     	aux1 = $(this).text();
		        

		        entra = false;
	        }
	        else{
		     	aux2 = $(this).html();
		     	
		   		$('#sortable>li').each(function(){
		   			if ($(this).text()==aux1) {
		   				$(this).html(aux2);
		   				console.log("eeee");
		   			}
		   			
		   		});
		   		$(this).html(aux1);
		   		
		     	entra = true;
	  		}
     	}
 	});
	     	
});   