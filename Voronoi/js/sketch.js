const cDiv = document.getElementById("canvasDiv");
class Line {
  constructor(x, y, ex, ey) {
    this.x = x;
    this.y = y;
    this.ex = ex;
    this.ey = ey;
    this.dx = roundTo(ex - x, 4);
    this.dy = roundTo(ey - y, 4);
    this.m = this.dy / this.dx;
    this.c = this.y - this.m * this.x;

    this.minX = min(x, ex);
    this.maxX = max(x, ex);

    this.minY = min(y, ey);
    this.maxY = max(y, ey);

    this.start = createVector(x, y);
    this.end = createVector(ex, ey);
  }

  inX(x) {
    return x >= this.minX && x <= this.maxX;
  }
  inY(y) {
    return y >= this.minY && y <= this.maxY;
  }

  isInBetween(point) {
    if (this.inX(point.x) && this.inY(point.y)) {
      if (this.dx == 0) {
        return point.x == this.x;
      } else {
        return this.m * point.x + this.c == point.y;
      }
    }

    return false;
  }

  getIntersectPoint(other) {
    if (calcDist(this.start, other.start) < 1) return this.start;
    if (calcDist(this.start, other.end) < 1) return this.start;
    if (calcDist(this.end, other.start) < 1) return this.end;
    if (calcDist(this.end, other.end) < 1) return this.end;
    if (this.dx == 0 && other.dx == 0) {
      if (this.x == other.x) return createVector(this.x, this.y);
      return null;
    }
    if (this.dx == 0) {
      const otherY = other.m * this.x + other.c;
      if (this.inY(otherY) && other.inX(this.x)) {
        return createVector(this.x, otherY);
      }
      return null;
    } else if (other.dx == 0) {
      return other.getIntersectPoint(this);
    } else {
      // todo same slope
      if (this.m == other.m) {
        if (this.c == other.c) {
          return createVector(this.x, this.y);
        }
        return null;
      }
      const x = (other.c - this.c) / (this.m - other.m);
      if (!this.inX(x) || !other.inX(x)) return null;
        const y = this.m * x + this.c;
      if (!this.inY(y) || !other.inY(y)) return null;
      return createVector(x, y);
    }
    return null;
  }

  length() {
    return sqrt(pow(this.x - this.ex, 2) + pow(this.y - this.ey, 2));
  }

  unitVec() {
    const n = this.length();
    return new Line(0, 0, (this.ex - this.x) / n, (this.ey - this.y) / n);
  }

  angle(other) {
    const l1 = this.unitVec();
    const l2 = other.unitVec();
    const dot = l1.dx * l2.dx + l1.dy * l2.dy;
    return acos(dot);
  }
  draw() {
    line(this.x, this.y, this.ex, this.ey);
  }
  copy() {
    return new Line(this.x, this.y, this.ex, this.ey);
  }
}
let cols = [];
let boundaries = [];
let points = [];
let radii = [];
let lines = [];
let speeds = [11, 10];
let polygonLines = [];
let gotFinalResult = false;
let bestPercSoFar = 0; // for region 1
let regionWeights = [0.3, 0.4, 0.3];
let ratios = regionWeights;
let bestCircleSoFar = null;
let percToGet = regionWeights[1] * 100;
let bestLinesSoFar = null;
let bestPercLines = 0;
let pop;
let mainArea;
let  stop = false;
let LEFT_CORNER, RIGHT_CORNER, LEFT_B, RIGHT_B, CENTER, LEFT_MID, RIGHT_MID;

function validSplit(lines){
  // todo
  // loop through all points & see if there is line between
  // const lines = getLines(vertices);
  for (let i=0; i< points.length; ++i){
    for (let j=i+1; j < points.length; ++j){
      let isGood = false;
      let numIntersects = 0;
      const l = new Line(points[i].x, points[i].y, points[j].x, points[j].y);
      for (let pl of lines){
        const p = l.getIntersectPoint(pl);
        if (p !==null){
          // isGood = true;
          // break;
          ++numIntersects;
        }
      }
      isGood = numIntersects % 2 == 1;
      if (!isGood) return false;
    }
  }
  // console.log('l')
  return true;
}

function done() {
  // todo
  return lines.length > 5;
  return frameCount > 60;
}

function roundTo(x, n) {
  const p = pow(10, n);
  return round(x * p) / p;
}

