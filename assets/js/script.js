var searchFormEl= document.querySelector("#search-form")
var cityName = document.querySelector("#search-input")
var resultContentEl = document.querySelector("#result-text")
var forecastContentEl = document.querySelector("#forecast-text")
var historyEl = document.querySelector("#history");
var now = dayjs().format("dddd, MMMM D, YYYY [at] hh:mm:ss A");
var searchHistory = [];

//Reads Value from Form and creats SearchTerm
var handleForm = function(event){
      event.preventDefault();
      $('#search-bar').addClass('align-start align-stretch-md align-content-start align-content-stretch-md').removeClass('align-center justify-center')
      $('#search-bar2').addClass('col-md-3 p-3').removeClass('col-md-9 flex-column align-center p-5')
      $('div:hidden').show("fast");
      searchTerm = cityName.value;
      findSearchTerm(searchTerm);
}

//Looks for SearchTerm and convert to Lat & Lon to pass thru OpenWeather API One Call
function findSearchTerm(searchTerm){
      forecastContentEl.innerHTML = ''; //Clears Previous Forecast Results
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
                <div class="card current mb-3 p-3">
                  <div class="card-body">
                    <h1 class= "border-light border-2 border rounded-pill ml-5 mr-5">${ searchTerm } </h3>
                      <h5 class="current-muted">${now}</h2>
                      <p><strong>Temperature:</strong> <br>
                      Current: ${data.current.temp.toFixed(1)} °F <br>
                      Morning: ${data.daily[0].temp.day.toFixed(1)} °F <br>
                      Day: ${data.daily[0].temp.day.toFixed(1)} °F <br>
                      Night: ${data.daily[0].temp.night.toFixed(1)} °F <br>
                      <strong>Wind:</strong> ${data.current.wind_speed.toFixed(1)} mph <br>
                      <strong>Humidity:</strong> ${data.current.humidity} <br>
                      <strong>UV Index:</strong> ${data.current.uvi} <br>
                      <img src="http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png" alt="${data.current.weather[0].description}" class="img-container border border-dark rounded-circle">
                  </div>
                </div>
              `}
            
            //Renders the 5 Day Forecast
            for (let i = 0; i < 5; i++) {
              forecastContentEl.innerHTML = forecastContentEl.innerHTML+`  
              <div class="col-lg-2 col-md-12 card-background border border-dark mx-auto overflow-hidden m-3 p-3">
                  <div class="card-body text-center">
                    <h3>${ dayjs().add( i+1, 'day').format('MMM') } </h3> <h4 class="text-muted">${ dayjs().add( i+1, 'day').format('MM/DD') } </h4>
                      <p><strong>Temps:</strong><br> 
                        Morning: ${data.daily[i].temp.morn.toFixed(1)} °F <br>
                        Day: ${data.daily[i].temp.day.toFixed(1)} °F <br>
                        Night: ${data.daily[i].temp.night.toFixed(1)} °F <br>
                      <strong>Wind:</strong> ${data.daily[i].wind_speed.toFixed(1)} mph <br>
                      <strong>Humidity:</strong> ${data.daily[i].humidity} <br>
                      <strong>UV Index:</strong> ${data.daily[i].uvi} <br>
                      <img src="http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png" alt="${data.daily[i].weather[0].description}" class="img-container border border-dark rounded-circle">
                  </div>
                </div>
              `}
          })
      });
}

//Displays Search History on Page
function renderSearchHistory() {
  historyEl.innerHTML = ""
  for (let i = 0; i < searchHistory.length; i++) {
    historyEl.innerHTML = historyEl.innerHTML+`  
      <div>
        <div class="card-body">
          <button name="searchHist" id="search-history" data-id="${searchHistory[i]}"class="btn btn-custom2 btn-block">${searchHistory[i]}</button>
        </div>
      </div>
    `
  }
  $(document).ready(function() {
    $('.btn-history').on('click', searchHistRender)
  })
}

//Clears the History Displayed and the localStroage of the Search History
document.querySelector('#clear-history').addEventListener("click",function() {
  searchHistory = [];
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  historyEl.innerHTML = "";
})

//Gets the localStorage
function getStorage() {
  var myStorage = JSON.parse(localStorage.getItem('searchHistory'));
  console.log(myStorage);
  if (myStorage) {
    for (var i=0; i < myStorage.length; i++)
    searchHistory.push(myStorage[i]);
  console.log(searchHistory)
  initialize();
  }
}

//Initializes Page
function initialize() {
  if (searchHistory.length > 0) {
    $('#search-bar').addClass('align-start align-stretch-md align-content-start align-content-stretch-md').removeClass('align-center justify-center')
    $('#search-bar2').addClass('col-md-3 p-3').removeClass('col-md-9 flex-column align-center p-5')
    $('div:hidden').show("fast");
    var searchTerm = searchHistory[searchHistory.length - 1];
    console.log(searchTerm);
    findSearchTerm(searchTerm);
    renderSearchHistory();
  }
}

//Retrieves Storage on Page Load
getStorage();

//Renders Search Histories
function searchHistRender(event) {
  event.preventDefault();
  searchTerm = $(this).attr('data-id');
  findSearchTerm(searchTerm);
}

//Event Listeners
searchFormEl.addEventListener("submit", handleForm)
searchFormEl.addEventListener("submit", renderSearchHistory)
