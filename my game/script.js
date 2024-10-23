var runStart=0;

//run sound
var runSound = new Audio("run.mp3");
runSound.loop=true;

//background music
var backgroundmusic = new Audio("music1.mp3");
backgroundmusic.loop= true;

//jump sound
var jumpSound = new Audio("impact.mp3");

//dead sound
var deadSound = new Audio("death.mp3");

//gameover sound
var gameOverSound= new Audio("gameover.wav");

//levelComplete sound
var levelCompleteSound= new Audio("complete.wav");


function keyCheck(event){
    //enter
    if (event.which==13) {
        if (runWorkerId==0) {

            clearInterval(idleWorkerId);

            blockWorkerId=setInterval(createBlock,1000);
            moveBlockWorkerId=setInterval(moveBlock,100);


            runWorkerId= setInterval(run,100);
            runSound.play();
            backgroundmusic.play();
            runStart=1;

            backgroundWorkerId=setInterval(moveBackground,100);
            scoreWorkerId= setInterval(updateScore,50);
        } 
    }

    //space
    if (event.which==32) {

        if (runStart==1) {

            if (jumpWorkerId==0) {
                clearInterval(runWorkerId);
                runSound.pause();
                jumpWorkerId=setInterval(jump,100);
                jumpSound.play();
            }  
        } 
    }
}

//player
var player = document.getElementById("player");

//idleAnimation
function idleAnimation() {
    if (idleWorkerId==0) {
        idleWorkerId=setInterval(idle,100);
    }
}

//idle
var idleImageNumber=0;
var idleWorkerId=0

function idle() {
    idleImageNumber++;
    if (idleImageNumber==11) {
        idleImageNumber=1;
    }
    player.src="Idle ("+idleImageNumber+").png";
}

//run
var runWorkerId=0;
var runImageNumber=1;

function run(){
    
    runImageNumber++;

    if (runImageNumber==9) {
        runImageNumber=1;
    }

    player.src = "Run ("+runImageNumber+").png";
}

//jump

var jumpImageNumber=1;
var jumpWorkerId=0;
var playerMarginTop=310;

function jump(){
    jumpImageNumber++;

    //fly
    if (jumpImageNumber <=6) { //jump imgs 2-6
        playerMarginTop=playerMarginTop-30;
        player.style.marginTop=playerMarginTop+"px";
    }

    //land
    if (jumpImageNumber >=7) {//jump imgs 7-1
        playerMarginTop= playerMarginTop+30;
        player.style.marginTop=playerMarginTop+"px";
    }

    if (jumpImageNumber==11) {
        jumpImageNumber=1;
        clearInterval(jumpWorkerId);
        runWorkerId=setInterval(run,100);
        runSound.play();
        jumpWorkerId=0;
    }

    player.src="Jump ("+jumpImageNumber+").png";

}

//background
var background = document.getElementById("background");
var backgroundX=0;
var backgroundWorkerId=0;

//move background
function moveBackground(){
   backgroundX= backgroundX-20;

   background.style.backgroundPositionX=backgroundX+"px";
   
}

//score
var score= document.getElementById("score");

//update score
var newScore=0;
var scoreWorkerId=0;

function updateScore() {
    
    newScore++;
    score.innerHTML=newScore;
    if (newScore==1000) {
        levelComplete();
    }
}

//create blocks
var blockWorkerId=0;
var blockMarginLeft=700;
var blockId=1;

function createBlock(){
    var block= document.createElement("div");
    block.className="block";

    //giving Ids to block 
    block.id="block"+blockId;
    blockId++;
    
    //generating random num between max 1000 and min 400
    var gap = Math.random()*(1000-400)+400;

    blockMarginLeft= blockMarginLeft+gap;
    
    block.style.marginLeft=blockMarginLeft+"px";
    background.appendChild(block);
}

//move blocks 

var moveBlockWorkerId=0;

function moveBlock(){

    for(var i =1; i <= blockId; i++){

        var currentBlock= document.getElementById("block"+i);
        var currentMarginLeft= currentBlock.style.marginLeft;
        var newMarginLeft= parseInt(currentMarginLeft)- 20;
        currentBlock.style.marginLeft= newMarginLeft +"px";

        if (newMarginLeft<151 & newMarginLeft>81) {

            if (playerMarginTop>270) {
                clearInterval(runWorkerId);
                runSound.pause();
                clearInterval(jumpWorkerId);
                jumpWorkerId=-1;
                clearInterval(backgroundWorkerId);
                clearInterval(scoreWorkerId);
                clearInterval(blockWorkerId);
                clearInterval(moveBlockWorkerId);
                deadWorkerId=setInterval(dead,100);
                deadSound.play();
                backgroundmusic.pause();
                gameOverSound.play();
                
            }
        }
    }
}

//dead
var deadImageNumber=1;
var deadWorkerId=0;

function dead(){

    deadImageNumber++;

    if (deadImageNumber==11) {
    deadImageNumber=10;
    player.style.marginTop="310px"; 
    document.getElementById("endScreen").style.visibility="visible";
    document.getElementById("text2").innerHTML=newScore;

    }

    player.src="Dead ("+deadImageNumber+").png";
}

//try again
function reload(){
    location.reload();
}

//go back to main menu
function main() {
    location.href="StartGame.html";
}

//level complete
function levelComplete() {
    clearInterval(runWorkerId);
    runSound.pause();
    backgroundmusic.pause();
    clearInterval(jumpWorkerId);
    jumpWorkerId=-1;
    clearInterval(backgroundWorkerId);
    clearInterval(scoreWorkerId);
    clearInterval(blockWorkerId);
    clearInterval(moveBlockWorkerId);

    document.getElementById("levelComplete").style.visibility="visible";
    levelCompleteSound.play();
}