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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Sunday", "Monday", "Tuesday"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
    <div class="bottom-today col-2">
        <div class="forecast-date">${day}</div>
        <img src="https://openweathermap.org/img/wn/10d@2x.png" alt="todays degrees" width="50px"/>
    

    <div class="degrees-row row">
      <div class="today-degrees col-2"><span class="high">26° </span>  <span class="low">10°</span></div>
  </div>
    </div>
      `;
  });
  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  //the "city" is the h1 from HTML.

  let celciusTemperature = response.data.main.temp;

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
  search(city);
}

let form = document.querySelector("#search-bar");
form.addEventListener("submit", searchProcess);

function showLocation(position) {
  let apiKey = "206b71039aae70f39d86f06e91e5ecf7";
  //above(.value) means that he value of that searchbar will be the variable

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

function farenheitConversion(event) {
  event.preventDefault();
  let farenheitOutput = (celciusTemperature * 9) / 5 + 32;
  let currentTemperature = document.querySelector("#daily-degree");
  currentTemperature.innerHTML = Math.round(farenheitOutput);
}
function celciusConversion(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#daily-degree");
  currentTemperature.innerHTML = Math.round(celciusTemperature);
}

let celciusTemperature = null;

let farenheitButton = document.querySelector("#farenheit-link");
farenheitButton.addEventListener("click", farenheitConversion);

let celciusButton = document.querySelector("#celcius-link");
celciusButton.addEventListener("click", celciusConversion);

displayForecast();
search("Belfast");
