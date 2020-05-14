var cDiv = document.getElementById("canvasDiv");
var h = cDiv.offsetHeight;
var w = cDiv.offsetWidth;
let points = [];
const s = 1;

function setup() {
  let canvas = createCanvas(w, h, WEBGL);
  canvas.parent(cDiv);
  points = [
    new Vec4(-s, -s, -s, 0),
    new Vec4(s, -s, -s, 0),
    new Vec4(s, s, -s, 0),
    new Vec4(-s, s, -s, 0),
    new Vec4(-s, -s, s, 0),
    new Vec4(s, -s, s, 0),
    new Vec4(s, s, s, 0),
    new Vec4(-s, s, s, 0),
  ];

  points = points
    .map((v) => {
      v.w = s;
      return v;
    })
    .concat(
      points.map((v) => {
        return new Vec4(v.x, v.y, v.z, -s);
      })
    );

  // points[5+8].w = -5
}

function connectIndices(i, i1, arr = null) {
  arr = arr || points;
  connect(arr[i], arr[i1]);
}

function connect(p, pNext) {
  line(p.x, p.y, p.z, pNext.x, pNext.y, pNext.z);
}
/**
 * Multiplies mat with vec
 * @param {number[][]} mat
 * @param {Vec4} vec
 */
function matmul(mat, vec) {
  let ans = [];
  for (let row of mat) {
    // now we create a single row in the vec
    ans.push(row[0] * vec.x + row[1] * vec.y + row[2] * vec.z + row[3] * vec.w);
  }
  return new Vec4(ans[0], ans[1], ans[2], ans[3]);
}

function draw() {
  // scale(100)
  translate(0, 100 * 3);
  //   rotateY(millis() * 0.001);
  rotateX(-PI/2)
  background(0);
  stroke(255);
  // noFill();
  let r = 10;
  let projected3d = [];
  for (let i in points) {
    let p = points[i];
    let distance = 2 * s;
    // let w = 1;
    let angle = millis() / 1000;
    let rotXY = [
      [cos(angle), -sin(angle), 0, 0],
      [sin(angle), cos(angle), 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1],
    ];
    let rotXZ = [
      [cos(angle), 0, sin(angle), 0],
      [0, 1, 0, 0],
      [-sin(angle), 0, cos(angle), 0],
      [0, 0, 0, 1],
    ];

    let rotZW = [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, cos(angle), -sin(angle)],
      [0, 0, sin(angle), cos(angle)],
    ];

    let rotated = matmul(rotXY, p);
    rotated = matmul(rotZW, rotated);
    // let projected = matmul(projMatrix, matmul(rotXY, matmul(rotXZ, p)));

    let w = 1 / (distance - rotated.w);
    let projMatrix = [
      [w, 0, 0, 0],
      [0, w, 0, 0],
      [0, 0, w, 0],
    ];
    let projected = matmul(projMatrix, rotated);
    projected.mult(100);
    projected3d.push(projected);

    push();
    translate(projected.x, projected.y, projected.z);
    sphere(r);
    pop();
    point(projected.x, projected.y, projected.z);
  }
  //   return;
  // connect things
  for (let i = 0; i < 4; ++i) {
    connectIndices(i, (i + 1) % 4, projected3d);
    connectIndices(i + 4, ((i + 1) % 4) + 4, projected3d);
    connectIndices(i, i + 4, projected3d);
    // break
  }
  for (let i = 0; i < 8; ++i) {
    connectIndices(i, i + 8, projected3d);
  }
  for (let i = 8; i < 12; ++i) {
    connectIndices(i, ((i + 1) % 4) + 8, projected3d);
    connectIndices(i + 4, ((i + 1) % 4) + 12, projected3d);
    connectIndices(i, i + 4, projected3d);
  }
}
