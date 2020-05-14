class Ball {
  /**
   *
   * @param {p5.Vector} pos
   * @param {p5.Vector} vel
   * @param {p5.Vector} acc
   */
  constructor(pos, vel = null, acc = null, r = 40, id = null) {
    this.pos = pos;
    this.vel = vel || p5.Vector.random2D().mult(1000); //createVector();
    this.acc = acc || createVector();
    this.r = r;
    this.col = [255, 255, 255];
    this.id = id;
    this.mass = this.r;
  }

  /**
   * Changes this ball and returns a reference
   * @return Ball
   */
  update() {
    
    const tmp = p5.Vector.add(this.vel, this.acc.mult(deltaTime));
    let newP = p5.Vector.add(p5.Vector.mult(tmp, (deltaTime)), this.pos);
    let newV = tmp;
    if (newP.x >= width / 2- this.r || newP.x <= -width / 2+ this.r) {
      // reflect
      newP = this.pos.copy();
      newV = this.reflect(newV, createVector(newP.x > 0 ? -1 : 1, 0));
    } else if (newP.y >= height / 2 - this.r || newP.y <= -height / 2 +  this.r) {
      newP = this.pos.copy();
      newV = this.reflect(newV, createVector(0, newP.y > 0 ? -1 : 1));
    }

    const newA = createVector(-this.vel.x*0., -this.vel.y*0.);
    // const b = new Ball(newP, newV, newA, this.r, this.id);
    // b.col = this.col;
    this.pos = newP;
    this.vel = newV;
    this.acc = newA;
    return this;
  }

  intersect(other) {
    return (
      p5.Vector.sub(this.pos, other.pos).magSq() <= pow(other.r + this.r, 2)
    );
  }

  /**
   * @returns {Ball}
   */
  copy() {
    const b = new Ball(
      this.pos.copy(),
      this.vel.copy(),
      this.acc.copy(),
      this.r,
      this.id
    );
    b.col = this.col;
    return b;
  }

  draw() {
    stroke(this.col);
    noFill();
    ellipse(this.pos.x, this.pos.y, this.r * 2);
    const tmp = this.vel.copy();
    const mag = tmp.mag()/1000;
    strokeWeight(min(max(1, mag * 2), 5));
    tmp.normalize();
    // console.log(tmp, tmp.x == 0 && tmp.y == 0);
    if (tmp.x == 0 && tmp.y == 0) {
      tmp.x = 1;
    }
    tmp.mult(this.r);
    // console.log(tmp)
    line(this.pos.x, this.pos.y, this.pos.x + tmp.x, this.pos.y + tmp.y);
    strokeWeight(1);
  }

  reflect(v1, n) {
    const d = p5.Vector.dot(v1, n);
    const asq = n.magSq();
    return p5.Vector.sub(v1, p5.Vector.mult(n, (2 * d) / asq));
  }
}
