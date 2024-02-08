var todayForecastContainer = document.querySelector(".todayForcast");
var fiveDayForcast = document.querySelector(".fiveDayForcast");
var citySearch = document.getElementById("city");
var searchButton = document.querySelector(".btn");
var displayLocations = document.querySelector("#locations-container");
var dateJ = dayjs().format("MMM DD, YYYY");
let search = citySearch.value;
let history = document.querySelector(".history");
let cityEl = document.createElement("h2");
let dateEl = document.createElement("h3");
let tempEl = document.createElement("li");
let windEl = document.createElement("li");
let humEl = document.createElement("li");

// let dateEle = document.createElement("p");
// let tempe = document.createElement("p");
// let windEle = document.createElement("p");
// let humidi = document.createElement("p");

var getDataWeather = function (lat, lon) {
  var apiUrl =
    "http://api.openweathermap.org/data/2.5/forecast?lat=" +
    lat +
    "&lon=" +
    lon +
    "&units=metric&appid=b99fa940a9ff0f4458e80ba9b4be202d";
  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      displayTodayData(data, data.list);

      displayForcastData(data.list);
    })
    .catch(function (error) {
      alert("Unable to connect");
    });
};

var displayTodayData = function (data) {
  let historyEl = document.createElement("a");

  cityEl.textContent = data.city.name;
  dateEl.textContent = dateJ;

  tempEl.textContent = "Temp: " + data.list[0].main.temp + " °C";
  tempEl.style.listStyleType = "none";

  windEl.textContent = "Wind: " + data.list[0].wind.speed + " Km/Hra";
  windEl.style.listStyleType = "none";

  humEl.textContent = "humidity: " + data.list[0].main.humidity + "%";
  humEl.style.listStyleType = "none";

  historyEl.textContent = data.city.name;
  // historyEl.setAttribute('href')

  todayForecastContainer.append(cityEl);
  todayForecastContainer.append(dateEl);
  todayForecastContainer.append(tempEl);
  todayForecastContainer.append(windEl);
  todayForecastContainer.append(humEl);

  history.append(historyEl);
};

var displayForcastData = function (data) {
  fiveDayForcast.innerHTML =" "
  for (var i = 6; i < data.length; i += 8) {
    // console.log(data[i]);
    // console.log(data[i].dt_txt);

    var dateHour = data[i].dt_txt;
    var date = dateHour.split(" "[0]);

    let newDiv = document.createElement("div");
    newDiv.classList = "card text-nowrap";

    let dateEle = document.createElement("p");
    newDiv.appendChild(dateEle);

    let tempe = document.createElement("p");
    newDiv.append(tempe);

    let windEle = document.createElement("p");
    newDiv.append(windEle);

    let humidi = document.createElement("p");
    newDiv.append(humidi);

    tempe.textContent = "Temp: " + data[i].main.temp + " °C";
    windEle.textContent = "Wind: " + data[i].wind.speed + " Km/Hra";
    humidi.textContent = "humidity: " + data[i].main.humidity + "%";

    dateEle.textContent = date[0];

    fiveDayForcast.appendChild(newDiv);
  }
};

var getGeoLocation = function (search) {
  var apiUrl =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    search +
    "&limit=1&appid=b99fa940a9ff0f4458e80ba9b4be202d";

  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var lat = data[0].lat;
      var lon = data[0].lon;
      getDataWeather(lat, lon);
    })
    .catch(function (error) {
      alert("Unable to connect");
    });
};

searchButton.addEventListener("click", function (event) {
  event.preventDefault();
  search = citySearch.value.trim();
  getGeoLocation(search);
  citySearch.value = " ";
});
