function Environment(x, y) {
  this.pos = createVector(x, y);
  this.w = width;
  this.h = 100;
  this.obstacles = [];
  this.speed = 5;
  this.lastPos = -1;
  this.hasSpawned = false;
  this.col = 0;
  this.obsCol = [255, 0, 0];
  this.isGoal = false;

  this.getObstacle = function(s, e) {
    if (!s) {
      s = 0;
      e = width;
    }
    if (this.lastPos == -1) {
      this.lastPos = s;
    }

    //check that obstacles are not too bunched up:
    let bIsValid;
    let temp;
    let counter = 0;
    do {
      ++counter;
      bIsValid = 1;
      let x = random(s, e);
      let w = random(jumpHeight, jumpHeight * 2);
      let h = random(jumpHeight, jumpHeight * 3);
      let y = this.pos.y - h;
      temp = new Obstacle(x, y, w, h, this.obsCol);
      bIsValid = this.checkObsDist(temp, jumpHeight * 15);
      if (counter > 20) {
        break;
      }
    } while (!bIsValid);
    if (counter <= 20) {
      this.obstacles.push(temp);
    }
  }

  this.show = function() {
    fill(this.col);
    if (!this.isGoal) {
      rect(this.pos.x, this.pos.y, this.w, this.h);
      fill(0, 255, 0);
      rect(this.pos.x + this.w - jumpHeight * 10, this.pos.y, jumpHeight * 10, this.h);

      this.drawAllTriangles();
    } else {
      ellipse(this.pos.x, this.pos.y, this.w * 2, this.w * 2)
    }
    for (let i = 0; i < this.obstacles.length; ++i) {
      this.obstacles[i].show();
    }
  }
  this.checkCollision = function(obs, p, doY = true, isCircle = false) {

    if (isCircle) {
      return (dist(obs.pos.x, obs.pos.y, p.pos.x + p.w / 2, p.pos.y + p.h / 2) <= p.w / 2 + obs.w);
    }

    if (doY) {
      //maybe remove last part of this
      if (((p.pos.x + p.w >= obs.pos.x) && (p.pos.x <= obs.pos.x + obs.w) && obs.pos.y <= p.pos.y + p.h && p.pos.y <= obs.pos.y + obs.h)) {
        return true;
      }
    } else {
      if (((p.pos.x + p.w >= obs.pos.x) && (p.pos.x <= obs.pos.x + obs.w))) {
        return true;
      }
    }
    return 0;
  }

  this.update = function(p) {
    this.pos.x -= this.speed;
    if (p.pos.y >= height) {
      return 1;
    }
    if (this.isGoal && this.checkCollision(this, p, 1, 1)) {
      return 1;
    }
    for (let i = this.obstacles.length - 1; i >= 0; --i) {
      this.obstacles[i].pos.x -= this.speed;
      //make collision;
      let obs = this.obstacles[i];
      if (this.checkCollision(obs, p)) {
        return 1;
      }
    }
    return false;
  }

  this.addObs = function(n) {
    for (let i = 0; i < n; ++i) {
      let xstart = this.pos.x + jumpHeight * 20;
      let xend = this.pos.x + this.w;
      this.getObstacle(xstart, xend);
    }
  }

  this.checkObsDist = function(newObs, minDist) {
    let isValid = true;
    for (let obs of this.obstacles) {
      if (dist(obs.pos.x + obs.w / 2, 0, newObs.pos.x + newObs.w / 2, 0) < minDist) {
        return false;
      }
    }
    return isValid;
  }

  this.drawAllTriangles = function() {
    push();
    let scale = 2;
    fill(255);
    translate(this.pos.x + this.w - jumpHeight * 5, this.pos.y + this.h);
    translate(-jumpHeight * scale, 0)
    getTriangle(this.h, scale);
    translate(2 * jumpHeight * scale, 0);
    getTriangle(this.h, scale);
    pop();
  }
}
