//game function

//button colour
var buttonColours= ["red","green","blue","yellow"];

//game pattern
var gamePattern =[];

//user click pattern
var userClickedPattern = [];

//check whether game has started
var gamestarted=false;

//audio file
var redAudio = new Audio("./sounds/red.mp3");
var blueAudio = new Audio("./sounds/blue.mp3");
var greenAudio = new Audio("./sounds/green.mp3");
var yellowAudio = new Audio("./sounds/yellow.mp3");
var wrongAudio = new Audio("./sounds/wrong.mp3");

//For timeout function
var delay=100; //0.1 second



//detect keyboard press & start the game
$(document).on("keypress",function(event){
    if(gamestarted==false && event.key=="a" ){
        
        nextSequence(); 
        gamestarted=true;
        
    }
})

//detect button press & start the game
$("button").on("click",function(){
    if(gamestarted==false ){
        
        nextSequence(); 
        gamestarted=true;
        
    }
})

//level 
var level = 0;



//creating a random number function
function nextSequence(){

    var randomNumber = Math.floor(Math.random()*4);   //from 0-3
    
    var randomChosenColour = buttonColours[randomNumber];
  
    //add a new level everything nextSequence is called & and change the h1
    level++;
    $("#level-title").text("Level "+level); 

    //add the chosencolour into the game pattern
    gamePattern.push(randomChosenColour);

    //select the button with the same id and do flashing animation
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour)
   


}

//check which button is clicked
$(".btn").on("click",function (){
    var $input = $(this);
    var userChosenColour = $input.attr("id");
    playSound(userChosenColour);
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1); //latest index
    
    
    // console.log($input.attr("id"));  //debug
});

//for playAudio
function playSound(colours){
    //switch case for audio play
    switch(colours){
       case "red":
       redAudio.play();
       break;
       case "blue":
       blueAudio.play();
       break;
       case "green":
       greenAudio.play();
       break;
       case "yellow":
       yellowAudio.play();
       break;
       default: console.log(randomChosenColour);
   }
}




//animate the user clicks
function animatePress(currentColour){
 $(".btn."+currentColour).addClass("pressed");
 setTimeout(function (){
    $(".btn."+currentColour).removeClass("pressed");   
 }, delay
);
}

//checking the answer
function checkAnswer(currentLevel) {
if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
    if(userClickedPattern.length==gamePattern.length){
        setTimeout(function (){
            nextSequence();
            userClickedPattern=[];
        },1000);
        
    }
}
else {
    $("#level-title").text("Game Over"); 
    
    wrongAudio.play();
}
}