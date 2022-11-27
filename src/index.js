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

function showTemperature(response) {
  console.log(response.data);
  document.querySelector("#today-temp").innerHTML = `${Math.round(
    response.data.main.temp
  )}°F`;
  document.querySelector("#weather-type").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#new-city").innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function submitCity(event) {
  event.preventDefault();

  let apiKey = "7d478f69e1b2f5d563653f13f5f91d76";
  let tempCity = document.querySelector("#changed-city").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${tempCity}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(showTemperature);
}

function showCurrentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "7d478f69e1b2f5d563653f13f5f91d76";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemperature);
}

function changeCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}

let now = new Date();
let changeDate = document.querySelector(".day-details");
changeDate.innerHTML = formatDate(now);

let enterCity = document.querySelector("#searched-city");
enterCity.addEventListener("submit", submitCity);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", changeCurrentLocation);
