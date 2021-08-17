console.log("Flappy Bird");

const sprites = new Image();
sprites.src = "./sprites.png";

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const hitSound = new Audio();
hitSound.src = "./effects/hit.wav";

let frames = 0;

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
      if (doColision(flappyBird, globals.ground)) {
        hitSound.play();
        changeToScreen(Screens.begin);
        return;
      }

      flappyBird.y = flappyBird.y + flappyBird.speed;
      flappyBird.speed = flappyBird.speed + flappyBird.gravity;
    },
    movements: [
      { spriteX: 0, spriteY: 0 }, // up wings
      { spriteX: 0, spriteY: 26 }, // middle wings
      { spriteX: 0, spriteY: 52 }, // down wings
    ],
    jump() {
      flappyBird.speed = -flappyBird.jumpForce;
    },
    currentFrame: 0,
    updateFrame() {
      const framesInterval = 10;

      if (frames % framesInterval === 0) {
        const incrementBase = 1;
        const increment = incrementBase + flappyBird.currentFrame;
        const repetitionBase = flappyBird.movements.length;

        flappyBird.currentFrame = increment % repetitionBase;
      }
    },
    draw() {
      flappyBird.updateFrame();
      const { spriteX, spriteY } = this.movements[flappyBird.currentFrame];

      context.drawImage(
        sprites,
        spriteX,
        spriteY, // Sprite X, Y beginning
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

function createPipes() {
  const pipes = {
    width: 52,
    height: 400,
    ground: {
      spriteX: 0,
      spriteY: 169,
    },
    sky: {
      spriteX: 52,
      spriteY: 169,
    },
    space: 80,
    draw() {
      pipes.pairs.forEach((pair) => {
        const spaceBetweenPipes = 40;
        const yRandom = pair.y;
  
        const pipeSkyX = pair.x;
        const pipeSkyY = yRandom - spaceBetweenPipes;

        // [Sky pipe]
        context.drawImage(
          sprites,
          pipes.sky.spriteX,
          pipes.sky.spriteY,
          pipes.width,
          pipes.height,
          pipeSkyX,
          pipeSkyY,
          pipes.width,
          pipes.height
        );

        // [Ground pipe]
        const pipeGroundX = pair.x;
        const pipeGroundY = pipes.height + yRandom + spaceBetweenPipes;
        context.drawImage(
          sprites,
          pipes.ground.spriteX,
          pipes.ground.spriteY,
          pipes.width,
          pipes.height,
          pipeGroundX,
          pipeGroundY,
          pipes.width,
          pipes.height
        );

        pair.pipeSky = {
          x: pipeSkyX,
          y: pipes.height + pipeSkyY
        }

        pair.pipeGround = {
          x: pipeGroundX,
          y: pipeGroundY
        }
      });
    },

    pairs: [{
      x: canvas.width,
      y: -150 * (Math.random() + 1),
    }],

    hasCollisionWithFlappyBird(pair) {
      // console.log(pair);
      if (globals.flappyBird.x <= pair.x) {
        console.log(globals.flappyBird.y)
        console.log(pair)
        if (globals.flappyBird.y <= pair.pipeSky.y) {
          return true;
        } else if ((globals.flappyBird.y + globals.flappyBird.height) <= pair.pipeGround.y) {
          return true;
        }
      }

      return false;
    },

    update() {
      if (frames % 100 === 0) {
        pipes.pairs.push({
          x: canvas.width,
          y: -150 * (Math.random() + 1),
        });
      }

      pipes.pairs.forEach(pair => {
        pair.x = pair.x - 2;

        if (pipes.hasCollisionWithFlappyBird(pair)) {

        }

        if (pair.x + pipes.width <= 0) {
          pipes.pairs.shift();
        }
      })
    },
  };

  return pipes;
}

// Ground
function createGround() {
  const ground = {
    spriteX: 0,
    spriteY: 610,
    width: 224,
    height: 112,
    x: 0,
    y: canvas.height - 112,
    update() {
      const groundMovement = 1;
      const repite = ground.width / 2;
      const movement = (ground.x -= groundMovement);

      ground.x = movement % repite;
    },
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

  return ground;
}

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
      globals.ground = createGround();
      globals.pipes = createPipes();
    },
    draw() {
      background.draw();
      globals.ground.draw();
      globals.flappyBird.draw();
      getReady.draw();
    },
    click() {
      changeToScreen(Screens.game);
    },
    update() {
      globals.ground.update();
    },
  },
  game: {
    draw() {
      background.draw();
      globals.pipes.draw();
      globals.ground.draw();
      globals.flappyBird.draw();
    },
    click() {
      globals.flappyBird.jump();
    },
    update() {
      globals.flappyBird.update();
      globals.ground.update();
      globals.pipes.update();
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

  frames += 1;
  requestAnimationFrame(loop);
}

changeToScreen(Screens.begin);

window.addEventListener("click", function () {
  if (activeScreen.click) {
    activeScreen.click();
  }
});

loop();
