//API key: 6f8f0b3c82edaa7e1356d7dd6031e484//

var apiKey = "6f8f0b3c82edaa7e1356d7dd6031e484";
var chosenCity = [];
var cityUserInputEl = document.getElementById("city-name");
var searchButton = document.getElementById("button");
var userInput = document.getElementById("input-box");
var frameEl = document.querySelector("#frame-wrapper");
var cityBucketEl = document.getElementById("city-bucket");

searchButton.addEventListener("click", function (event) {
    event.preventDefault();
    console.log("click");
    var userInput = document.getElementById("input-box").value;

//this is the fetch function for current weather data
var currentWeatherUrl= "api.openweathermap.org/data/2.5/weather?q=" + 
chosenCity + 
"&appid=" 
+ apiKey;

//this returns current weather data based on user city input//
fetch(currentWeatherUrl).then(function (response) {
    console.log(response);
    if (response.ok) {
        response.json().then(function (data) {
            console.log(data);
            cityBucketEl.innerHTML = "";

//add variable here to drill down API content that will display (create element, set attribute, add class list, append to child)//

//this is the fetch for 5 Day Forecast//
var fiveDayForecastUrl = "api.openweathermap.org/data/2.5/forecast?q=" 
+ chosenCity +
"&appid=" 
+ apiKey;
//this returns 5-day weather data based on user city input//
fetch(fiveDayForecastUrl).then(function (response) {
    console.log(response);
    if (response.ok) {
        response.json().then(function (data) {
            console.log(data);
            cityBucketEl.innerHTML = "";