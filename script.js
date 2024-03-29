/* ------ JavaScript - Sprite Animated Movement 3/4 ------ */
/** @type {HTMLCanvasElement} */

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 1000;
const numberOfEnemies = 35;
const enemiesArray = [];

// const enemyImage = new Image();
// enemyImage.src = "img/enemy1.png";
let gameFrame = 0;

// Controls width and height of many enemy characters in a constructor class.
class Enemy {
  constructor() {
    this.image = new Image();
    this.image.src = "img/enemy3.png";
    this.speed = Math.random() * 4 + 1;
    this.spriteWidth = 218;
    this.spriteHeight = 177;
    this.width = this.spriteWidth / 2;
    this.height = this.spriteHeight / 2;
    this.x = Math.random() * (canvas.width - this.width);
    this.y = Math.random() * (canvas.height - this.height);
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    this.angle = Math.random() * 2;
    this.angleSpeed = Math.random() * 1.5 + 0.5;
    // this.curve = Math.random() * 200 + 50;
  }
  update() {
    this.x =
      (canvas.width / 2) * Math.cos((this.angle * Math.PI) / 90) +
      (canvas.width / 2 - this.width / 2); // Change divide by 180 value for varied movement pattern.
    this.y =
      (canvas.height / 2) * Math.sin((this.angle * Math.PI) / 270) +
      (canvas.height / 2 - this.height / 2); // Change divide by 180 value for varied movement pattern.
    this.angle += this.angleSpeed; // Controls the sine wave movement.
    if (this.x + this.width < 0) this.x = canvas.width; // Brings sprites back from the right side.
    /* Animate Sprites.  */
    if (gameFrame % this.flapSpeed === 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++;
    }
  }
  draw() {
    ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

for (let i = 0; i < numberOfEnemies; i++) {
  enemiesArray.push(new Enemy());
}
console.log(enemiesArray);

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  enemiesArray.forEach((enemy) => {
    enemy.update();
    enemy.draw();
  });
  gameFrame++;
  requestAnimationFrame(animate);
}
animate();
