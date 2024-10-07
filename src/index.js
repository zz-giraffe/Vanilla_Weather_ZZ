function displayWeather(response) {
    let temperatureElement = document.querySelector("#weather-info-temp");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    console.log(response.data);


    cityElement.innerHTML = response.data.city;
    temperatureElement.innerHTML = Math.round(response.data.temperature.current) + "°C";
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = response.data.temperature.humidity + "%";
    timeElement.innerHTML = formatDate(date);
   
}

function formatDate(date) {

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let day = days[date.getDay()];
   
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${day} ${hours}:${minutes}`;
  }


function searchCity(city) {
    let apiKey = "94d121f098445o8atf8a44f43b39f729";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
    axios.get(apiUrl).then(displayWeather);
  }
  

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-box-input");
  
  searchCity(searchInput.value);
}

function displayForecast(){

  let days = ["Tue","Wed","Thu","Fri","Sat"];
  let forecastHtml = "";

  days.forEach(function(day){
    forecastHtml = 
      forecastHtml + 
      `
      <div class="forecast-day">
        <div class="forecast-date">${day}</div>
        <div class="forecast-icon">🌞⛅️ </div>
        <div class="forecast-temp">8-30°C</div>
      </div>
      
      `;

  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-box");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Singapore");
displayForecast();



