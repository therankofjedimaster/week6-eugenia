function formatDate(timestamp) {
  console.log(timestamp);
  let now = new Date(timestamp);

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
  let day = days[now.getDay()];
  return ` ${day}  ${now.getDate()} ${months[now.getMonth()]}, ${hours} : ${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

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
  console.log("response", response);
  let weather = document.querySelector(".temp");
  weather.innerHTML = ` ${Math.round(response.data.main.temp)}°C`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
  let date = document.querySelector(".date");
  date.innerHTML = formatDate(response.data.dt * 1000);
  showTemperature(response);
  let emoji = document.querySelector(".emoji");
  emoji.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  emoji.setAttribute("alt", response.data.weather[0].description);

  let description = document.querySelector(".description");
  description.innerHTML = `${response.data.weather[0].main},`;
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
  getForecast(response.data.coord);
}

function getLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = `b6f13b15bc39c8fd600adbc9db22e8c9`;
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(weatherUrl).then(currentWeather);
}

function displayForecast(response) {
  console.log("response", response);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector(".forecast");

  let forecastHTML = `<div class="forecast row">`;
  forecast.forEach(function (dayTime, index) {
    if (index < 6) {
      console.log("dayTime", dayTime);
      forecastHTML =
        forecastHTML +
        `    <div class="col-2 text-center">
        <div class="days">${formatDay(dayTime.time)}</div>
        <img
        src="${dayTime.condition.icon_url}"
        alt=""
        width="42"
      />
            <div class="temp-days">
            <span class="maxTemp">${Math.round(
          dayTime.temperature.maximum
        )}°/ </span>
            <span class="minTemp">${Math.round(
          dayTime.temperature.minimum
        )}° </span>
            </div>
          </div>       
          `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "9d4d9c743t460of9a295aebfadb92dcc";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.lon}&lat=${coordinates.lat}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temp");
  celsiusTemp.classList.remove("active");
  fahrenheitTemp.classList.add("active");
  let fahrenheitTemperature = (temperatureElement.innerHTML * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  let temperatureUnit = document.querySelector(".unit");
  temperatureUnit.innerHTML = "°F";
}

function convertToCelsius(event) {
  event.preventDefault();
  celsiusTemp.classList.add("active");
  fahrenheitTemp.classList.remove("active");
  let temperatureElement = document.querySelector(".temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);;
  let temperatureUnit = document.querySelector(".unit");
  temperatureUnit.innerHTML = "°C";
}
let celsiusTemperature = null;

let fahrenheitTemp = document.querySelector(".fahrenheit");
fahrenheitTemp.addEventListener("click", convertToFahrenheit);

let celsiusTemp = document.querySelector(".celsius");
celsiusTemp.addEventListener("click", convertToCelsius);

searchCity("Paris");
