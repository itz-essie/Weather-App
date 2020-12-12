var cityName = "Atlanta";
    var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + "{lat}&lon={lon}&exclude={part}" + "&appid={API key}5b6d33dc8f643284870e57c82d7b049d";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        console.log(response);