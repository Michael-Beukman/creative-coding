var cDiv = document.getElementById("canvasDiv");
var h = cDiv.offsetHeight;
var w = cDiv.offsetWidth;

let mHeight;
let mWidth;
let mTileWidth;
let mTileHeight;
let playerX, playerY;
let playerDir;
let speed = 10;
let boundaries = [];
let maxRayCastDist = 40;
let prevMouseX,
  prevMouseY = 0;
let infos = [];
let bullets = [];

let raycastInfos = [];

function setup() {
  let canvas = createCanvas(w, h);
  canvas.parent(cDiv);
  mWidth = 40; //map[0].length;
  mHeight = 40; //
  map = makeMap();

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
  const t = width - mTileWidth * mWidth;
  translate(t / 2, 0);
  background(0);
  fill(255);
  raycastInfos = [];
  draw2D();
}
let dir = 1;
function draw2D() {
  drawMap();
  drawPlayer();
  reflections();

  for (let i = 4; i < boundaries.length; ++i) {
    let b = boundaries[i];
    b.start.x += 0.1 * b.dirX;
    b.end.x += 0.1 * b.dirX;

    b.start.y += 0.1 * b.dirY;
    b.end.y += 0.1 * b.dirY;
    if (b.start.x < 0 || b.end.x >= mWidth) b.dirX *= -1;
    if (b.start.y < 0 || b.end.y >= mHeight) b.dirY *= -1;
  }
}

/**
 * Gets the screen coordinates of a point in the world
 * @param {number} x
 * @param {number} y
 * @returns {p5.Vector}
 */
function toScreen(x, y) {
  return createVector(x * mTileWidth, y * mTileHeight);
}
function toScreenVec(v) {
  return toScreen(v.x, v.y);
}

function draw3D() {
  render3D();
}

function getPlayerXYScreen() {
  return { x: (playerX + 0.5) * mTileWidth, y: (playerY + 0.5) * mTileHeight };
}

function drawPlayer() {
  const { x, y } = toScreen(playerX, playerY); //getPlayerXYScreen();
  ellipse(x, y, mTileWidth * 0.9);
  fill(0, 255, 0);
  ellipse(
    (playerX + playerDir.x / 2) * mTileWidth,
    (playerY + playerDir.y / 2) * mTileHeight,
    12
  );
}

function drawMap() {
  fill(0);
  rect(0, 0, width, height);
  stroke(255);
  for (let b of boundaries) {
    b.draw();
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
    if (info.hit) {
      let col = info.colour.slice();
      //   const angle =
      let frac = info.dist / maxRayCastDist;
      fill(col);
      frac = max(0.05, frac);
      const heightToDraw = (height - floor * 2) / 10 / frac;
      const xx = -(range / 20) / frac;
      rect(currX, height / 2 - heightToDraw / 2, myWidth + 2, heightToDraw);
      fill(0);

      rect(currX, height, myWidth, (-floor / 10) * frac);
    }
    currX += myWidth;
    // console.log(currX)
  }
}

function reflect(dir, normal) {
  return p5.Vector.sub(dir, p5.Vector.mult(normal, 2 * normal.dot(dir)));
}

function castRay(startPoint, dir, recurseCount = 0) {
  const incDist = 0.1;

  const pos = startPoint;
  let xDirOne = false;
  let yDirOne = false;

  let distSoFar = 0;
  let curr = p5.Vector.add(pos, p5.Vector.mult(dir, incDist));
  let tile;
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
      const tmp = reflect(dir, createVector(-1, 0));
      stroke(0, 255, 255);
      line(
        (curr.x + 0.5) * mTileWidth,
        (curr.y + 0.5) * mTileHeight,
        (tmp.x * 2 + curr.x + 0.5) * mTileWidth,
        (tmp.y * 2 + curr.y + 0.5) * mTileHeight
      );
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
    dir,
  };
}

function rayCastAll(fov = PI / 8) {
  const halfView = fov / 2;
  const increment = 0.01;
  //   push();
  const { x, y } = getPlayerXYScreen();
  //   translate(x, y);
  const pos = createVector(
    playerX + playerDir.x / 2,
    playerY + playerDir.y / 2
  );
  for (let a = -halfView; a <= halfView; a += increment) {
    const angle = a + playerDir.heading();
    stroke(255);
    const vec = p5.Vector.fromAngle(angle, 1);

    let curr;
    const r = new Ray(pos, vec);
    const info = r.cast(maxRayCastDist, boundaries);
    // continue;
    // const info = castRay(pos, vec, 1);
    if (info == null) continue;
    // info.angle = angle;
    // info.dist = cos(angle) * info.dist;
    raycastInfos.push(info);
    const p = info.startPos;
    const d = info.dir;
    const travelled = p5.Vector.add(p, p5.Vector.mult(d, info.dist, 0));
    stroke(255);
    ellipse(travelled.x * mTileWidth, travelled.y * mTileHeight, 1);
    // break;
    // if (a == -halfView || abs(a -  halfView) < increment)
    line(
      p.x * mTileWidth,
      p.y * mTileHeight,
      travelled.x * mTileWidth,
      travelled.y * mTileHeight
    );
  }
  for (let a of [-fov / 2, fov / 2]) {
    break;
    let travelled = p5.Vector.add(
      pos,
      p5.Vector.mult(
        p5.Vector.fromAngle(a + playerDir.heading(), 1),
        maxRayCastDist,
        0
      )
    );
    line(
      pos.x * mTileWidth,
      pos.y * mTileHeight,
      travelled.x * mTileWidth,
      travelled.y * mTileHeight
    );
  }
}

