var resultContentEl= document.querySelector("#result-content")

function loadData(){
   var  parameters =  document.location.search
   console.log(parameters);
   qSearchTermValue=parameters.trim().replace("?q=","")
   console.log(qSearchTermValue)

   loadApi(qSearchTermValue)
}

loadData()

function loadApi(qSearchTermValue){


    var locQueryUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+qSearchTermValue+'&APPID=f48c044c914b169326af2c0881fb64da'
    console.log(locQueryUrl);
   
    fetch(locQueryUrl)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data);
        console.log(data.name);
        console.log(data.main.temp);
        console.log(data.weather[0].description);

    })
}
