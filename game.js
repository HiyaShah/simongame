var buttonColors = ["red",
"blue","green","yellow"];
var gamePattern = [];
var userPattern = [];
var started = false;
var level = 0;


function nextSequence(){
  level++;
  userPattern= [];
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);
}

$(".btn").on("click", function(){
  var userChosenColour = $(this).attr("id");
  userPattern.push(userChosenColour);
  console.log("yyyy user")
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userPattern.length-1);  console.log(userPattern);
});

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currColor){
  //2. Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
  $("#" + currColor).addClass("pressed");

  //3. use Google/Stackoverflow to figure out how you can use Javascript to remove the pressed class after a 100 milliseconds.
  setTimeout(function () {
    $("#" + currColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      }, 200);
      $("#level-title").text("Game over, press any key to restart");
      console.log("wrong");
      startOver();

    }

}

$(document).keypress(function(event){
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
})

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
