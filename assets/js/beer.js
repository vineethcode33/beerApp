var pageCounter = 1;
var urlRequest = 'https://api.punkapi.com/v2/beers?page='+pageCounter+'&per_page=24';

// make requests
function requestPunk(writeDiv, urlRequest){
$.ajax({
  url: urlRequest,
  data: '',
  success: function (data){
  	writeDiv(data);
  }
});
}

// write results to html
function writeDiv(data){
	console.log(data);
	if (data.length != 0){
	$('.container').empty();
	$.each( data, function(index,value){
		writeBeer(value);
	});}
	else{
		window.alert('Thats all I can give you! Bye Now.');
	}
	// button effects
	if (pageCounter <= 1){
		$('.nxt').fadeIn('0.3s');
		$('.prev').fadeOut('0.3s');
	} else if (pageCounter >= 10){
		$('.nxt').fadeOut('0.3s');
		$('.prev').fadeIn('0.3s');
	} else{
		$('.nxt').fadeIn('0.3s');
		$('.prev').fadeIn('0.3s');
	}
	}

function writeBeer(beerData){
	var sendData = "<div class='beer'>";
	sendData +="<img class ='beer-img' src='"+beerData.image_url+"'>";
	sendData +="<ul><li>Name: <span class='apiData'>"+ beerData.name+"</span></li>";
	sendData +="<li>TagLine: <span class='apiData'>"+ beerData.tagline+"</span></li>";
	sendData +="<li>First Brewed: <span class='apiData'>"+ beerData.first_brewed+"</span></li>";
	sendData +="<li>ABV: <span class='apiData'>"+ beerData.abv+"</span></li></ul></div>";

	$('.container').append(sendData);
}

requestPunk(writeDiv, urlRequest);

$("button").on('click', function(event){
	var clickedBtn =$(this).text();
	if (clickedBtn ==='Previous' && pageCounter>1){
		pageCounter -=1;
		urlRequest = 'https://api.punkapi.com/v2/beers?page='+pageCounter+'&per_page=24';
		requestPunk(writeDiv,urlRequest);
	} else if (clickedBtn ==='Next'){
		pageCounter +=1;
		urlRequest = 'https://api.punkapi.com/v2/beers?page='+pageCounter+'&per_page=24';
		console.log(urlRequest);
		requestPunk(writeDiv, urlRequest);
	};
})