var currentClass;

let currentTime = luxon.DateTime.local();
$(".currentDay").text(
  luxon.DateTime.local().toLocaleString({
    weekday: "long",
    month: "long",
    day: "2-digit",
  })
);

var APIKey = "5b6d33dc8f643284870e57c82d7b049d";

let searchButton = $("#searchBtn");

$("#searchBtn").on("click", function (event) {
  event.preventDefault();

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

    // var citiesTable = document.getElementById("citiesTable");
    // $(citiesTable).append("<tr>");
    // $("<td>").text(response.Name);

    var tempF = (response.main.temp - 273.15) * 1.8 + 32;

    var weatherImg = response.weather[0].icon;
    var iconurl = "https://openweathermap.org/img/w/" + weatherImg + ".png";

    // $("#weathertron").css("border-color", "#rgb(17, 17, 63")
    document.getElementById("weathertron").style.border =
      "thick solid rgb(17, 17, 63)";
    $("#wicon").attr("src", iconurl);
    $(".city").html("<h2>" + response.name + "</h2>");
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

      uvIndexEl.removeClass(currentClass);
      if (uvIndex <= 2) {
        if (currentClass) uvIndexEl.removeClass(currentClass);
        uvIndexEl.toggleClass("low");
      } else if ((uvIndex = 3 || uvIndex <= 5)) {
        if (currentClass) uvIndexEl.removeClass(currentClass);
        uvIndexEl.toggleClass("moderate");
      } else if ((uvIndex = 6 || uvIndex <= 7)) {
        if (currentClass) uvIndexEl.removeClass(currentClass);
        uvIndexEl.toggleClass("high");
      } else if ((uvIndex = 8 || uvIndex <= 10)) {
        if (currentClass) uvIndexEl.removeClass(currentClass);
        uvIndexEl.toggleClass("veryhigh");
      } else if (uvIndex > 11) {
        if (currentClass) uvIndexEl.removeClass(currentClass);
        uvIndexEl.toggleClass("extreme");
      }
      var queryURL3 =
        "https://api.openweathermap.org/data/2.5/onecall?" +
        "lat=" +
        lat +
        "&lon=" +
        lon +
        "&units=imperial&exclude=current,minutely,hourly,alerts" + 
      "&appid=" + APIKey;

      $.ajax({
        url: queryURL3,
        method: "GET",
      }).then(function (response) {
        console.log(response);
      });
    });
  });
});

// // append a row to the table, and then append a cell to the row.
// var citiesTable = document.getElementById("citiesTable");
// $(citiesTable).append("<tr>");
// $("<td>").text(response.Name);

//   $("").text("<br><hr>"+ location).val()
// $("").prepend("<br> <hr>"+ location);

// })
