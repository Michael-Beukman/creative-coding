var cDiv = document.getElementById('canvasDiv');
var h = cDiv.offsetHeight;
var w = cDiv.offsetWidth;
var player;
let points;
var jumpHeight;
let btnJumpPos;
let floors = [];
let numFloors;
let numObstacles;
let levelNum;
let isGameOver;
let levelCompleted;
let jumpBtnRad;
function setup() {
  jumpHeight = 10;
  numFloors = 1;
  numObstacles = 5;
  points = 0;
  levelNum = 0;
  isGameOver = false;
  levelCompleted = false;
  jumpBtnRad = 50;
  var canvas = createCanvas(w, h);
  canvas.parent(cDiv);
  btnJumpPos = createVector(width / 20, height * 9 / 10);
  noStroke();
  start();
}

function draw() {

  if (frameCount % 10 == 0) {
    ++points;
  }

  background(42);
  fill(0);

  ellipse(btnJumpPos.x, btnJumpPos.y, jumpBtnRad*2, jumpBtnRad*2);
  fill(0,255,0);
  push();
  translate(btnJumpPos.x, btnJumpPos.y+jumpBtnRad/2);
  getTriangle(jumpBtnRad,3);
  pop();
  player.update(floors);
  player.show();

  textSize(32);
  fill(255);
  text('Score: ' + points, width / 20, height / 40);
  text(' Level: '+ levelNum, 15*width / 20, height / 40);
  updateFloors();

}

function updateFloors() {
  let isDone = false;
  for (let i = floors.length - 1; i >= 0; --i) {
    environ = floors[i];
    environ.show();
    isDone = environ.update(player);
    if (isDone) {
      break;
    }
    if (environ.pos.x + environ.w <= 0) {
      floors.splice(i, 1);
    } else if (environ.pos.x + environ.w < width && !environ.hasSpawned) {}
  }

  if (isDone || player.update()) {
    let msg = 'Game Over';
    isGameOver = true;
    levelCompleted = false;
    if (floors.length && floors[0].checkCollision(floors[floors.length - 1], player, 1, 1)) {
      msg = 'Well done!';
      levelCompleted = true;
    }
    textSize(64);
    fill(255, 0, 0)
    text(msg, width / 2 - 64 * 4, height / 2);
    text('Press any key to continue', width / 2 - 64 * 4, height / 2+64);
    noLoop();
  }
}

function keyPressed() {
  if (isGameOver) {
    if (levelCompleted) {
      //next level;
      ++levelNum;
    } else {
      //restart;
      levelNum = 0;
    }
    isGameOver = false;
    levelCompleted = false;
    start(levelNum);
  }
  if (key == ' ') {
    player.jump();
  }
}

function mousePressed() {
  if (isGameOver) {
    if (levelCompleted) {
      //next level;
      ++levelNum;
    } else {
      //restart;
      levelNum = 0;
    }
    isGameOver = false;
    levelCompleted = false;
    start(levelNum);
  }
  if (dist(mouseX, mouseY, btnJumpPos.x, btnJumpPos.y) < jumpBtnRad) {
    player.jump();
  }
}

function getTriangle(h, scale) {
  beginShape();
  vertex(0, -h);
  vertex(jumpHeight * scale, 0);
  vertex(-jumpHeight * scale, 0);
  endShape();
}


function start(levelNum = 0) {
  //starts
  points = levelNum == 0 ? 0 : points;
  floors = Level(levelNum);
  // console.log(levelNum);
  // console.log(floors);
  player = new Player(floors[0].pos.y);
  loop();
}
