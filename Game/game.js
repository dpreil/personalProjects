

let gameState = {
	canvas: document.createElement('canvas'),
	start: function () {
		this.canvas.width = 680;
		this.canvas.height = 400;
		this.canvas.style = "border: 3px solid black";
		this.context = this.canvas.getContext('2d');
		initializeComponents();
		drawState();
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		this.startTime = Date.now();
		this.active = true;
	}
}
//items
let paddle = {
	height:40,
	width:10,
	speed:1,
}

let player1 = {
	topOfPaddle:0,
	score:0,
	direction:0
}

let player2 = {
	topOfPaddle:0,
	score:0,
	direction:0,
}

let ball = {
	timeCounter:0,
	xPosition:0,
	yPosition:0,
	size:10,
	speed:1,
	acceleration:.5,
	direction:7 //directions are 1,3,7,9 as in a numpad.
}
//rendering functions
function drawScores() {
	gameState.context.font = "20px Helvetica";
	gameState.context.fillText(player1.score, 30, 30);
	gameState.context.fillText(player2.score, gameState.canvas.width - 30, 30);
}

function clearBoard() {
	gameState.context.clearRect(0, 0, gameState.canvas.width, gameState.canvas.height)
}

function drawState() {
	drawCenterLine();
	renderPaddles();
	renderBall();
	drawScores();
}

function initializeComponents(){
	player1.topOfPaddle = (gameState.canvas.height/2) - (paddle.height/2);
	player2.topOfPaddle = (gameState.canvas.height/2) - (paddle.height/2);
	ball.xPosition = gameState.canvas.width/2;
	ball.yPosition = gameState.canvas.height/2;
	ball.speed = 8;
	ball.timeCounter = 0;
}


function drawCenterLine() {
	//console.log("draw center line called");
	gameState.context.moveTo(0,0);
	gameState.context.setLineDash([10,10]);
	gameState.context.moveTo(gameState.canvas.width/2, 0);
	gameState.context.lineTo(gameState.canvas.width/2, gameState.canvas.height);
	gameState.context.stroke();
}


function renderPaddles() {
	gameState.context.fillStyle = 'black';
	gameState.context.fillRect(0,
		player1.topOfPaddle, 
		paddle.width, 
		paddle.height);
	gameState.context.fillRect(gameState.canvas.width-paddle.width,
		player2.topOfPaddle, 
		paddle.width, 
		paddle.height);

}

function renderBall() {
	ctx = gameState.context;
	cnvs = gameState.canvas;
	ctx.beginPath();
	ctx.arc(ball.xPosition, ball.yPosition, ball.size, 0, Math.PI*2);
	ctx.fill();
}

//movement
function processKeyDown(e) {
	//moves paddles with builtin collision check
	//console.log(e);

	switch (e.key) {
		case 'a':
			player1.direction = -1;
			break;

		case 'z':
			player1.direction = 1;
			break;

		case 'k':
			player2.direction = -1;
			break;

		case 'm':
			player2.direction = 1;
			break;
	}
}

function processKeyUp(e) {
	//moves paddles with builtin collision check
	//console.log(e);

	switch (e.key) {
		case 'a':
		case 'z':
			player1.direction = 0;
			break;

		case 'k':
		case 'm':
			player2.direction = 0;
			break;
	}
}

function movePaddles(){
	player1.topOfPaddle + player1.direction < 0? player1.direction = 0 :'';
	player1.topOfPaddle + player1.direction > gameState.canvas.height - paddle.height ? player1.direction = 0 :'';
	(player2.topOfPaddle + player2.direction < 0)? player2.direction = 0 : '';
	player2.topOfPaddle + player2.direction > gameState.canvas.height - paddle.height ? player2.direction = 0 : '';
	player1.topOfPaddle += player1.direction;
	player2.topOfPaddle += player2.direction;
}

function moveBall(){
	//test for wall collisions
	if(ball.yPosition == gameState.canvas.height-ball.size){
		ball.direction-=6;
	}; 
	if(ball.yPosition > gameState.canvas.height - ball.size){
		ball.yPosition = gameState.canvas.height - ball.size;
		ball.direction-=6;
	};
	if (ball.yPosition == ball.size) {
		ball.direction+=6;
	};
	if (ball.yPosition < ball.size) {
		ball.yPosition = ball.size;
		ball.direction+=6;
	}

	//test for player 1 paddle collision
	if (ball.direction == 1 || ball.direction == 7){
		//test for player1 collision
		if	((ball.yPosition >= player1.topOfPaddle) && (ball.yPosition <= player1.topOfPaddle + paddle.height)){
			if (ball.xPosition - ball.size - paddle.width == 0){
				ball.direction+=2;
			} else if (ball.xPosition - ball.size - paddle.width < 0) {
				ball.xPosition = ball.size + paddle.width;
				ball.direction+=2;
			}
		} else if (ball.xPosition <= ball.size) {
			player2.score++;
			resetBoard();
		}
	}


	if (ball.direction == 3 || ball.direction == 9){
		//test for player2 collision
		if ((ball.yPosition >= player2.topOfPaddle) && (ball.yPosition <= player2.topOfPaddle + paddle.height)){
			if (ball.xPosition + ball.size + paddle.width == gameState.canvas.width){
			ball.direction-=2;
			} else if (ball.xPosition+ball.size + paddle.width > gameState.canvas.width){
				ball.xPosition = gameState.canvas.width - ball.size - paddle.width;
				ball.direction -= 2;
			}
		} else if (ball.xPosition >= gameState.canvas.width - ball.size) {
			player1.score++;
			resetBoard();
		}
	}




	ball.timeCounter++;
	if (ball.timeCounter % 500 == 0){
		ball.speed += ball.acceleration;
	}

	switch (ball.direction) {
		case 1:
			ball.xPosition -= ball.speed;
			ball.yPosition -= ball.speed;
			break;
		case 3:
			ball.xPosition += ball.speed;
			ball.yPosition -= ball.speed;
			break;	
		case 7:
			ball.xPosition -= ball.speed;
			ball.yPosition += ball.speed;
			break;
		case 9:
			ball.xPosition += ball.speed;
			ball.yPosition += ball.speed;
			break;
		default:
			// statements_def
			break;
	}
}

function resetBoard() {
	if ((player1.score == 3) || (player2.score == 3)){
		console.log("Game Over!");
		gameOver();
	} else {
	sleep(3000);
	initializeComponents();
	}
}

function gameOver() {
	gameState.active = false;
	clearBoard();
	ball.speed=0;
	ball.acceleration=0;
	let ctx = gameState.context;
	ctx.beginPath();
	ctx.lineWidth = '4';
	ctx.strokeStyle = 'blue';
	ctx.rect (gameState.canvas.width/4, gameState.canvas.height/4, gameState.canvas.width/2, gameState.canvas.height/2);
	ctx.stroke;

	ctx.font = "50px helvetica";
	ctx.textAlign = 'center';
	ctx.fillText(`PLAYER${player1.score == 3 ? '1':'2'} WINS!`, gameState.canvas.width/2, gameState.canvas.height/2);
	
	ctx.font = "20px helvetica";
	ctx.textAlign = 'center';
	ctx.fillText(`Press 'R' to restart`, gameState.canvas.width/2, gameState.canvas.height/2 - 40);
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function gamePlay(){
	if (!gameState.active){
		clearInterval();
	}
	movePaddles();
	moveBall();
	clearBoard();
	drawState();
}

function init(){
	window.addEventListener('keydown', processKeyDown);
	window.addEventListener('keyup', processKeyUp);
	gameState.start();
	var game = setInterval(gamePlay, 20);

}
window.onload = init;