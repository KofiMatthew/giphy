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
  // function that displays buttons
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

  // function that adds buttons from user input
  $("#add-go").on("click", function(event) {
    event.preventDefault();
    var newGo = $("#go-input")
      .val()
      .trim();
    goArray.push(newGo);
    $("#go-input").val("");
    renderButtons();
  });
});

//function that queries Giphy and displays all of the 'Go' giphs and ratings from the results
function displayGos() {
  $("#giphMagic").empty();
  var searchGo = $(this).attr("data-go");
  console.log(searchGo);
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    searchGo +
    "&api_key=a2FaHaI9N13jTauTs9XJVFhboekjx9el&rating=pg&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    var results = response.data;
    console.log(results);
    for (var i = 0; i < results.length; i++) {
      var goDiv = $("<div>").addClass("gipher");
      var rating = results[i].rating;
      var p = $("<p>").text("Rating: " + rating);
      var goImage = $("<img>")
      .addClass("gogoGif").attr("data-state", "still")
      .attr("src", results[i].images.fixed_height_still.url)
      .attr("data-still", results[i].images.fixed_height_still.url)
      .attr("data-animate", results[i].images.fixed_height.url);
      goDiv.append(p).append(goImage);

      $("#giphMagic").prepend(goDiv);
    }
  });
}

function animaToggle() {
  var state = $(this).attr("data-state");
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
};

$(document).on("click", ".gogoGif", animaToggle); 

$(document).on("click", ".transit", displayGos);
