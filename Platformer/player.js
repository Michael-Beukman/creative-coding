function Player(y) {
  this.w = 30;
  this.h = 10;
  this.numJumps = 0;
  this.maxJumps = 2;
  this.initialY = y - this.h;
  this.pos = createVector(width / 10, this.initialY);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.col = [0, 255, 255];

  this.update = function(floors) {
    if (floors) {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      //check collision of floor;

      let hasFloor = false;
      for (let floor of floors) {
        if (this.pos.y >= floor.pos.y && this.pos.y <= floor.pos.y + floor.h && floor.checkCollision(floor, this, 0) && this.vel.y <= 0) {
          //check ceiling
          this.numJumps = 0;
          this.vel.mult(0);
        } else if (this.pos.y + this.h >= floor.pos.y && this.pos.y + this.h <= floor.pos.y + floor.h && floor.checkCollision(floor, this, 0)) {
          //check floor
          this.pos.y = floor.pos.y - this.h;
          this.numJumps = 0;
          this.vel.mult(0);
          this.acc.mult(0);
          hasFloor = true;
          if (floor.pos.x + floor.w <= this.pos.x + jumpHeight * 10) {
            this.maxJumps = 3;
          } else {
            this.maxJumps = 2
          }
        }
      }
      if (!hasFloor && this.numJumps == 0) {
        this.vel.y += 1;
      }

    } else {
      return this.pos.y >= height;
    }
  }
  this.show = function() {
    fill(this.col);
    ellipse(this.pos.x + 5, this.pos.y + this.h / 2, 10, 10);
    ellipse(this.pos.x + this.w - 5, this.pos.y + this.h / 2, this.h, this.h);
    rect(this.pos.x, this.pos.y - this.h, this.w, this.h);
  }


  this.jump = function() {
    ++this.numJumps;
    if (this.pos.y != this.initialY && this.numJumps > this.maxJumps) {
      return;
    }
    if (this.maxJumps == 2) {
      this.vel.y -= 1.5 * jumpHeight;
      this.acc.y += jumpHeight / 10;
    } else {
      this.vel.y -= jumpHeight;
      this.acc.y = jumpHeight / 20;
    }
  }

}
