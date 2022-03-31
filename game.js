// choosing random number
var gamePattern = [];
var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var k = 0;

$(document).on("keydown click", function () {

  if (k === 0) {
    nextSequence();
    k = 1;
  }
});
//    detecting click
$(".btn").on("click", function () {
  var userChosenColour = this.getAttribute("id");
  userClickedPattern.push(userChosenColour);

  animatePress(userChosenColour);
  playSound(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

//Answer checking
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");

    $("body").addClass("game-over");
    $(document).on("keydown click", function () {

        if (k === 0) {
          nextSequence();
          k = 1;
        }
      });

    $("#level-title").text("Game-Over,Press any key to Restart.");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

function nextSequence() {
  // setting user clicked patter to wmoty after every next sequence call
  userClickedPattern = [];
  $("#level-title").text("Level " + k);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
  k++;
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

//Restarting the game
function startOver() {
  k = 0;
  gamePattern = [];
}
