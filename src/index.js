// Time & Date
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

// Time
function time() {
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

// Date
document.querySelector("#number").innerHTML = now.getDate();
document.querySelector("#day").innerHTML = days[now.getDay()];
document.querySelector("#month").innerHTML = months[now.getMonth()];

// Show Forecast
function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#time").innerHTML = time(response.data.dt * 1000);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed * 3.6
  );
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let temperature = Math.round(response.data.main.temp);
  document.querySelector("#degrees").innerHTML = temperature;

  // Fahrenheit & Celsius
  function fahren(event) {
    event.preventDefault();
    let fahrenheit = Math.round((9 / 5) * temperature + 32);
    document.getElementById("degrees").innerHTML = fahrenheit;
  }

  function cels(event) {
    event.preventDefault();
    let celsius = Math.round(temperature);
    document.getElementById("degrees").innerHTML = celsius;
  }

  let fahrenheitClik = document.getElementById("fahrenheit");
  fahrenheitClik.addEventListener("click", fahren);

  let celsiusClik = document.getElementById("celsius");
  celsiusClik.addEventListener("click", cels);
}

// Search By City Name
function searchCity(city) {
  let apiKey = "0a521eaf234a3a56f45252fac3c737ad";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function form(event) {
  event.preventDefault();
  let cityName = document.querySelector("#enter-city");
  searchCity(cityName.value);
}
let formSearching = document.querySelector("#searching");
formSearching.addEventListener("submit", form);

searchCity("Kyiv");
