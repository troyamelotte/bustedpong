var canvas;
var canvasContext;
var ballX = 400;
var ballY = 300;
var ballSpeedX = newBallDirection();
var ballSpeedY = newBallDirection();
var pad1Y = 250;
var botPadY = 250;
var playerScore = 0;
var botScore = 0;
var gameRunner;
window.onload = function(){
  drawWorld();
  gameRunner = setInterval(drawWorld,1000/30);
}
function newBallDirection(){
  var num = getRandomInt(1,4);
  switch (num) {
    case 1:
      return getRandomInt(8,12);
    case 2:
      return getRandomInt(-12,-8);
    case 3:
      return getRandomInt(5,15);
    case 4:
      return getRandomInt(-15,-5);

  }
}
function drawWorld(){
  canvas = document.getElementById('gameCanvas')
  canvasContext = canvas.getContext('2d');
  canvasContext.fillStyle = 'black';
  canvasContext.fillRect(0,0, canvas.width, canvas.height);
  //score
  canvasContext.font = "12px Arial";
  canvasContext.fillStyle = "white";
  canvasContext.fillText("Player Score: "+playerScore, 10,30)
  canvasContext.font = "12px Arial";
  canvasContext.fillStyle = "white";
  canvasContext.fillText("Bot Score: "+botScore, canvas.width-80,30)
  //pad1
  canvasContext.fillStyle = "white";
  canvasContext.fillRect(5, pad1Y, 10,100);
  //bot
  canvasContext.fillStyle = "white";
  canvasContext.fillRect(canvas.width-15, botPadY, 10,100);
  //ball
  canvasContext.fillStyle = "white";
  canvasContext.beginPath();
  canvasContext.arc(ballX, ballY, 10, 0, Math.PI*2,true);
  canvasContext.fill();
  moveObjects();
}

function moveObjects(){
  //Ball Update

  if(ballY<10||ballY>canvas.height-10){
    ballSpeedY*=-1;
  }
  //pad bounce
  if(ballX<25&&ballY>pad1Y&&ballY<pad1Y+100){
    ballSpeedX*=1.05;
    ballSpeedX*=-1;
  }
  if(ballX>canvas.width-25&&ballY>botPadY&&ballY<botPadY+100){
    ballSpeedX*=1.05;
    ballSpeedX*=-1;
  }
  if(ballX<10){
    botScore++;
    resetBall();
    return;
  }
  if(ballX>canvas.width-10){
    playerScore++;
    resetBall();
    return;
  }
  ballX+=ballSpeedX;
  ballY+=ballSpeedY;
  //updating bot pad
  updateBotPad();
}

function updatePadOne(event){
  pad1Y = event.clientY-150;
}

function resetBall(){
  if(playerScore>=5){
    clearInterval(gameRunner);
    canvasContext.font = "30px Arial";
    canvasContext.fillStyle = "white";
    canvasContext.fillText("You won... How?", 240,300)
    return;
  }
  if(botScore>=5){
    clearInterval(gameRunner);
    canvasContext.font = "30px Arial";
    canvasContext.fillStyle = "white";
    canvasContext.fillText("You lost! Refresh to start over!", 200,300)
    return;
  }
  ballX = 400;
  ballY = 300;
  ballSpeedX = newBallDirection();
  ballSpeedY = newBallDirection();
}

function updateBotPad(){
  botPadY = ballY-50;
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
