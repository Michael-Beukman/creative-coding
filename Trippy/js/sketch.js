var cDiv = document.getElementById("canvasDiv");
var h = cDiv.offsetHeight;
var w = cDiv.offsetWidth;
const people = [];
let moveSpeed;

function setup() {
  let circleSpeed = 0.1;
  const time = circleSpeed * 2 * PI;
  moveSpeed = width / time / 1000 * 100;
  let canvas = createCanvas(w, h);
  canvas.parent(cDiv);
  for (let i = 0; i < 20; ++i) {
    people.push(
      new Person(
        random(width),
        random(height),
        random(10, 100),
        [],
        { x: random(-moveSpeed, moveSpeed), y: random(-moveSpeed, moveSpeed) },
        false
      )
    );
  }
}

function draw() {
  for (let p of people) {
    p.update();
    p.show();
  }
}
