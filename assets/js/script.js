var list = [];
var weatherView = document.querySelector("#weather-view");
var weatherDetails = document.querySelector("#weather-details");
var ulListEl = document.querySelector("#ul-list");
var forecastEl = document.querySelector("#forecast");
var fiveDayEl = document.querySelector("#five-day");

var currentDay = moment().format("(L)");

var data = document.createElement("div");
var temperature = document.createElement("p");
var humidity = document.createElement("p");
var windSpeed = document.createElement("p");
var uvIndex = document.createElement("p");

var apiKey = "6f8f0b3c82edaa7e1356d7dd6031e484";

var localDetails = function () {
  list = JSON.parse(localStorage.getItem("data"));
  if (!list) {
    list = [];
  }
  ulListEl.innerHTML = " ";
  for (var i = 0; i < list.length; i++) {
    listcities(list[i]);
  }
};

// weather information
function searchCurrent(cityName) {
  console.log("searchcurr:", cityName);
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
  )
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          if (list.indexOf(cityName) === -1) {
            list.push(cityName);
            localStorage.setItem("name", JSON.stringify(list));

            ShowLocal();
          }
          // current day and location name
          var localDate = document.createElement("div");
          var picture = document.createElement("pic");
          var pictureLink =
            "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
          picture.setAttribute("src", pictureLink);
          localDate.appendChild(image);

          weatherView.innerHTML = "";
          weatherView.classList.add("currentStyle");
          weatherView.appendChild(dateCity);
          weatherDetails.innerHTML = "";
          listdata.innerHTML = "";

          searchUV(data.coord.lat, data.coord.lon);

//display temperature, humidity, wind speed, 
          temperature.textContent =
            "Temperature:" + " " + data.main.temperature + " " + "ºF";
          humidity.textContent =
            "Humidity:" + " " + data.main.humidity + " " + "%";
          windSpeed.textContent =
            "Wind" + " " + "Speed:" + " " + data.wind.speed + " " + "Mph";

          weatherDetails.classList = "card";

          listdata.appendChild(weatherView);
          weather - details.appendChild(listdata);
          listdata.appendChild(temperature);
          listdata.appendChild(humidity);
          listdata.appendChild(windSpeed);
        });
      } else {
        alert("Error" + " " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Error" + " " + error.statusText);
    });
}

//UV index overview with low
function uvIndex(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`
  )
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          var uvBtnEL = document.createElement("uv-btn");
          uvBtnEL.classList.add("btn");

          uvBtnEL.textContent = data.value;

          if (data.value < 3) {
            uvBtnEL.classList.add("btn-low");
          } else if (data.value < 7) {
            uvBtnEL.classList.add("btn-moderate");
          } else {
            uvBtnEL.classList.add("btn-high");
          }

          var UVel = document.createElement("div");
          UVel.innerText = "UV Index:" + " ";
          UVel.appendChild(buttonUVEL);

          listdata.appendChild(UVel);
          weatherDetails.appendChild(listdata);
        });
      } else {
        alert("UV Error" + " " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("UV Error" + error.statusText);
    });
}

/* var cityUserInputEl = document.getElementById("city-name");
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
