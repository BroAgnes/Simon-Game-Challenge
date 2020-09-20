const buttonColors = ["red","blue", "green", "yellow"];
let randomChosenColor;
let gamePattern;
let userClickedPattern;
let level;
let gameStarted = false;

function makeNewGame() {
    gameStarted = true;
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
}

function playSound(name){
    let audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

function nextSequence() {
     $("h1").text(`${level} level`);
     let randomNumber = Math.floor(Math.random()*4);
     randomChosenColor = buttonColors[randomNumber];
     gamePattern.push(randomChosenColor);
     $(`#${randomChosenColor}`).fadeOut(100,function(){}).fadeIn(100,function(){}).fadeOut(100,function(){}).fadeIn(100,function(){});
     playSound(randomChosenColor);
     userClickedPattern = [];
     level++;
}

function animatePress(currentColor) {
    $(`#${currentColor}`).addClass("pressed");
    setTimeout(function (){$(`#${currentColor}`).removeClass("pressed");},100);
}

$(".btn").on("click", function () {
    if(gameStarted===false){
        return 0;
    }
     let userChosenColor = this.id;
     userClickedPattern.push(userChosenColor);
     playSound(userChosenColor);
     animatePress(userChosenColor);
     // determine if all clicks so far were right
     for(let i = 0; i<userClickedPattern.length; i++){
        if(userClickedPattern[i] !== gamePattern[i]){
            return gameOver();
        }
    }
    if (userClickedPattern.length === gamePattern.length)
    {
        nextSequence();
    }

});

function gameOver() {
    playSound("wrong");
    $("h1").text(`Game Over. Press A Key to Try Again`);
    $("body").addClass("game-over");
    setTimeout(function (){$("body").removeClass("game-over");},200);
    gameStarted = false;
}

$(document).on("keydown", function(){
    if (gameStarted === false){
        makeNewGame();
        nextSequence();
    }
});

