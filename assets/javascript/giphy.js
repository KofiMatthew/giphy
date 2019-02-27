var goArray = [
  "walk",
  "run",
  "bike",
  "fall",
  "airplane",
  "climb",
  "swim",
  "skip",
  "bus",
  "pogo stick",
  "unicycle",
  "scooter",
  "moped",
  "motorcycle",
  "canoe",
  "raft",
  "kayak",
  "paddle board"
];

$(document).ready(function() {

  // function that displays the next question in the array
  function renderButtons() {
    $("#buttons").empty();
    for (var i = 0; i < goArray.length; i++) {
      var button = $("<button>")
        .text(goArray[i])
        .addClass("btn btn-info btn-lg transit")
        .attr("type", "button")
        .attr("data-go", goArray[i]);
      $("#buttons").prepend(button);
    }
  }
  renderButtons();

$("#add-go").on("click", function(event) {
  event.preventDefault();
  var newGo = $("#go-input").val().trim();
  goArray.push(newGo);
  $("#go-input").val("");
  renderButtons();  
});

});

function displayGos() {
  $("#giphMagic").empty();
  var searchGo = $(this).attr("data-go");
  console.log(searchGo);
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    searchGo + "&api_key=a2FaHaI9N13jTauTs9XJVFhboekjx9el&rating=pg&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  })
  .then(function(response) {
    var results = response.data;
    console.log(results)
    for (var i = 0; i < results.length; i++) {
        var goDiv = $("<div>").addClass("gipher");
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);

        var goImage = $("<img>")
          .attr("src", results[i].images.fixed_height.url);

        goDiv
          .append(p)
          .append(goImage);

        // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
        $("#giphMagic").prepend(goDiv);
    }
  });
};

$(document).on("click", ".transit", displayGos);

  /*  $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      response.data.forEach(item => {
        var elem = $('<embed>').attr('src', item.embed_url);
        $("images").append(elem);
      })}); */



     /*  $("button").on("click", function() {
        // Grabbing and storing the data-animal property value from the button
        var animal = $(this).attr("data-animal");
  
        // Constructing a queryURL using the animal name
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          animal + "&api_key=dc6zaTOxFJmzC&limit=10";
  
        // Performing an AJAX request with the queryURL
        $.ajax({
          url: queryURL,
          method: "GET"
        })
          // After data comes back from the request
          .then(function(response) {
            console.log(queryURL);
  
            console.log(response);
            // storing the data from the AJAX request in the results variable
            var results = response.data;
  
            // Looping through each result item
            for (var i = 0; i < results.length; i++) {
  
              // Creating and storing a div tag
              var animalDiv = $("<div>");
  
              // Creating a paragraph tag with the result item's rating
              var p = $("<p>").text("Rating: " + results[i].rating);
  
              // Creating and storing an image tag
              var animalImage = $("<img>");
              // Setting the src attribute of the image to a property pulled off the result item
              animalImage.attr("src", results[i].images.fixed_height.url);
  
              // Appending the paragraph and image tag to the animalDiv
              animalDiv.append(p);
              animalDiv.append(animalImage);
  
              // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
              $("#gifs-appear-here").prepend(animalDiv);
            }
          });
      }); */