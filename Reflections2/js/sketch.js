var cDiv = document.getElementById("canvasDiv");
var h = cDiv.offsetHeight;
var w = cDiv.offsetWidth;

let map;
let mHeight;
let mWidth;
let mTileWidth;
let mTileHeight;
let rayCastMaxDist = 40;
let playerX, playerY;
let playerDir;
let speed = 10;

let prevMouseX,
  prevMouseY = 0;

let raycastInfos = [];

function setup() {
  let canvas = createCanvas(w, h);
  canvas.parent(cDiv);
  map = makeMap();
  mWidth = map[0].length;
  mHeight = map.length;

  mTileWidth = width / mWidth;
  mTileHeight = height / mHeight;
  mTileHeight = min(mTileHeight, mTileWidth);
  mTileWidth = mTileHeight;
  playerX = floor(mWidth / 4);
  playerY = floor(mHeight / 2);
  playerDir = createVector(1, 0);
}

function draw() {
  keys();
  const diffX = mouseX - width / 2;
  if (abs(diffX) >= 100) {
    // playerDir.rotate(diffX / (width/2) * deltaTime / 1000);
  }
  background(0);
  fill(255);
  draw3D();

  push();
  scale(0.4, 0.4);
  raycastInfos = [];

  draw2D();
  pop();
}

function draw2D() {
  drawMap();
  drawPlayer();
  rayCastAll();
}

function draw3D() {
  render3D();
}

function getPlayerXYScreen() {
  return { x: (playerX + 0.5) * mTileWidth, y: (playerY + 0.5) * mTileHeight };
}

function drawPlayer() {
  const { x, y } = getPlayerXYScreen();
  ellipse(x, y, mTileWidth * 0.9);
  fill(0, 255, 0);
  ellipse(
    (playerX + 0.5 + playerDir.x / 2) * mTileWidth,
    (playerY + 0.5 + playerDir.y / 2) * mTileHeight,
    12
  );
}

function drawMap() {
  for (let x = 0; x < mWidth; x++) {
    for (let y = 0; y < mHeight; y++) {
      const screenX = x * mTileWidth;
      const screenY = y * mTileHeight;
      if (map[y][x] == ".") fill(0);
      else fill(255);
      rect(screenX, screenY, mTileWidth, mTileHeight);
    }
  }
}

function mouseMoved() {
  prevMouseX = mouseX;
}

function render3D() {
  noStroke();
  let floor = 100;
  let ceiling = height - floor;
  const myWidth = width / (raycastInfos.length || 1);
  const range = ceiling - floor;
  let currX = 0;
  for (let info of raycastInfos) {
    const xTouch = info.xDirOne != 0;
    const yTouch = info.yDirOne != 0;
    if (info.dist <= rayCastMaxDist) {
      let col = 255;
      if (xTouch) col /= 2;
      let frac = info.dist / rayCastMaxDist;
      //   fill((1 - frac) * col);
      if (info.tile == '1')
        fill(col, 0, 0 );
      else if (info.tile == '2')
        fill(0,0,col)
      else if (info.tile == '3')
        fill(0,col,0)
      frac = max(0.05, frac);
      const heightToDraw = (height - floor * 2) / 10 / frac;
      const xx = -(range / 20) / frac;
      rect(currX, height / 2 - heightToDraw / 2, myWidth + 2, heightToDraw);
      fill(0);
      //   console.log(xx)

      rect(currX, height, myWidth, (-floor / 10) * frac);
    }
    currX += myWidth;
  }
}

function reflect(dir, normal){
   return p5.Vector.sub(dir, p5.Vector.mult(normal, 2 * (normal.x * dir.x + normal.y * dir.y)));
}