function calculateLineCircleIntersection(line, center, radius) {
  //
  fill(0, 255, 0);
  if (line.dx == 0) {
    const x = line.x;
    const a = center.x,
      b = center.y;
    const X = line.x - a;
    const disc = radius * radius - X * X;
    if (disc < 0) return null;
    const s = sqrt(disc);
    const y1 = b + s;
    const y2 = b - s;
    // ellipse(x, y1, 10); ellipse(x, y2, 10);
    return [createVector(x, y1), createVector(x, y2)];
  } else {
    const a = center.x,
      b = center.y;
    const m = line.m;
    const c = line.c;
    const A = c - b;

    const alpha = m * m + 1;
    const beta = 2 * (m * A - a);
    const gamma = A * A + a * a - radius * radius;

    let disc = beta * beta - 4 * alpha * gamma;
    disc = roundTo(disc, 4);
    if (disc < 0) return null; // no intersection
    const s = sqrt(disc);
    const x1 = (-beta + s) / (2 * alpha);
    const x2 = (-beta - s) / (2 * alpha);

    const y1 = m * x1 + c;
    const y2 = m * x2 + c;

    // ellipse(x1, y1, 10); ellipse(x2, y2, 10);
    return [createVector(x1, y1), createVector(x2, y2)];
  }
}
// not needed
function calculateAreaOfCircleInsidePolygon(center, radius) {
  // calculates the area enclosed by the circle inside the polygon
  let intersectLines = [];
  let whoIsNotIn = [];
  for (let line of polygonLines) {
    const intersect = calculateLineCircleIntersection(line, center, radius);
    if (intersect === null) continue; // no intersect
    const p1 = intersect[0],
      p2 = intersect[1];
    const obj = [];
    if (line.isInBetween(p1)) {
    } else {
      obj.push(p1);
    }
    if (line.isInBetween(p2)) {
    } else {
      obj.push(p2);
    }

    intersectLines.push(new Line(p1.x, p1.y, p2.x, p2.y));
    whoIsNotIn.push(obj);
    // need to find the area of the
    // need to check if these are between start & end of line;
  }

  let doubleLines = [];
  let totalArea = 0;
  for (let i = 0; i < intersectLines.length; ++i) {
    const l = intersectLines[i];
    for (let j = i + 1; j < intersectLines.length; ++j) {
      const intersectPoint = intersectLines[i].getIntersectPoint(
        intersectLines[j]
      );
      if (intersectPoint === null) continue;
      ellipse(intersectPoint.x, intersectPoint.y, 10);
      stroke(0, 0, 255);

      line(center.x, center.y, whoIsNotIn[i][0].x, whoIsNotIn[i][0].y);
      line(center.x, center.y, whoIsNotIn[j][0].x, whoIsNotIn[j][0].y);
      line(center.x, center.y, intersectPoint.x, intersectPoint.y);
      // now subtract area of intersection sector

      const l1 = new Line(
        center.x,
        center.y,
        whoIsNotIn[i][0].x,
        whoIsNotIn[i][0].y
      );
      const l2 = new Line(
        center.x,
        center.y,
        whoIsNotIn[j][0].x,
        whoIsNotIn[j][0].y
      );
      const alpha = l1.angle(l2);
      const midLine = new Line(
        center.x,
        center.y,
        intersectPoint.x,
        intersectPoint.y
      );
      // const leftLine = new Line(intersectPoint.x, intersectPoint.y, whoIsNotIn[i][0].x, whoIsNotIn[i][0].y);
      // const rightLine = new Line(intersectPoint.x, intersectPoint.y, whoIsNotIn[j][0].x, whoIsNotIn[j][0].y);
      const leftAngle = midLine.angle(l1);
      const rightAngle = midLine.angle(l2);
      const leftTriangleArea =
        0.5 * radius * midLine.length() * sin(leftAngle / 2);
      const rightTriangleArea =
        0.5 * radius * midLine.length() * sin(rightAngle / 2);
      const sectorArea = 0.5 * radius * radius * alpha;
      const doublyCountedArea =
        sectorArea - rightTriangleArea - leftTriangleArea;
      totalArea -= doublyCountedArea;
      // other lengths:
      //
      // console.log(alpha)
    }
    line(l.x, l.y, l.ex, l.ey);
    const theta = 2 * asin(l.length() / (2 * radius));
    const areaOfSegment = 0.5 * radius * radius * (theta - sin(theta));
    totalArea += areaOfSegment;
  }
  if (totalArea != 0) {
    // console.log(totalArea);
    // console.log(intersectLines);
    // noLoop();
  }
  return PI * radius * radius - totalArea;
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent(cDiv);
  points.push(createVector(-400, -400));
  points.push(createVector(0, 0));
  points.push(createVector(0, -500));
  radii.push(0, 0);
  cols.push(
    // color(255, 0, 0, 100),
    color(0, 255, 0, 100),
    color(0, 0, 255, 100)
  );
  polygonLines = [
    new Line(-500, -600, 500, -600),
    new Line(500, -600, 500, 500),
    // new Line(500, 500, 450, 500),
    new Line(500, 500, -500, 500),
    new Line(-500, 500, -500, -600)
  ];

  const spx = [
    18.894060083648313,
    -5.6050138943519272,
    -5.6050138943519698,
    7.14435050737913,
    7.14435050737913,
    18.894060083648313,
    18.894060083648327,
    17.894060083648327,
    17.894060083648341,
    18.894060083648313
  ];

  const spy = [
    -512.72252993115001,
    -512.72252993114989,
    -536.04553129198825,
    -536.04553129198825,
    -538.36836326448406,
    -538.36836326448383,
    -529.23298908006132,
    -529.23298908006143,
    -524.84744523698112,
    -524.84744523698112
  ];

  const epx = [
    -5.6050138943519698,
    -5.6050138943519707,
    7.14435050737913,
    7.14435050737913,
    18.894060083648327,
    18.894060083648327,
    17.894060083648327,
    17.894060083648327,
    18.894060083648327,
    18.894060083648327
  ];

  const epy = [
    -512.72252993114989,
    -536.04553129198814,
    -536.04553129198825,
    -538.36836326448417,
    -538.36836326448406,
    -529.23298908006132,
    -529.23298908006132,
    -524.84744523698112,
    -524.84744523698112,
    -512.72252993115001
  ];

  // His data
  polygonLines = [];
  const scale = 40;
  const scaleX = (x) => (x - 10) * scale;
  const scaleY = (y) => -(525 + y) * scale;
  for (let i = 0; i < epy.length; ++i) {
    polygonLines.push(
      new Line(scaleX(spx[i]), scaleY(spy[i]), scaleX(epx[i]), scaleY(epy[i]))
    );
  }

  points = [
    createVector(scaleX(-1.3112878096187242), scaleY(-516.26127212821348)),
    createVector(scaleX(1.4104940822682546), scaleY(-525.34343039442456)),
    createVector(scaleX(12.4), scaleY(-530))
  ];
  for (let i = 0; i < points.length; ++i) {
    let temp = [];
    for (let j = 0; j < points.length; ++j) {
      temp.push(null);
    }
    boundaries.push(temp);
  }


  LEFT_CORNER = createVector(polygonLines[1].x, polygonLines[1].y);
  RIGHT_CORNER = createVector(polygonLines[0].x, polygonLines[0].y);
  LEFT_B = createVector(polygonLines[2].x, polygonLines[2].y);
  RIGHT_B = createVector(polygonLines[5].x, polygonLines[5].y);
  CENTER = createVector(0,0);

  LEFT_MID = p5.Vector.add(LEFT_CORNER, LEFT_B).div(2);
  RIGHT_MID = p5.Vector.add(RIGHT_CORNER, RIGHT_B).div(2);

  mainArea = calcAreaFromVerts(getPolygonsAsVerts());
  pop = new Population();

}

