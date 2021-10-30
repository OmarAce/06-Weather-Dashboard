var searchFormEl= document.querySelector("#search-form")
var cityName = document.querySelector("#search-input")
var resultContentEl = document.querySelector("#result-text")
var forecastContentEl = document.querySelector("#forecast-text")
var historyEl = document.querySelector("#history");
var now = dayjs().format("dddd, MMMM D, YYYY [at] hh:mm:ss A");
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
      localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
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

            //Renders Current City
            for (let i = 0; i < 1; i++) {
                resultContentEl.innerHTML = `
                <div class="card bg-light text-dark mb-3 p-3">
                  <div class="card-body">
                    <h3>${ cityName.value } </h3>
                      <h5>${now}</h2>
                      <p><strong>Temperature:</strong> ${data.current.temp} °F <br>
                      <strong>Wind:</strong> ${data.current.wind_speed} mph <br>
                      <strong>Humidity:</strong> ${data.current.humidity} <br>
                      <strong>UV Index:</strong> ${data.current.uvi} <br>
                      <img src="http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png" alt="${data.current.weather[0].description}">
                  </div>
                </div>
              `}
            
            //Renders the 5 Day Forecast
            for (let i = 0; i < 5; i++) {
              forecastContentEl.innerHTML = forecastContentEl.innerHTML+`  
              <div class="col-2 bg-light text-dark mx-auto">
                  <div class="card-body">
                    <h3>${ dayjs().add( i-1, 'day').format('MMM MM-DD') } </h3>
                      <p><strong>Temperature:</strong><br> 
                        Morning: ${data.daily[i].temp.morn} °F <br>
                        Day: ${data.daily[i].temp.day} °F <br>
                        Night: ${data.daily[i].temp.night} °F <br>
                      <strong>Wind:</strong> ${data.daily[i].wind_speed} mph <br>
                      <strong>Humidity:</strong> ${data.daily[i].humidity} <br>
                      <strong>UV Index:</strong> ${data.daily[i].uvi} <br>
                      <img src="http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png" alt="${data.daily[i].weather[0].description}">
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
          <button name="searchHist" id="search-history" data-id="${searchHistory[i]}"class="btn btn-history btn-info btn-block">${searchHistory[i]}</button>
        </div>
      </div>
    `
  }
  $(document).ready(function() {
    $('.btn-history').on('click', logThis)
  })
}

document.querySelector('#clear-history').addEventListener("click",function() {
  searchHistory = [];
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  historyEl.innerHTML = "";
})

function getStorage() {
  var myStorage = JSON.parse(localStorage.getItem('searchHistory'));
  console.log(myStorage);
    for (var i=0; i < myStorage.length; i++)
    searchHistory.push(myStorage[i]);
  console.log(searchHistory)
  initialize();
}

function initialize() {
  if (searchHistory.length > 0) {
    var searchTerm = searchHistory[searchHistory.length - 1];
    console.log(searchTerm);
  }
}

getStorage();

function logThis(event) {
  event.preventDefault();
  searchTerm = $(this).attr('data-id');
  console.log(searchTerm);
}

searchFormEl.addEventListener("submit", handleForm)
searchFormEl.addEventListener("submit", renderSearchHistory)
