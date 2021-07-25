function Particle(pos, color, isExplosion = false)
{
  this.lifetime = 255;
  this.pos = pos;
  this.isExplosion = isExplosion;
  if (isExplosion)
  {
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(2,10));
  }
  else{
    this.vel = createVector(random(-5,5),random(h/100,h/60))
    this.vel.y = -Math.abs(this.vel.y);
  }
  this.acc  = createVector(0,0);
  this.color = color;
  this.pixelSize= pixelSize;

  this.applyForce = function(force)
  {
    this.acc.add(force);
  }

  this.update = function()
  {
    if (this.isExplosion)
    {
      this.vel.mult(0.95);
      this.lifetime -=4;
    }

    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  this.show = function()
  {
    fill(this.color[0], this.color[1], this.color[2], this.lifetime);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.pixelSize, this.pixelSize);
  }

}
