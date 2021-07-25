class Line {
  constructor(x, y, endX, endY, out=0) {
    this.x = x;
    this.y = y;
    this.endX = endX;
    this.endY = endY;
    this.outwards = out;
  }

  draw() {
    line(this.x, this.y, this.endX, this.endY);
  }

  spawn(doDodge = false) {
    let vec = createVector(this.endX - this.x, this.endY - this.y);
    vec.div(3);
    let normal = vec.copy();
    normal.normalize();
    let temp = normal.x;
    normal.x = normal.y;
    normal.y = temp;
    if (doDodge || 1) {
      if (this.outwards ===1) {
        normal.y *= -1;
      } else normal.x *= -1;
    } else {
      normal.x *= -1;
    }

    let xa = this.x + vec.x;
    let ya = this.y + vec.y;
    let xb = xa + vec.x;
    let yb = ya + vec.y;
    let len = vec.mag();
    normal.mult(len * sin(PI / 3));
    let xMid = (xa + xb) / 2 + normal.x;
    let yMid = (ya + yb) / 2 + normal.y;
    return [
      new Line(this.x, this.y, xa, ya, this.outwards),
      new Line(xa, ya, xMid, yMid, this.outwards),
      new Line(xMid, yMid, xb, yb, this.outwards),
      new Line(xb, yb, this.endX, this.endY, this.outwards)
    ];
  }
}
