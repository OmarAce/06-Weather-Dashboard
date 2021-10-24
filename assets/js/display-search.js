var resultContentEl= document.querySelector("#result-content")

var APIKey = "api.openweathermap.org/data/2.5/weather?q="+resultContentEl+"&appid=f48c044c914b169326af2c0881fb64da"



// function loadData(){
//    var  parameters =  document.location.search.split("&")
//       //parameters=["q=las%20vegas","format=websites"]

//     //  parameters[0]=["q=las%20vegas"]
//       //parameters[1]=["format=websites"]
//    var qSearchTermValue= parameters[0].split("=")[1] //las vegas
//   // qSearchTermValue="las%20vegas"
  
//    var formatValue=parameters[1].split("=")[1]
//   // formatValue="websites"

//    qSearchTermValue=qSearchTermValue.trim().replace("%20"," ")
//    formatValue.trim().replace("%20"," ")
//    console.log(qSearchTermValue)
//    console.log(formatValue)


//    loadApi(qSearchTermValue,formatValue)
// }

// loadData()

// function loadApi(qSearchTermValue,formatValue){


//     var locQueryUrl = 'https://www.loc.gov/search/?fo=json&q='+qSearchTermValue

//    if(formatValue.length>0){
//     locQueryUrl = 'https://www.loc.gov/' + formatValue + '/?fo=json&q='+qSearchTermValue

//    }
   
//     fetch(locQueryUrl)
//     .then(function(response){
//        return response.json()
//     })
//     .then(function(data){
//       console.log(data.results)

//       for (let i = 0; i < data.results.length; i++) {
//          resultContentEl.innerHTML = resultContentEl.innerHTML+`
//          <div class="card bg-light text-dark mb-3 p-3">
//          <div class="card-body">
//              <h3>${ data.results[i].title } </h3>
//              <p><strong>Date:</strong>${data.results[i].timestamp} <br><strong>Subjects:</strong> 
//               ${data.results[i].subject[0]}<br><strong>Description:</strong>  
//               ${data.results[i].description}
              
//               </p><a href="${data.results[i].url}" class="btn btn-dark">Read More</a>
//          </div>
//      </div>
 
         
//          `
          
//       }
//     })

// }
