$(document).ready(function(){

	var correcto = Math.floor(Math.random()*(11-1)+1),
		array =[correcto];

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

	}
	console.log(array);



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


	$(".correcto").click(function(){
		console.log("acierto");
	});

});