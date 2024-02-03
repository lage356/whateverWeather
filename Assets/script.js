var city = document.querySelector('.city');
var date = document.querySelector('.date');
var citySearch = document.getElementById('city');
var searchButton = document.querySelector('.btn');
var displayLocations = document.querySelector('#locations-container');
var dateJ = dayjs();
let search =citySearch.value;

date.textContent = dateJ;

var getRepoDataWeather = function (lat, lon){



    
    var apiUrl = 'http://api.openweathermap.org/data/2.5/forecast?lat='+ lat +'&lon='+ lon +'&appid=b99fa940a9ff0f4458e80ba9b4be202d';
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
                console.log(data[0].lat, data[0].lon);
                var lat = data[0].lat;
                var lon = data[0].lon;
                getRepoDataWeather(lat,lon);
            });
        } else {
            alert("Error" + response.statusText);
        }
    })
   .catch(function (error){
    alert('Unable to connect')

    });
    
};

// var saveLocations = function (locations){
 

//     for (var i=0; i<locations.length; i++){



//         var lati = parseFloat(lat);
//         var long = parseFloat(lon);

//         console.log(lati, long);
//         getRepoDataWeather(lati,long);
//     }
    

// }


$( ".btn" ).on( "click", function( event ) {
    event.preventDefault();
    let search = citySearch.value.trim();
    getGeoLocation(search);
    
    // alert( "Handler for `submit` called." );
   
  });


