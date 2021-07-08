console.log("Flappy Bird");

const sprites = new Image();
sprites.src = "./sprites.png";

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const hitSound = new Audio();
hitSound.src = './effects/hit.wav';

function doColision(character, object) {
  return character.y + character.height >= object.y;
}

function createFlappyBird() {
  const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    width: 33,
    height: 24,
    x: 10,
    y: 50,
    speed: 0,
    gravity: 0.25,
    jumpForce: 4.6,
    update() {
      if (doColision(flappyBird, ground)) {
        hitSound.play();
        changeToScreen(Screens.begin);
        return;
      }
  
      flappyBird.y = flappyBird.y + flappyBird.speed;
      flappyBird.speed = flappyBird.speed + flappyBird.gravity;
    },
    jump() {
      flappyBird.speed = - flappyBird.jumpForce;
    },
    draw() {
      context.drawImage(
        sprites,
        flappyBird.spriteX,
        flappyBird.spriteY, // Sprite X, Y beginning
        flappyBird.width,
        flappyBird.height, // Size of sprite recort
        flappyBird.x,
        flappyBird.y,
        flappyBird.width,
        flappyBird.height
      );
    },
  };

  return flappyBird;
}



// Background
const background = {
  spriteX: 390,
  spriteY: 0,
  width: 275,
  height: 204,
  x: 0,
  y: canvas.height - 204,
  draw() {
    context.fillStyle = "#70c5ce";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.drawImage(
      sprites,
      background.spriteX,
      background.spriteY, // Sprite X, Y beginning
      background.width,
      background.height, // Size of sprite recort
      background.x,
      background.y,
      background.width,
      background.height
    );

    context.drawImage(
      sprites,
      background.spriteX,
      background.spriteY, // Sprite X, Y beginning
      background.width,
      background.height, // Size of sprite recort
      background.x + background.width,
      background.y,
      background.width,
      background.height
    );
  },
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
      ground.spriteX,
      ground.spriteY, // Sprite X, Y beginning
      ground.width,
      ground.height, // Size of sprite recort
      ground.x,
      ground.y,
      ground.width,
      ground.height
    );

    // To extend ground size
    context.drawImage(
      sprites,
      ground.spriteX,
      ground.spriteY, // Sprite X, Y beginning
      ground.width,
      ground.height, // Size of sprite recort
      ground.x + ground.width,
      ground.y,
      ground.width,
      ground.height
    );
  },
};

// Beggining
const getReady = {
  spriteX: 134,
  spriteY: 0,
  width: 174,
  height: 152,
  x: canvas.width / 2 - 174 / 2,
  y: 50,
  draw() {
    context.drawImage(
      sprites,
      getReady.spriteX,
      getReady.spriteY, // Sprite X, Y beginning
      getReady.width,
      getReady.height, // Size of sprite recort
      getReady.x,
      getReady.y,
      getReady.width,
      getReady.height
    );
  },
};

// Screens
const globals = {};
const Screens = {
  begin: {
    initialize() {
      globals.flappyBird = createFlappyBird();
    },
    draw() {
      background.draw();
      ground.draw();
      globals.flappyBird.draw();
      getReady.draw();
    },
    click() {
      changeToScreen(Screens.game);
    },
    update() {},
  },
  game: {
    draw() {
      background.draw();
      ground.draw();
      globals.flappyBird.draw();
    },
    click() {
      globals.flappyBird.jump();
    },
    update() {
      globals.flappyBird.update();
    },
  },
};

let activeScreen = Screens.begin;

function changeToScreen(newScreen) {
  activeScreen = newScreen;

  if (activeScreen.initialize) {
    activeScreen.initialize();
  }
}

function loop() {
  activeScreen.draw();
  activeScreen.update();

  requestAnimationFrame(loop);
}

changeToScreen(Screens.begin);

window.addEventListener('click', function() {
  console.log('cachorra')
  if (activeScreen.click) {
    activeScreen.click();
  }
});

loop();
