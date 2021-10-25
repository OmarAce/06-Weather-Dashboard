var searchFormEl= document.querySelector("#search-form")

var cityName = document.querySelector("#search-input")

var resultContentEl = document.querySelector("#result-text")

var handleForm = function(event){
      event.preventDefault();
      searchTerm = cityName.value;
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
                resultContentEl.innerHTML = resultContentEl.innerHTML+`
                <div class="card bg-light text-dark mb-3 p-3">
                  <div class="card-body">
                    <h3>${ cityName.value +' '+humanDate } </h3>
                      <p><strong>Temperature:</strong>${data.current.temp} °F <br>
                      <strong>Wind:</strong>${data.current.wind_speed} mph <br>
                      <strong>Humidity:</strong>${data.current.humidity} <br>
                      <strong>UV Index:</strong>${data.current.uvi}</p>
                  </div>
                </div>
              `}
            })
      });
}
searchFormEl.addEventListener("submit", handleForm)

