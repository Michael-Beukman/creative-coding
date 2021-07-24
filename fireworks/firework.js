function Firework(p, c)
{
  this.particle = p;
  this.exploded = false;
  this.particles = [];
  this.children = c;
  this.color = this.particle.color;
  this.explode = function()
  {
    this.exploded = true;
    for (var i =0; i<this.children; ++i)
    {
      var s = new Particle(this.particle.pos.copy(), this.color, true);
      s.update();
      s.show();
      s.acc = createVector(0,0);
      this.particles.push(s);
    }
  }

  this.update = function()
  {

    if (!this.exploded){
    this.particle.applyForce(gravity);
    this.particle.update();
    this.particle.show();
    if (this.particle.vel.y>=0)
    {
      this.explode();
    }

  }
  else
  {
      for (var i =this.particles.length-1; i>=0; --i)
      {
        if (this.particles[i].pos.y>=canvas.height || this.particles[i].lifetime<=0)
        {
          this.particles.splice(i,1);
          continue;
        }

        this.particles[i].applyForce(gravity);
        this.particles[i].update();
        this.particles[i].show();
      }
  }
  //exploded
  }
}