function castRay(startPoint, dir, recurseCount = 0) {
  const incDist = 0.1;

  const pos = startPoint;
  let xDirOne = false;
  let yDirOne = false;

  let distSoFar = 0;
  let curr = p5.Vector.add(pos, p5.Vector.mult(dir, incDist));
  let tile
  while (distSoFar < rayCastMaxDist) {
    curr = p5.Vector.add(pos, p5.Vector.mult(dir, distSoFar));
    if (curr.y >= mHeight || curr.y < 0 || curr.x >= mWidth || curr.x < 0)
      break;
    tile = map[round(curr.y - dir.y * incDist)][round(curr.x)];
    if (tile !== ".") {
      xDirOne = true;
      break;
    }
    tile = map[round(curr.y)][round(curr.x - dir.x * incDist)];
    if (tile !== ".") {
      yDirOne = true;
      break;
    }
    tile = map[round(curr.y)][round(curr.x)];
    if (tile !== ".") {
      break;
    }
    distSoFar += incDist;
    prevCell = curr;
  }
  if (distSoFar < rayCastMaxDist) {
    // then we touched something, so reflect if we want to
    if (recurseCount > 0) {

    //   const tmp = createVector(dir.y, -dir.x).mult(-1);
      const tmp = reflect(dir, createVector(-1,0));
      stroke(0, 255, 255);
      line((curr.x+0.5)*mTileWidth, (curr.y+0.5)*mTileHeight, (tmp.x*2 + curr.x+0.5) * mTileWidth, (tmp.y*2+curr.y+0.5) * mTileHeight);
      const ans = castRay(
        p5.Vector.add(curr, p5.Vector.mult(tmp, 0.2)),
        tmp,
        recurseCount - 1
      );
      line(
        (pos.x + 0.5) * mTileWidth,
        (pos.y + 0.5) * mTileHeight,
        (curr.x + 0.5) * mTileWidth,
        (curr.y + 0.5) * mTileHeight
      );
      console.log(ans);
      return ans;
    } else {
      const { x, y } = getPlayerXYScreen();
    //   translate(-x, -y);
    
      //   line((curr.x+0.5)*mTileWidth, (curr.y+0.5)*mTileHeight, (tmp.x*2 + curr.x+0.5) * mTileWidth, (tmp.y*2+curr.y+0.5) * mTileHeight);
    //   pop();
    }
  }
  return {
    dist: distSoFar,
    xDirOne,
    yDirOne,
    curr,
    prevCell,
    tile,
    startPos: startPoint,
    dir
  };
}

function rayCastAll(fov = PI / 4) {
  const halfView = fov / 2;
  const increment = 0.5;
//   push();
  const { x, y } = getPlayerXYScreen();
//   translate(x, y);
  const pos = createVector(playerX, playerY);
  for (let a = -halfView; a <= halfView; a += increment) {
    const angle = a + playerDir.heading();
    stroke(255);
    const vec = p5.Vector.fromAngle(angle, 1);
    
    let curr;

    const info = castRay(pos, vec, 1);
    raycastInfos.push(info);
    const p = info.startPos;
    const d = info.dir;
    
    const travelled = p5.Vector.add(p, p5.Vector.mult(d, info.dist, 0)).add(createVector(0.5,0.5));
    stroke(255)
    // break;
    line((p.x+0.5)*mTileWidth, (p.y+0.5) * mTileHeight, travelled.x * mTileWidth, travelled.y * mTileHeight);
    // break;
  }
//   pop();
}

function keys() {
  if (!keyIsPressed) return;
  const moveVec = createVector(0, 0);
  if (key == "a") {
    // playerX -= speed * deltaTime/1000;
    moveVec.x -= 1;
  }
  if (key == "d") {
    // playerX += speed * deltaTime/1000;
    moveVec.x += 1;
  }
  if (key == "w") {
    // playerY -= speed * deltaTime/1000;
    moveVec.y -= 1;
  }
  if (key == "s") {
    // playerY += speed * deltaTime/1000;
    moveVec.y += 1;
  }

  if (keyCode == LEFT_ARROW) {
    playerDir.rotate((-1 * deltaTime) / 1000);
  }
  if (keyCode == RIGHT_ARROW) {
    playerDir.rotate((1 * deltaTime) / 1000);
  }
  moveVec.normalize();
  // y is forward, x is side to side
  const forward = moveVec.y;
  const sideWays = moveVec.x;
  const origX = playerX,
    origY = playerY;

  playerX -= (forward * speed * playerDir.x * deltaTime) / 1000;
  playerY -= (forward * speed * playerDir.y * deltaTime) / 1000;

  const orth = createVector(playerDir.y, -playerDir.x);
  playerX -= (sideWays * speed * orth.x * deltaTime) / 1000;
  playerY -= (sideWays * speed * orth.y * deltaTime) / 1000;

  playerX = min(mWidth - 2, max(1, playerX));
  playerY = min(mHeight - 2, max(1, playerY));

  if (map[round(playerY)][round(playerX)] !== ".") {
    playerX = origX;
    playerY = origY;
  }
}

function makeMap() {
  return [
    "33333333333333333333333333333",
    "3...........................3",
    "3.............2.............3",
    "3.............2.............3",
    "3.............2.............3",
    "3.............2.............3",
    "3...........................3",
    "3.......111111..............3",
    "3.................1.........3",
    "3.................11........3",
    "3.................111.......3",
    "3.................1111......3",
    "3...........................3",
    "3...........................3",
    "3...........................3",
    "3...........................3",
    "3...........................3",
    "3...........................3",
    "33333333333333333333333333333",
  ];
}
