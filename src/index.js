let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];

let hour = now.getHours();
if (hour < 10) {
  hours = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let currentTimeAndDate = document.querySelector(".current-time-date");
currentTimeAndDate.innerHTML = `${day} ${hour}:${minutes}`;

function getForecast(coordinates) {
  let apiKey1 = "2daf65f0cdaa917f11026e8a128ce271";
  let latitude = coordinates.lat;
  let longitude = coordinates.lon;
  let apiUrl1 = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey1}&units=metric`;
  axios.get(apiUrl1).then(displayForecast);
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="bottom-today col-2">
        <div class="forecast-date">${formatDay(forecastDay.dt * 1000)}</div>
        <img src="https://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png" alt="todays degrees" width="50px"/>
    

    <div class="degrees-row row">
      <span class="today-degrees-max col-2">${Math.round(
        forecastDay.temp.max
      )}°</span>  
      <span class="today-degrees-low">${Math.round(
        forecastDay.temp.min
      )}°</span>
      </div>
  </div>
      `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  //the "city" is the h1 from HTML.

  celciusTemperature = response.data.main.temp;

  document.querySelector("#daily-degree").innerHTML =
    Math.round(celciusTemperature);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#current-weather-description").innerHTML =
    response.data.weather[0].main;
  //if you console.log the description of the weather, you'll see that it's in an array. Due to this, you got to use an array blocks.
  let currentIcon = document.querySelector("#current-icon");

  currentIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "206b71039aae70f39d86f06e91e5ecf7";
  //above(.value) means that he value of that searchbar will be the variable
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function searchProcess(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  //above(.value) means that he value of that searchbar will be the variable

  search(city);
}
let form = document.querySelector("#search-bar");
form.addEventListener("submit", searchProcess);

function showLocation(position) {
  let apiKey = "206b71039aae70f39d86f06e91e5ecf7";

  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurrentCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentCity);

function celciusConversion(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#daily-degree");
  currentTemperature.innerHTML = Math.round(celciusTemperature);
}

let celciusTemperature = null;

search("Belfast");
