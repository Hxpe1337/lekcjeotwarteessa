const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// Game settings
let intervalId;
const paddleWidth = 10;
const paddleHeight = 100;
const ballSize = 10;
let ballX = canvas.width / 2 - ballSize / 2;
let ballY = canvas.height / 2 - ballSize / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;
let player1Y = (canvas.height - paddleHeight) / 2;
let player2Y = (canvas.height - paddleHeight) / 2;
let playerSpeed = 4;
let player1Score = 0;
let player2Score = 0;
let isAIEnabled = false;

// Start game function
function startGame(isAI) {
    isAIEnabled = isAI;
    canvas.style.display = 'block'; // Show the canvas
    intervalId = setInterval(gameLoop, 16); // Start the game loop
}

// Game loop
function gameLoop() {
    moveBall();
    if (isAIEnabled) {
        moveAI();
    }
    drawEverything();
    checkCollisions();
}

// Ball movement
function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision with top and bottom walls
    if (ballY <= 0 || ballY + ballSize >= canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    // Ball resets when it goes past paddles
    if (ballX <= 0) {
        if (ballY > player1Y && ballY < player1Y + paddleHeight) {
            ballSpeedX = -ballSpeedX;
        } else {
            player2Score++; // Player 2 scores
            ballReset();
        }
    }
    if (ballX + ballSize >= canvas.width) {
        if (ballY > player2Y && ballY < player2Y + paddleHeight) {
            ballSpeedX = -ballSpeedX;
        } else {
            player1Score++; // Player 1 scores
            ballReset();
        }
    }
}

// Ball reset
function ballReset() {
    ballX = canvas.width / 2 - ballSize / 2;
    ballY = canvas.height / 2 - ballSize / 2;
    ballSpeedX = -ballSpeedX;
}

// AI Movement
function moveAI() {
    let paddle2YCenter = player2Y + (paddleHeight / 2);
    if (paddle2YCenter < ballY - 35) {
        player2Y += playerSpeed;
    } else if (paddle2YCenter > ballY + 35) {
        player2Y -= playerSpeed;
    }
}

// Drawing everything on the canvas
function drawEverything() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

    // Draw paddles
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, player1Y, paddleWidth, paddleHeight); // Left paddle
    ctx.fillRect(canvas.width - paddleWidth, player2Y, paddleWidth, paddleHeight); // Right paddle

    // Draw ball
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballSize, 0, Math.PI*2, true);
    ctx.fill();
}

// Collision detection
function checkCollisions() {
    // Implement collision detection with paddles
}

// Key down event
document.addEventListener('keydown', (event) => {
    switch(event.key) {
        case 'w':
            player1Y = Math.max(player1Y - playerSpeed, 0);
            break;
        case 's':
            player1Y = Math.min(player1Y + playerSpeed, canvas.height - paddleHeight);
            break;
        case 'ArrowUp':
            if (!isAIEnabled) {
                player2Y = Math.max(player2Y - playerSpeed, 0);
            }
            break;
        case 'ArrowDown':
            if (!isAIEnabled) {
                player2Y = Math.min(player2Y + playerSpeed, canvas.height - paddleHeight);
            }
            break;
    }
});

// Example usage (you'll need to call these based on your menu interaction)
// startGame(false); // For player vs player
// startGame(true); // For player vs AI
