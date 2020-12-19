$("#weathertron").hide();
$("#fiveDayForecast").hide();

$(".currentDay").text(
  luxon.DateTime.local().toLocaleString({
    weekday: "long",
    month: "long",
    day: "2-digit",
  })
);

var APIKey = "5b6d33dc8f643284870e57c82d7b049d";

let searchButton = $("#searchBtn");

function searchHistory(){
  var lastSearchedCity = localStorage.getItem("City")
  if (lastSearchedCity !== null) {
    $("#searchInput").val(lastSearchedCity);
    uploadWeather();
  }
}
searchHistory();

function uploadWeather(){
  var cityName = $("#searchInput").val();
  console.log($("#searchInput").val());

  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?" +
    "q=" +
    cityName +
    "&appid=" +
    APIKey;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    // Display response in the console log
    console.log(response);

    $("#weathertron").show();
    $("#fiveDayForecast").show();
    var tempF = (response.main.temp - 273.15) * 1.8 + 32;

    var weatherImg = response.weather[0].icon;
    var iconurl = "https://openweathermap.org/img/w/" + weatherImg + ".png";

    // $("#weathertron").css("border-color", "#rgb(17, 17, 63")
    document.getElementById("weathertron").style.border =
      "thick solid rgb(17, 17, 63)";
    $("#wicon").attr("src", iconurl);
    $(".city h2").text(response.name);
    $(".humidity").text("Humidity: " + response.main.humidity + "%");
    $(".temperature").text("Temperature: " + tempF.toFixed(2) + "°F");
    $(".windspeed").text("Wind Speed: " + response.wind.speed + "MPH");

    var lat = response.coord.lat;
    var lon = response.coord.lon;

    var queryURL2 =
      "https://api.openweathermap.org/data/2.5/uvi?" +
      "lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=" +
      APIKey;

    $.ajax({
      url: queryURL2,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      $(".uvIndex").text("UV Index: " + response.value);
      var uvIndexEl = $(".uvIndex");
      console.log(uvIndexEl);

      $(".btnGroup").append("<button>" + cityName + "</button>");

      var uvIndex = response.value;

      uvIndexEl.removeClass("low moderate high veryhigh extreme");
      if (uvIndex < 3) {
        uvIndexEl.addClass("low"); // example city Denver
      } else if (uvIndex >= 3 && uvIndex <= 5) {
        uvIndexEl.addClass("moderate"); // example city Miami
      } else if (uvIndex > 5 && uvIndex <= 7) {
        uvIndexEl.addClass("high");
      } else if (uvIndex > 7 && uvIndex <= 10) {
        uvIndexEl.addClass("veryhigh");
      } else if (uvIndex > 10) {
        uvIndexEl.addClass("extreme"); // example city Lagos
      }
      var queryURL3 =
        "https://api.openweathermap.org/data/2.5/onecall?" +
        "lat=" +
        lat +
        "&lon=" +
        lon +
        "&units=imperial&exclude=current,minutely,hourly,alerts" +
        "&appid=" +
        APIKey;

      $.ajax({
        url: queryURL3,
        method: "GET",
      }).then(function (response) {
        console.log(response);
        for (i = 0; i < 5; i++) {
          var nextDate = new Date(
            response.daily[i + 1].dt * 1000
          ).toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
          });
          var forecastImg = response.daily[i].weather[0].icon;
          var fiurl =
            "https://openweathermap.org/img/wn/" + forecastImg + ".png";

          var highTemp = "High of: " + response.daily[i].temp.max + " °F";
          var lowTemp = "Low of: " + response.daily[i].temp.min + " °F";
          var Humidity = "Humidity: " + response.daily[i].humidity + " %";
          $(".displayForecast").append(`
          <div class="card" style="width: 10rem;">
          <div class="card-body">
            <div class="card-body">
            <p class="card-text">${nextDate}</p>
              <p class="card-text">${highTemp}</p>
              <p class="card-text">${lowTemp}</p>
               <p class="card-text">${Humidity}</p>
               <img src="${fiurl}"/>
            </div>
          </div>
        </div>
          `);
        }
      });
    });
  });
}

  $("#searchBtn").on("click", function (event) {
    event.preventDefault();
    // clears out 5 day forecast to display new entered city's
    $(".displayForecast").empty();
   uploadWeather();
   localStorage.setItem("City", $("#searchInput").val())
  })

$(".btnGroup").on("click", function (event) {
  $("#searchInput").val($(this).text());
 $(this).val("")
  uploadWeather();
});