function calcDist(p1, p2) {
  return p5.Vector.sub(p1, p2).mag();
}

// polygons as verts
function getPolygonsAsVerts() {
  let verts = [];
  for (let l of polygonLines) {
    verts.push(createVector(l.x, l.y), createVector(l.ex, l.ey));
  }
  // get uniques
  let uniques = [];
  for (let i = 0; i < verts.length; ++i) {
    let isIValid = true;
    for (let j = i + 1; j < verts.length; ++j) {
      if (calcDist(verts[i], verts[j]) < 0.001) isIValid = false;
    }
    if (isIValid) uniques.push(verts[i]);
  }
  return uniques;
  return verts;
}

function orderVertices(vertices) {
  // first find center point
  let ave = createVector(0, 0);
  for (let v of vertices) {
    ave.add(v);
  }
  ave.div(vertices.length);
  return vertices.sort((a, b) => {
    const a1 = atan2(a.y - ave.y, a.x - ave.x),
      a2 = atan2(b.y - ave.y, b.x - ave.x);
    if (a1 < a2) return -1;
    else if (a1 == a2) return 0;
    return 1;
  });
}

function calcAreaFromVerts(vertices) {
  const orderedVertices = orderVertices(vertices);
  var total = 0;

  for (var i = 0, l = orderedVertices.length; i < l; i++) {
    var addX = orderedVertices[i].x;
    var addY = orderedVertices[i == orderedVertices.length - 1 ? 0 : i + 1].y;
    var subX = orderedVertices[i == orderedVertices.length - 1 ? 0 : i + 1].x;
    var subY = orderedVertices[i].y;
    // todo maybe abs
    // total += abs(addX * addY * 0.5);
    // total -= abs(subX * subY * 0.5);
    total += addX * addY * 0.5;
    total -= subX * subY * 0.5;
  }

  return Math.abs(total);
}

