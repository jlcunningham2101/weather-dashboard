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

//UV index overview with low, moderate, and high indicators
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

// function to show the five day forcast
function search5Day(city) {
  console.log("search5Day:", city);
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
  )
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          var titleforecast = document.createElement("h2");

          forecastEl.textContent = "";
          titleforecast.textContent = "5-Day Forecast:";
          forecastEl.appendChild(titleforecast);

          for (var i = 6; i < 39; i += 8) {
            // where your five day forcast comes from
            var div = document.createElement("div");
            var firstDT = document.createElement("p");
            var firstDH = document.createElement("p");
            var imagen1 = document.createElement("img");
            var time1 = document.createElement("h4");

            time1.textContent = data.list[i].dt_txt.split(" ")[0];
            time1.classList = "dateForecast";
            imagen1.setAttribute(
              "src",
              "https://openweathermap.org/img/w/" +
                data.list[i].weather[0].icon +
                ".png"
            );
            imagen1.classList = " imgDisplay ";
            firstDT.textContent =
              " Temp:" + " " + data.list[i].main.temp + " " + "ºF";
            firstDH.textContent =
              " Humidity:" + " " + data.list[i].main.humidity + " " + "%";
            div.classList = "col-md-2 style  forecast mr-3 ";

            div.appendChild(time1);
            div.appendChild(imagen1);
            div.appendChild(firstDT);
            div.appendChild(firstDH);
            fiveDayEl.appendChild(div);
          }
        });
        fiveDayEl.innerHTML = "";
      } else {
        alert("Error" + " " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Error" + " " + error.statusText);
    });
}
// function for the city's you search
var listcities = function (cityIn) {
  var firstC = document.createElement("button");
  firstC.classList = " ul-history-item ul-history-item-action";

  firstC.textContent = cityIn;
  ulListEl.appendChild(firstC);
};

document.getElementById("ul-list").addEventListener("click", function (event) {
  searchCurrent(event.target.textContent);
  searchForecast(event.target.textContent);
});

document
  .getElementById("search-btn")
  .addEventListener("click", function (event) {
    event.preventDefault();

    // searched city value and city name to me in all caps
    var cityIn = document.getElementById("city").value;
    document.getElementById("city").value = "";

    cityIn = cityIn.toUpperCase();

    if (cityIn) {
      searchCurrent(cityIn);

      searchForecast(cityIn);
    } else {
      alert("Please search for a city name");
    }
  });

$("#erase").click(function () {
  window.localStorage.erase();
  location.reload();
  return false;
});
