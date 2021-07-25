let maxSpeed = 5;
let maxForce = 1;
class Boid {
  constructor(pos) {
    this.pos = pos ? pos : createVector(random(width), random(height));
    this.vel = p5.Vector.random2D();
    this.vel.setMag(random(2, 5));
    this.acc = createVector(0, 0);
    this.angle = 0;
  }

  show() {
    push();
    let x = this.pos.x;
    let y = this.pos.y;
    translate(this.pos.x,this.pos.y);
    rotate(this.vel.heading() + PI/2);
    // noFill();
    stroke(255, 100);
    fill(255);
    let len = 4;
    // triangle(x- len / 2, y,  x+len / 2, y, x,y - 2 * len);
    x = 0;
    y=0;
    triangle(x- len / 2, y,  x+len / 2, y, x,y - 2 * len);
    // ellipse(x, y, len * 2);
    // ellipse(0, 0, len * 2);
    pop();
  }

  update() {
    this.pos.add(this.vel);
    this.pos.x = floor(this.pos.x) % width;
    this.pos.y = floor(this.pos.y) % height;
    this.vel.add(this.acc);
    this.vel.limit(maxSpeed);
    this.acc.mult(0);
  }

  doFlock(flock) {
    let alignment = this.align(flock);
    let cohesion = this.cohesion(flock);
    let separation = this.separation(flock);
    // separation.mult(1.5)
    this.acc.add(separation);
    this.acc.add(alignment);
    this.acc.add(cohesion);
  }

  align(flock) {
    let { desired, total } = this.generalAverage(flock, ({other}) => {
      return other.vel;
    });
    if (total > 0) {
      desired.div(total);
      desired.setMag(maxSpeed);
      desired.sub(this.vel);
      desired.limit(maxForce);
    }
    return desired;
  }

  cohesion(flock) {
    let { desired, total } = this.generalAverage(flock, ({other}) => {
      return other.pos;
    });
    if (total > 0) {
      desired.div(total);
      desired.sub(this.pos);
      desired.setMag(maxSpeed);
      desired.sub(this.vel);
      desired.limit(maxForce);
    }
    return desired;
  }

  separation(flock) {
    let { desired, total } = this.generalAverage(flock, ({other, d}) => {
        let diff = p5.Vector.sub(this.pos, other.pos);
        if (d!==0)diff.div(d);
        return diff;
    }, 100);
    if (total > 0) {
        desired.div(total);
        desired.setMag(maxSpeed);
        desired.sub(this.vel);
        desired.limit(maxForce);
      }
      return desired;
  }

  generalAverage(flock, func, perception=100) {
    let desired = createVector(0, 0);
    let num = 0;
    let steeringForce = createVector(0, 0);
    for (let b of flock) {
      if (b === this) continue;
      const d = p5.Vector.dist(b.pos, this.pos);
      if (d  < perception ) {
        let adding = func({other: b, d:d});
        desired.add(adding);
        ++num;
      }
    }
    return { desired: desired, total: num };
  }
}
