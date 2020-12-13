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
    var citiesTable = document.getElementById("citiesTable");
  $(citiesTable).append("<tr>");
  $("<td>").text(response.Name);

  var tempF = (response.main.temp - 273.15) * 1.8 + 32;
    $(".city").html("<h1>" + response.name + " Weather Details</h1>");
  $(".wind").text("Wind Speed: " + response.wind.speed);
  $(".humidity").text("Humidity: " + response.main.humidity);
  });

  

  // // append a row to the table, and then append a cell to the row.
  // var citiesTable = document.getElementById("citiesTable");
  // $(citiesTable).append("<tr>");
  // $("<td>").text(response.Name);

  // var tempF = (response.main.temp - 273.15) * 1.8 + 32;

  // $("#weathertron").text("Temperature (F) " + tempF.toFixed(2));

//   $(".city").html("<h1>" + response.name + " Weather Details</h1>");
//   $(".wind").text("Wind Speed: " + response.wind.speed);
//   $(".humidity").text("Humidity: " + response.main.humidity);
});
