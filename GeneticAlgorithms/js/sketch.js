const cDiv = document.getElementById("canvasDiv");
//todo add bad
let flyers = [];
let checkpoints = [];
let population;
function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent(cDiv);
  for (let i = 0; i < 50; ++i) {
    // checkpoints.push(new Checkpoint(random(width), random(height)));
    flyers.push(new Flyer(width - 200, height / 2));
    // flyers[i].vel = p5.Vector.random2D();
  }
  //make checkpoints;
  const pX = [
    99,
    150,
    165,
    190,
    221,
    255,
    308,
    385,
    432,
    528,
    616,
    692,
    785,
    867,
    902,
    922,
    940,
    945,
    978,
    1071,
    1108,
    1138,
    1169,
    1195
  ];
  const pY = [
    622,
    589,
    543,
    476,
    411,
    327,
    249,
    225,
    236,
    245,
    257,
    286,
    325,
    383,
    419,
    515,
    561,
    622,
    713,
    795,
    769,
    759,
    739,
    730
  ];
  for (let i = 0; i < 1; ++i) {
    checkpoints.push(new Checkpoint(pX[i], pY[i], true, 24));
  }
  noStroke();
  population = new Population(flyers);
}

function isOutside({ x, y }) {
  return x <= 0 || x >= width || y <= 0 || y >= height;
}

function draw() {
  background(0);
  //   population.stepOneGen(checkpoints);
  let stop = true;
  for (let i = flyers.length - 1; i >= 0; --i) {
    if (flyers[i].dead) continue;
    flyers[i].update();
    flyers[i].show();
    flyers[i].think(checkpoints);
    if (isOutside(flyers[i].pos)) flyers[i].dead = true;
    else if (flyers[i].checkpointsReached.length == checkpoints.length)
      flyers.dead = true;
    else stop = false; //still alive
  }

  if (stop) {
      console.log("hey at stop");
      population.agents = flyers;
      const b = population.stepOneGen();
      console.log('best', b);
      flyers = population.agents;
  }
  for (let c of checkpoints) {
    c.show();
  }
}

function mousePressed() {
  checkpoints.push(new Checkpoint(mouseX, mouseY));
}
