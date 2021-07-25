class Boundary {
  constructor(sX, sY, eX, eY, col=[50,50,50]) {
    this.start = createVector(sX, sY);
    this.end = createVector(eX, eY);
    this.diff = p5.Vector.sub(this.end, this.start);
    this.colour = col;
    this.dirX = 1;
    this.dirY = 1;
  }

  draw() {
    const a = toScreenVec(this.start);
    const b = toScreenVec(this.end);
    stroke(this.colour)
    line(a.x, a.y, b.x, b.y);
  }

  /**
   * Returns the normal at a point
   * @param {p5.Vector} point 
   * @param {p5.Vector} pos  The direction, i.e. on which side of the line
   * @returns {p5.Vector}
   */
    normal(point, dir){
        const n = createVector(this.diff.y, -this.diff.x).normalize();
        if (n.dot(dir) > 0){
            n.mult(-1)
        }
        return n;
    }
}