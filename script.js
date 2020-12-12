// // var APIKey= "5b6d33dc8f643284870e57c82d7b049d"
// // var cityName = "Atlanta";
// //     var queryURL = "https://api.openweathermap.org/data/2.5/weather?" + "q=Bujumbura,Burundi&appid=" + APIKey

// //     $.ajax({
// //       url: queryURL,
// //       method: "GET"
// //     })
// //     .then(function(response) {
// //         console.log(response)})

// var APIKey = "5b6d33dc8f643284870e57c82d7b049d";

// // Here we are building the URL we need to query the database
// var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
//   "q=Bujumbura,Burundi&appid=" + APIKey;

// // Here we run our AJAX call to the OpenWeatherMap API
//  $.ajax({
//     url: queryURL,
//     method: "GET"
//   })
//     // We store all of the retrieved data inside of an object called "response"
//     .then(function(response) {

//       // Log the queryURL
//       console.log(queryURL);

//       // Log the resulting object
//       console.log(response);

//       // Transfer content to HTML
//       $(".city").html("<h1>" + response.name + " Weather Details</h1>");
//       $(".wind").text("Wind Speed: " + response.wind.speed);
//       $(".humidity").text("Humidity: " + response.main.humidity);

let searchBtn = $("#searchBtn")
  $("#searchBtn").on('click',function(){
      alert("you clicked the search button")
  })