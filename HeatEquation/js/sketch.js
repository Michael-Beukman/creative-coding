var cDiv = document.getElementById("canvasDiv");
var h = cDiv.offsetHeight;
var w = cDiv.offsetWidth;
let dx = 0.01,
  dt = 0.00001;
let D = 1;
let boundX0 = 0;
let boundX1 = 0;
let currentArr = [];
let prevArr = [];
let alls = [];
let numTimes = 10;
let isPlaying = false;
function getInit(f) {
  const initialDistr = [getBoundary(0)];

  for (let x = dx; x < 1; x += dx) {
    initialDistr.push(f(x));
  }
  initialDistr.push(getBoundary(1));
  return initialDistr;
}
function setup() {
  let canvas = createCanvas(w, h);
  $("#btnChoose").on("click", () => changeOptions());
  $("#btnPlay").on("click", playPause);
  $("#btnNext").on("click", mousePressed);
  canvas.parent(cDiv);
  changeOptions();
  currentArr = getInit((x) => x);
}
function draw() {
  if (isPlaying) for (let i = 0; i < numTimes; ++i) mousePressed();
  background(0);
  stroke(255);
  translate(width / 2, height / 2);
  strokeWeight(1);
  drawBar(0, currentArr);
}
const getBoundary = (x) => {
  if (x == 0) return boundX0;
  else return boundX1;
};
function toScreen({ x, y }) {
  return createVector(
    (x * width) / 2 - width / 4,
    (y * height) / 2 + height / 2
  );
}

function nextValue(prevVals) {
  // explicit first,
  const newArr = prevVals.map((_) => 0);

  /**
       . 
       | 
    .__.__.  .

   */
  for (let x = 1; x < newArr.length - 1; ++x) {
    newArr[x] =
      prevVals[x] +
      ((D * dt) / (dx * dx)) *
        (prevVals[x + 1] - 2 * prevVals[x] + prevVals[x - 1]);
  }
  newArr[0] = getBoundary(0);
  newArr[newArr.length - 1] = getBoundary(1);
  return newArr;
}

function drawBar(y, heats) {
  let x = 0;
  noStroke();
  const ddx = 1 / heats.length;
  for (let h of heats) {
    const v = toScreen({ x, y });
    fill(lerpColor(color(0, 0, 255), color(255, 0, 0), h));
    rect(v.x, y, (ddx * width) / 2, 40);
    x += ddx;
    // console.log(x);
  }
}
function drawAll() {
  background(0);
  for (let i in alls) {
    drawBar(height / 2 - 40 * i, alls[i]);
  }
}
function mousePressed() {
  //   alls.push(currentArr);
  prevArr = currentArr;
  currentArr = nextValue(prevArr);
  //   console.log(currentArr);
}

function changeOptions() {
  boundX0 = parseFloat($("#Boun0").val());
  boundX1 = parseFloat($("#Boun1").val());
  const str = `
                function f (x) {return ${$("#inpFuncInit").val()}}
              `;
  eval(str);

  dx = parseFloat($("#iDX").val());
  dt = parseFloat($("#iDT").val());
  D = parseFloat($("#iD").val());
  numTimes = parseInt($("#iSpeed").val());
  // reset everything;
  alls = [];
  const initDistr = getInit(f);
  currentArr = initDistr;
}
function formSubmit() {
  return false;
}

function playPause() {
  if (isPlaying) {
    isPlaying = false;
    $("#btnPlay").html("Play >");
  } else {
    isPlaying = true;
    $("#btnPlay").html("Pause ||");
  }
}
