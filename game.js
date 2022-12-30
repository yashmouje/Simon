// defining variables
let colors = ["green", "red", "yellow", "blue"];
let gameStarted = false;
let correctSequence = [];
let userClickedSequence = [];
let level = 0;
// get next color in sequence
if (gameStarted === false) {
  gameStarted = true;
  $(document).keydown(nextSequence);
}

//play sound on click/declaring next color in sequence
function playSound(name) {
  let sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

// animate button click
function animatePress(name) {
  $("#" + name).addClass("pressed");
  setTimeout(function () {
    jQuery("#" + name).removeClass("pressed");
  }, 100);
}

function nextSequence() {
  userClickedSequence = [];
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = colors[randomNumber];
  correctSequence.push(randomChosenColor);
  playSound(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeOut(50)
    .fadeIn(50);
  level++;
  if (level > 0) {
    $("h1").text("Level " + level);
  }
}

// handle clicks
$(".btn").click(function () {
  let userChosenColor = jQuery(this).attr("id");
  userClickedSequence = userClickedSequence.concat([userChosenColor]);
  animatePress(userChosenColor);
  playSound(userChosenColor);
  console.log(userClickedSequence);
  checkAnswer(level);
});

// checks user input against correct answer
function checkAnswer(level) {
  console.log("User: " + userClickedSequence);
  console.log("Answer: " + correctSequence);
  if (userClickedSequence.length == correctSequence.length) {
    let same = true;
    for (var i = 0; i < userClickedSequence.length; i++) {
      if (correctSequence[i] !== userClickedSequence[i]) {
        same = false;
      }
    }
    if (same) {
      console.log("Correct!");
      $("h1").text("Correct Answer!");
      setTimeout(nextSequence, 1000);
    } else {
      console.log("Incorrect!");
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      let gameOverSound = new Audio("sounds/wrong.mp3");
      gameOverSound.play();
      $("h1").html("Game Over! <br>Press Any Key to Restart");
      startOver();
    }
  }
}

function startOver() {
  correctSequence = [];
  userClickedSequence = [];
  level = 0;
  gameStarted = false;
}
