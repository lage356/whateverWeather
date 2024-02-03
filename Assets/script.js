var city = document.querySelector('.city');
var date = document.querySelector('.date');
var citySearch = document.getElementById('city');
var searchButton = document.querySelector('.btn');
var displayLocations = document.querySelector('#locations-container');
var dateJ = dayjs();
let search =citySearch.value;

date.textContent = dateJ;

var getRepoDataWeather = function (lati, long){

     lati = String(lati);
     long = String(long);

     console.log(lati)

    
    var apiUrl = 'http://api.openweathermap.org/data/2.5/forecast?lat='+ lati +'&lon='+ long +'&appid=b99fa940a9ff0f4458e80ba9b4be202d&units';
    fetch(apiUrl)
    .then(function(response){
        if(response.ok){
            
            response.json().then(function(data){
                console.log(data);
            });
        } else {
            alert("Error" + response.statusText)
        }
        
        
    });
};

var getGeoLocation = function(search) {
    
    var apiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + search + '&limit=5&appid=b99fa940a9ff0f4458e80ba9b4be202d'

    fetch(apiUrl)
    .then (function(response){
        if (response.ok){
            console.log(response);
            response.json().then(function(data){
                console.log(data);
                saveLocations(data);
            });
        } else {
            alert("Error" + response.statusText);
        }
    })
   .catch(function (error){
    alert('Unable to connect')

    });
    
};

var saveLocations = function (locations){
 

    for (var i=0; i<locations.length; i++){

        var lat = locations[i].lat;
        var lon = locations[i].lon

        var lati = parseFloat(lat);
        var long = parseFloat(lon);

        console.log(lati, long);
        getRepoDataWeather(lati,long);
    }
    

}


$( ".btn" ).on( "click", function( event ) {
    event.preventDefault();
    let search = citySearch.value.trim();
    getGeoLocation(search);
    
    // alert( "Handler for `submit` called." );
   
  });


