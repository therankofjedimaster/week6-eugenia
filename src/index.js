let now = new Date();

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let dayTime = document.querySelector("h2");
dayTime.innerHTML = `${days[now.getDay()]}
 ${now.getDate()} ${months[now.getMonth()]}, ${hours} : ${minutes}`;

function searchCity(city) {
  let apiKey = "b6f13b15bc39c8fd600adbc9db22e8c9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentWeather);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  searchCity(city);
}
let searchBar = document.querySelector("#search");
searchBar.addEventListener("submit", handleSubmit);

function showTemperature(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.name}`;
  let temperature = Math.round(response.data.main.temp);
  let weather = document.querySelector(".temp");
  weather.innerHTML = `${temperature}°C`;
}

function displayCurrentWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}

let getCurrentWeather = document.querySelector(".currentLocation");
getCurrentWeather.addEventListener("click", displayCurrentWeather);

function currentWeather(response) {
  let weather = document.querySelector(".temp");
  weather.innerHTML = ` ${Math.round(response.data.main.temp)}°C`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
  showTemperature(response);
  let emoji = document.querySelector(".emoji");
  emoji.innerHTML = `${response.data.weather[0].main},`;
  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}% | `;
  let wind = document.querySelector(".wind");
  wind.innerHTML = `Wind Speed: ${Math.round(
    response.data.wind.speed
  )} km/h | `;
  let pressure = document.querySelector(".pressure");
  pressure.innerHTML = `Pressure:${Math.round(
    response.data.main.pressure
  )} hPa`;
}

function getLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = `b6f13b15bc39c8fd600adbc9db22e8c9`;
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(weatherUrl).then(currentWeather);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temp");
  temperatureElement.innerHTML = 66;
  let temperatureUnit = document.querySelector(".unit");
  temperatureUnit.innerHTML = "°F";
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temp");
  temperatureElement.innerHTML = 19;
  let temperatureUnit = document.querySelector(".unit");
  temperatureUnit.innerHTML = "°C";
}

let fahrenheitTemp = document.querySelector(".fahrenheit");
fahrenheitTemp.addEventListener("click", convertToFahrenheit);

let celsiusTemp = document.querySelector(".celsius");
celsiusTemp.addEventListener("click", convertToCelsius);