function outside(lines, point) {
  const y = point.y;
  let numIntersects = 0;
  for (let l of lines) {
    // on the polygon line, then also 'inside'
    if (l.isInBetween(point) || calcDist(l.start, point) < 5 || calcDist(l.end, point) < 5) return false;
    if (l.inY(y) && l.x > point.x) ++numIntersects;
  }
  // return false;
  return numIntersects % 2 == 0;
}

function draw() {
  translate(width / 2, height / 2);
  background(0);
  drawPolygons();
  fill(255)

  // ellipse(LEFT_CORNER.x, LEFT_CORNER.y, 20);
  // ellipse(RIGHT_CORNER.x, RIGHT_CORNER.y, 20)
  // ellipse(RIGHT_B.x, RIGHT_B.y, 20)
  // ellipse(LEFT_B.x, LEFT_B.y, 20)
  if (stop){
    findPolygonLinesAroundPoints(
      pop.best.lines
    )
    // stroke(0,0,255);
    for (let l of pop.best.lines){
      // l.draw()
    }
    for (let p of points){
      ellipse(p.x, p.y, 20)
      break;
    }

    console.log('asdasd')
    pop.calcAreaRatios(pop.best, 1);
  }
  for (let i=0; i< 100; ++i)
    pop.step();
  const b = pop.best;
  if (b.positions){
    //, LEFT_CORNER, RIGHT_CORNER, LEFT_B, RIGHT_B, CENTER
    for (let l of b.lines){
      l.draw()
    }
  // const verts = orderVertices([...b.positions]);
  // stroke(255, 0, 0)
  // for (let i=0; i< verts.length; ++i){
  //   j = (i+1) % verts.length;
    
  //   const p1 = verts[i], p2 = verts[j];
  //   line(p1.x, p1.y, p2.x, p2.y);
  // }
  // console.log(b.area);

  for (let i in points){
    let p = points[i];
    ellipse(p.x, p.y, 20)
    text(ratios[i], p.x+5, p.y);
  }

  // console.log(validSplit(verts, 0));
}
if (mouseIsPressed){
  pop.calcAreaRatios(b, 1);
}
}

function findPolygonLinesAroundPoints(lines){
  cols = [
    [255,0,0, 100],
    [0,255,0, 100],
    [0,0,255,100],
    [255,0,255,100]
  ]
  let colI = 0;
  let allLines = [];
    for (let p of points){
      // up
      const l1 = new Line(p.x, p.y, p.x, -10000);
      //down
      const l2 = new Line(p.x, p.y, p.x, 10000);
      // right
      const l3 = new Line(p.x, p.y, 10000, p.y);
      // left
      const l4 = new Line(p.x, p.y, -10000, p.y);

      const intPoints = [[], [], [], []];
      const intLines = [[], [], [], []];
      const ls = [l1, l2, l3, l4];
      let all = lines.slice().concat(polygonLines);
      for (let polyLine of all){
        for (let i=0;i<ls.length; ++i){
          const intP = ls[i].getIntersectPoint(polyLine);
          if (intP) {
            intPoints[i].push(intP);
            intLines[i].push(polyLine);
          }
        }
      }
      const polyBoundaries = [];
      let colI2 = 0;
      for (let i =0; i< ls.length; ++i){
        let minDist = 1000000;
        let minIn = -1;
        for (let j=0;j<intLines[i].length; ++j){
          const d = calcDist(p, intPoints[i][j]);
          if (minIn < 0 || minDist > d){
            minIn = j;
            minDist = d;
          }
        }
        // console.log(i, minIn);
        polyBoundaries.push(intLines[i][minIn]);
        // if (i == 2){
        // stroke(cols[colI2++])
        // ellipse(intPoints[i][minIn].x, intPoints[i][minIn].y, 10)
        // ls[i].draw();
        // }
      }
      // stroke(cols[colI++]);
      // console.log(polyBoundaries);

      // for (let l of polyBoundaries){
        // l.draw();
      // }
      // noLoop();
      allLines.push(polyBoundaries);
      // break;  

    }

    return allLines;
}

function drawPolygons() {
  for (let l of polygonLines) {
    stroke(255, 255, 255, 100);
    line(l.x, l.y, l.ex, l.ey);
  }
}

function getLineElemVerts(xBound, yBound, xFunc, yFunc) {
  let verts = [];
  let polygon = getPolygonsAsVerts();
  for (let p of polygon) {
    if (xFunc(p.x, xBound) && yFunc(p.y, yBound)) verts.push(p);
  }
  return verts;
}


function getLines(verts){
  verts = orderVertices(verts);
  let lines = [];
  for (let i=0; i< verts.length; ++i){
    j = (i+1) % verts.length;    
    const p1 = verts[i], p2 = verts[j];
    lines.push(new Line(p1.x, p1.y, p2.x, p2.y));
  }
  return lines;
}

function mousePressed(){
  stop = true;
}