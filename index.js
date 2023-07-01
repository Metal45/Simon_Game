var buttonColor = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var Level = 0;
var started = false;

$(document).keydown(function(){
    if(!started){
        $("#level-title").text("Level" + Level);
        nextSequence();
        started = true;
    }
});

function nextSequence(){
    userClickedPattern = [];
    Level++; 

    $("#level-title").text("Level " + Level);

    var randomNumber = Math.floor(Math.random() * 4);
    console.log(randomNumber);
    
    var randomChosenColour = buttonColor[randomNumber];
    gamePattern.push(randomChosenColour);

    var currButton = $("#" +randomChosenColour);
    currButton.fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}


$(".btn").click(function(){
    var userChosenPattern = this.id;
    userClickedPattern.push(userChosenPattern);

    console.log(userClickedPattern);
    playSound(userChosenPattern);
    animatePress(userChosenPattern);

    checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
    
        }
    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        console.log("Wrong");

        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    Level = 0;
    gamePattern = [];
    started = false;
}

function playSound(currentColour){
    var currSound = new Audio("sounds/" + currentColour + ".mp3");
    currSound.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}




