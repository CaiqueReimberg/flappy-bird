console.log('Flappy Bird');

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const flappyBird = {
  spriteX: 0,
  spriteY: 0,
  width: 33,
  height: 24,
  x: 10,
  y: 50,
  draw() {
    context.drawImage(
      sprites,
      flappyBird.spriteX, flappyBird.spriteY, // Sprite X, Y beginning
      flappyBird.width, flappyBird.height, // Size of sprite recort
      flappyBird.x, flappyBird.y,
      flappyBird.width, flappyBird.height,
    );
  }
};

// Background
const background = {
  spriteX: 390,
  spriteY: 0,
  width: 275,
  height: 204,
  x: 0,
  y: canvas.height - 204,
  draw() {
    context.fillStyle = '#70c5ce';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.drawImage(
      sprites,
      background.spriteX, background.spriteY, // Sprite X, Y beginning
      background.width, background.height, // Size of sprite recort
      background.x, background.y,
      background.width, background.height,
    );

    context.drawImage(
      sprites,
      background.spriteX, background.spriteY, // Sprite X, Y beginning
      background.width, background.height, // Size of sprite recort
      background.x + background.width, background.y,
      background.width, background.height,
    );
  }
};

// Ground
const ground = {
  spriteX: 0,
  spriteY: 610,
  width: 224,
  height: 112,
  x: 0,
  y: canvas.height - 112,
  draw() {
    context.drawImage(
      sprites,
      ground.spriteX, ground.spriteY, // Sprite X, Y beginning
      ground.width, ground.height, // Size of sprite recort
      ground.x, ground.y,
      ground.width, ground.height,
    );

    // To extend ground size
    context.drawImage(
      sprites,
      ground.spriteX, ground.spriteY, // Sprite X, Y beginning
      ground.width, ground.height, // Size of sprite recort
      ground.x + ground.width, ground.y,
      ground.width, ground.height,
    );
  }
};

function loop() {
  background.draw();
  ground.draw();
  flappyBird.draw();

  requestAnimationFrame(loop);
}

loop();
