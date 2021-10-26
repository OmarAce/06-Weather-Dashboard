var searchFormEl= document.querySelector("#search-form")

var cityName = document.querySelector("#search-input")

var resultContentEl = document.querySelector("#result-text")

var forecastContentEl = document.querySelector("#forecast-text")

var historyEl = document.querySelector("#history");

var searchHistory = [];

var handleForm = function(event){
      event.preventDefault();
      $('#search-bar').addClass('align-start align-stretch-md align-content-start align-content-stretch-md').removeClass('align-center justify-center')
      $('#search-bar2').addClass('col-md-3 p-3').removeClass('col-md-9 flex-column align-center p-5')
      $('div:hidden').show("fast");
      forecastContentEl.innerHTML = ''; //Clears Previous Forecast Results
      searchTerm = cityName.value;
      searchHistory.push(searchTerm);
      console.log(searchHistory);
      localStorage.setItem['searchHistory', JSON.stringify(searchHistory)];
      console.log(searchTerm);
      var urlRequest = 'https://api.openweathermap.org/data/2.5/weather?q='+searchTerm+'&APPID=f48c044c914b169326af2c0881fb64da'
      fetch(urlRequest)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        var lat = data.coord.lat;
        var lon = data.coord.lon;
        console.log(lat);
        console.log(lon);
        var urlOneCall = 'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&units=imperial&APPID=f48c044c914b169326af2c0881fb64da'
          fetch(urlOneCall)
            .then(function (response) {
            return response.json();
            })
            .then(function (data) {
            console.log(data);
            const currentDate = data.current.dt*1000
            const dateObject = new Date(currentDate);
            const humanDate = dateObject.toLocaleString()
              
            for (let i = 0; i < 1; i++) {
                resultContentEl.innerHTML = `
                <div class="card bg-light text-dark mb-3 p-3">
                  <div class="card-body">
                    <h3>${ cityName.value +' '+humanDate } </h3>
                      <p><strong>Temperature:</strong> ${data.current.temp} °F <br>
                      <strong>Wind:</strong> ${data.current.wind_speed} mph <br>
                      <strong>Humidity:</strong> ${data.current.humidity} <br>
                      <strong>UV Index:</strong> ${data.current.uvi} <br>
                      <strong>Weather Conditions:</strong> ${data.current.weather[0].main}</p>
                  </div>
                </div>
              `}
            
            for (let i = 0; i < 5; i++) {
              forecastContentEl.innerHTML = forecastContentEl.innerHTML+`  
              <div class="col-2 bg-light text-dark">
                  <div class="card-body">
                    <h3>${ ' Day '+ (i+1) } </h3>
                      <p><strong>Temperature:</strong><br> 
                        Morning: ${data.daily[i].temp.morn} °F <br>
                        Day: ${data.daily[i].temp.day} °F <br>
                        Night: ${data.daily[i].temp.night} °F <br>
                      <strong>Wind:</strong> ${data.daily[i].wind_speed} mph <br>
                      <strong>Humidity:</strong> ${data.daily[i].humidity} <br>
                      <strong>UV Index:</strong> ${data.daily[i].uvi} <br>
                      <strong>Weather Conditions:</strong> ${data.daily[i].weather[0].main}</p>
                  </div>
                </div>
              `}
          })
      });
}

function renderSearchHistory() {
  historyEl.innerHTML = ""
  for (let i = 0; i < searchHistory.length; i++) {
    historyEl.innerHTML = historyEl.innerHTML+`  
      <div class="card bg-light text-dark mb-3 p-3">
        <div class="card-body">
          <input id="search-input" type="submit" value="${searchHistory[i]}"class="btn btn-info btn-block"></button>
        </div>
      </div>
    `}
}

document.querySelector('#clear-history').addEventListener("click",function() {
  searchHistory = [];
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  historyEl.innerHTML = "";
})



searchFormEl.addEventListener("submit", handleForm)
searchFormEl.addEventListener("submit", renderSearchHistory)

