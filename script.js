let currentTime = luxon.DateTime.local();
  $(".currentDay").text(luxon.DateTime.local().toLocaleString({ weekday: 'long', month: 'long', day: '2-digit' }));
  

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
  });

  // to append searched cities to a table 
  var citiesRow= $("<tr>")
  var searchedCities = $("<td>").text(response.Name);
  citiesRow.append(searchedCities)


});
