/*API key: 6f8f0b3c82edaa7e1356d7dd6031e484//

var apiKey = "6f8f0b3c82edaa7e1356d7dd6031e484";
var chosenCity = "hartford";
// var cityUserInputEl = document.getElementById("city-name");
// var searchButton = document.getElementById("button");
// var userInput = document.getElementById("input-box");
// var frameEl = document.querySelector("#frame-wrapper");
// var cityBucketEl = document.getElementById("city-bucket");

//     searchButton.addEventListener("click", function (event) {
// event.preventDefault();
//     console.log("click");
//     var userInput = document.getElementById("input-box").value;
// })

//this is the fetch function for current weather data
var currentWeatherUrl= "https://api.openweathermap.org/data/2.5/weather?q=" + 
chosenCity + 
"&appid=" 
+ apiKey
+ "&units=imperial"

//this returns current weather data based on user city input//
fetch(currentWeatherUrl).then(function (response) {
 //   console.log(response);
    if (response.ok) {
        response.json().then(function (data) {
            console.log(data);
            console.log(data.main.humidity);
            console.log (data.main.temp);
            console.log(data.wind.speed);
            getFiveDay(data.coord.lat, data.coord.lon);
            //cityBucketEl.innerHTML = "";
        })
    }
})
function getFiveDay(lat,lon){
var oneCallUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" +lat+ "&lon=" +lon+ "&exclude=minutely,hourly,alerts&units=imperial&appid=" +apiKey
fetch (oneCallUrl).then(function(response) {
    if (response.ok) {
        response.json().then(function (data) {
            console.log("this is the One Call API",data);
        })
    }
})
}

//this is the fetch for 5 Day Forecast//
var fiveDayForecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" 
+ chosenCity +
"&appid=" 
+ apiKey;

//this returns 5-day weather data based on user city input//
//fetch(fiveDayForecastUrl).then(function (response) {
    //console.log(response);
  //  if (response.ok) {
        //response.json().then(function (data) {
         //   console.log(data);
           // cityBucketEl.innerHTML = "";
       // })
   // }
//})
*/