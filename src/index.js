function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
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
    "December",
  ];

  let currentYear = date.getFullYear();
  let currentDay = days[date.getDay()];
  let currentMonth = months[date.getMonth()];
  let currentDate = date.getDate();
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinute = date.getMinutes();
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }

  let formattedDate = `${currentDay}, ${currentMonth} ${currentDate}, ${currentYear} at ${currentHour}:${currentMinute}`;
  return formattedDate;
}

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = "";

  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `<span class="forecast-icon">
                    <img src="${forecastDay.condition.icon_url}"
                      alt="broken clouds" width="75"/>
                  </span>
                    <h5 id="forecast-day">${formatForecastDay(
                      forecastDay.time
                    )}</h5>
                    <p class="forecast-high-low">
                    H: <span id="forecast-weather-max">${Math.round(
                      forecastDay.temperature.maximum
                    )}</span>
                    °F / L: 
                    <span id="forecast-weather-min">${Math.round(
                      forecastDay.temperature.minimum
                    )}</span>°F
                    </p>`;
    }
  });

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "8b407b8c3ba194fotf93ec175a751a7b";

  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&key=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  document.querySelector("#new-city").innerHTML = response.data.city;
  document.querySelector("#today-temp").innerHTML = Math.round(
    response.data.temperature.current
  );
  document.querySelector("#weather-type").innerHTML =
    response.data.condition.description;
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.temperature.humidity
  );
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document
    .querySelector("#icon")
    .setAttribute("src", response.data.condition.icon_url);
  fahrenheitTemperature = response.data.temperature.current;

  getForecast(response.data.coordinates);
}

function submitCity(event) {
  event.preventDefault();

  let apiKey = "8b407b8c3ba194fotf93ec175a751a7b";
  let tempCity = document.querySelector("#changed-city").value;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${tempCity}&key=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(showTemperature);
}

function showCurrentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "8b407b8c3ba194fotf93ec175a751a7b";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemperature);
}

function changeCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  let celsiusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
  document.querySelector("#today-temp").innerHTML =
    Math.round(celsiusTemperature);
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  document.querySelector("#today-temp").innerHTML = Math.round(
    fahrenheitTemperature
  );
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function search(city) {
  let apiKey = "8b407b8c3ba194fotf93ec175a751a7b";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(showTemperature);
}

let fahrenheitTemperature = null;

let now = new Date();
let changeDate = document.querySelector(".day-details");
changeDate.innerHTML = formatDate(now);

let enterCity = document.querySelector("#searched-city");
enterCity.addEventListener("submit", submitCity);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", changeCurrentLocation);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

search("Chicago");
