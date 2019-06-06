class Flyer {
  constructor(x, y, weights, col = color(124), size = 16) {
    this.initPos = createVector(x, y);
    if (!weights) {
      weights = [
        [random() * 2 - 1, random() * 2 - 1],
        [random() * 2 - 1, random() * 2 - 1]
      ];
    }
    this.weights = weights;
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();
    this.size = size;
    this.col = col;
    this.maxVel = 5;
    this.maxForce = 1;
    this.checkpointsReached = [];
    this.dead = false;
    this.fitness = 0;
    this.lifetime = 800;
  }

  update() {      
    if (this.dead) return;
    this.lifetime -=1;
    if (this.lifetime < 0 ) this.dead = true;
    this.vel.add(this.acc);
    this.vel.limit(this.maxVel);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  applyForce(force) {
    force.limit(this.maxForce);
    this.acc.add(force);
  }

  dist(a, b) {
    return p5.Vector.sub(a, b).mag();
  }

  multWeights(w, pos) {
    // maybe sigmoid this?
    return w[0] * pos.x + w[1] * pos.y;
  }

  think(nears) {
    //todo
    const p = this.pos;
    // nears.min((a, b) => dist(a, p) - dist(b - p));
    const arr = nears.filter((chk) => this.checkpointsReached.indexOf(chk) < 0);
    if (arr.length <= 0) {
      this.dead = true;
      return;
    }
    const nearest = arr.reduce((prev, curr) =>
      this.dist(prev.pos, p) < this.dist(curr.pos, p) ? prev : curr
    );
    const pos = nearest.pos.copy();

    if (this.dist(pos, p) < nearest.r) {
      this.checkpointsReached.push(nearest);
    }
    pos.mult(nearest.isGood ? 1 : -1);
    const subs = p5.Vector.sub(pos, p);
    const xForce = this.multWeights(this.weights[0], subs);
    const yForce = this.multWeights(this.weights[1], subs);

    this.applyForce(createVector(xForce, yForce));
  }

  show() {
    if (this.dead) return;
    fill(this.col);
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading() - HALF_PI);
    triangle(
      -this.size / 2,
      -this.size / 2,
      this.size / 2,
      -this.size / 2,
      0,
      this.size / 2
    );
    pop();
  }

  copy() {
    const { x, y } = this.initPos;
    const newWeights = [
      [this.weights[0][0], this.weights[0][1]],
      [this.weights[1][0], this.weights[1][1]]
    ];
    return new Flyer(x, y, newWeights);
  }

  setColor(col) {
    this.col = col;
  }

  cross(other) {
    const newWeights = [[0, 0], [0, 0]];
    for (let i = 0; i < 2; ++i) {
      for (let j = 0; j < 2; ++j) {
        if (random() > 0.5) {
          newWeights[i][j] = this.weights[i][j];
        } else {
          newWeights[i][j] = other.weights[i][j];
        }
      }
    }
    const { x, y } = this.initPos;
    return new Flyer(x, y, newWeights);
  }

  mutate(rate = 0.1) {
    for (let i = 0; i < this.weights.length; ++i) {
      for (let j = 0; j < this.weights[i].length; ++j) {
        if (random() < rate) this.weights[i][j] = random() * 2 - 1;
      }
    }
  }
}
