var searchFormEl= document.querySelector("#search-form")

var searchInputEl= document.querySelector("#search-input")

var handleForm = function(event){
      event.preventDefault();
      searchTerm = searchInputEl.value;
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
        var urlOneCall = 'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&APPID=f48c044c914b169326af2c0881fb64da'
          fetch(urlOneCall)
            .then(function (response) {
            return response.json();
            })
            .then(function (data) {
            console.log(data);
          })
      });
}
searchFormEl.addEventListener("submit", handleForm)

