const weatherContent = document.getElementById("weather-content");
const selectHour = document.getElementById("select-hour");

function success(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=40548cc5b12a46ee9418e263dd707583&units=metric`;

  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
      renderWeather(data);
      selectHour.addEventListener("change", (e) => {
        const selectedHour = parseInt(e.target.value);
        renderHourlyForecast(data, selectedHour);
      });
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
}

function error() {
  console.error("Unable to retrieve your location");
}

navigator.geolocation.getCurrentPosition(success, error);

function renderWeather(data) {
  const currentWeather = data.current;
  weatherContent.innerHTML = `  
  <img src="https://openweathermap.org/img/wn/${
    currentWeather.weather[0].icon
  }@4x.png" alt=${currentWeather.weather[0].description} id=weather-image/>
<p><b>Current temperature: </b> ${Math.round(
    currentWeather.temp
  )}°C / ${Math.round(currentWeather.temp * 1.8 + 32)}°F</p>
<p><b>Feels like: </b> ${Math.round(
    currentWeather.feels_like
  )}°C / ${Math.round(currentWeather.feels_like * 1.8 + 32)}°F</p>
<p><b>Description: </b> ${currentWeather.weather[0].description}</p>
`;
}

function renderHourlyForecast(data, selectedHour) {
  const selectedHourForecast = data.hourly[selectedHour];
  weatherContent.innerHTML = `<img src="https://openweathermap.org/img/wn/${
    selectedHourForecast.weather[0].icon
  }@4x.png" alt=${
    selectedHourForecast.weather[0].description
  } id=weather-image/>
      <p><b>Temperature in ${selectedHour} hours:</b> ${Math.round(
    selectedHourForecast.temp
  )}°C / ${Math.round(selectedHourForecast.temp * 1.8 + 32)}°F</p>
    <p><b>Feels like: </b> ${Math.round(
      selectedHourForecast.feels_like
    )}°C / ${Math.round(selectedHourForecast.feels_like * 1.8 + 32)}°F</p>
      <p><b>Description:</b> ${selectedHourForecast.weather[0].description}</p>
      `;
}
