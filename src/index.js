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
let minutes = now.getMinutes();
let currentTimeAndDate = document.querySelector(".current-time-date");
currentTimeAndDate.innerHTML = `${day} ${hour}:${minutes}`;

function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  //the "city" is the h1 from HTML.
  document.querySelector("#daily-degree").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#current-weather-description").innerHTML =
    response.data.weather[0].main;
  //if you console.log the description of the weather, you'll see that it's in an array. Due to this, you got to use an array blocks.
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

search("Belfast");

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