function reflections() {
  infos = [];
  let numReflects = 2;
  const doRays = (p, d, count = 2) => {
    ray = new Ray(p, d);
    let info = ray.cast(100, boundaries);
    if (info.hit) {
      infos.push(info);
      if (count > 0) {
        const newDir = reflect(info.dir, info.normal);
        doRays(
          p5.Vector.add(info.point, p5.Vector.mult(newDir, 0.01)),
          newDir,
          count - 1
        );
      }
    }
  };
  doRays(
    createVector(playerX + playerDir.x / 2, playerY + playerDir.y / 2),
    playerDir,
    numReflects
  );

  let col = 255;
  for (let i in infos) {
    let info = infos[i];
    stroke((col * (numReflects - min(i, numReflects - 2))) / numReflects, 0, 0);
    const a = toScreenVec(info.startPos);
    const b = toScreenVec(
      p5.Vector.add(info.startPos, p5.Vector.mult(info.dir, info.dist))
    );

    line(a.x, a.y, b.x, b.y);
  }
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
  const checkCollisions = (dir, amount) => {
    const ray = new Ray(
      createVector(playerX + dir.x / 2, playerY + dir.y / 2),
      dir
    );
    const info = ray.cast(amount * 1.1, boundaries);
    return info.hit;
  };
  if (forward != 0) {
    const moveAmount = (speed * deltaTime) / 1000;
    const hit = checkCollisions(
      p5.Vector.mult(playerDir, forward * -1),
      moveAmount
    );
    if (!hit) {
      playerX -= forward * playerDir.x * moveAmount;
      playerY -= forward * playerDir.y * moveAmount;
    }
  }

  if (sideWays != 0) {
    const moveAmount = (speed * deltaTime) / 1000;
    const orth = createVector(playerDir.y, -playerDir.x);

    const hit = checkCollisions(
      p5.Vector.mult(orth, sideWays * -1),
      moveAmount
    );
    if (!hit) {
      playerX -= sideWays * orth.x * moveAmount;
      playerY -= sideWays * orth.y * moveAmount;
    }
  }
  playerX = min(mWidth - 2, max(1, playerX));
  playerY = min(mHeight - 2, max(1, playerY));
}

function makeMap() {
  //   boundaries.push(new Boundary(mWidth / 2, 0, 0, mHeight / 2));
  //   boundaries.push(new Boundary(mWidth / 2, 0, mWidth / 2, mHeight / 2));

  boundaries.push(new Boundary(0, 0, 0, mHeight));
  boundaries.push(new Boundary(0, 0, mWidth, 0));
  boundaries.push(new Boundary(mWidth, 0, mWidth, mHeight));
  boundaries.push(new Boundary(0, mHeight, mWidth, mHeight));

  boundaries.push(new Boundary(0, mHeight / 3, mWidth / 2, mHeight / 3));
  boundaries[4].dirY =  0;

  boundaries.push(new Boundary(mWidth/3, 0 / 3, mWidth / 3, mHeight / 3));
  boundaries[5].dirX =  0;
  
  boundaries.push(new Boundary(5,5,5,10, [0,255,0]));
  boundaries[6].dirX =  0;
  boundaries[6].dirY =  0;
  

  return;
  const getR = () => {
    return createVector(random(0, mWidth), random(0, mHeight));
  };
  let prevVec = createVector(mWidth, mHeight);
  // now generate things;
  for (let i = 0; i < 3; i++) {
    let newThing = getR();
    boundaries.push(new Boundary(prevVec.x, prevVec.y, newThing.x, newThing.y));
    prevVec = newThing;
    continue;
    let a = random(0, min(mWidth, mHeight));
    let w = random(a, min(mWidth, mHeight));
    let xx = random(0, min(mWidth, mHeight));
    if (random(0, 1) < 0.5)
      boundaries.push(
        new Boundary(a, xx, w, xx, [
          random(0, 255),
          random(0, 255),
          random(0, 255),
        ])
      );
    else
      boundaries.push(
        new Boundary(xx, a, xx, w, [
          random(0, 255),
          random(0, 255),
          random(0, 255),
        ])
      );
  }
}
