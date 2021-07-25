function Rocket(dna)
{
  this.vel = createVector(0,0);//p5.Vector.random2D();
  this.acc = createVector();
  this.pos = createVector(width/2,height);
  this.touching = false;
  this.crashed = false;
  this.distTraveled = 0;
  this.time = 0;
  if (dna){this.dna = dna}
  else{
    this.dna = new DNA();
  }

  this.w = 10;
  this.h = 25;
  this.col = [0,255,255];
  this.fitness = 0;

  this.applyForce = function(force)
  {
      this.acc.add(force);
  }
  this.update = function()
  {
    if (!this.touching && !this.crashed)
      {
        this.applyForce(this.dna.genes[counter]);
        this.vel.add(this.acc);
        let prevPos = this.pos.copy();
        this.pos.add(this.vel);
        this.distTraveled += Math.abs(dist(this.pos.x, this.pos.y, prevPos.x, prevPos.y));
        this.acc.mult(0);
        this.touching = this.checkTouching(target,targetSize);
        this.crashed = this.checkCrashed();
      }
      else if(this.crashed)
      {
        this.col = [255,0,0];
      }
      else
      {
        this.col = [0,255,0];
        this.pos = target.copy();
      }


  }
  this.checkCrashed = function()
  {
    //return (this.pos.x>rx && this.pos.x <rx+rw && this.pos.y >ry && this.pos.y <ry+rh) || (this.pos.y<=0 || this.pos.y >height+5 ||this.pos.x<=0 || this.pos.x >= width);
    for (r of obstacles)
    {
      // if ((this.pos.x>r.x && this.pos.x+this.w <r.x+r.w && this.pos.y >r.y && this.pos.y-this.w <r.y+r.h) || (this.pos.y<=0 || this.pos.y >height+5 ||this.pos.x<=0 || this.pos.x >= width))
      // {
      //   return true;
      // }
      if( ((this.pos.x+this.w>r.x && this.pos.x <r.x+r.w && this.pos.y < r.y+r.h && this.pos.y+this.h > r.y) || (this.pos.y<=0 || this.pos.y >height+5 ||this.pos.x<=0 || this.pos.x >= width)))
      {
        return true;
      }
      if (    ((this.pos.x>r.x && this.pos.x+this.w <r.x+r.w && this.pos.y >r.y && this.pos.y-this.w <r.y+r.h) || (this.pos.y<=0 || this.pos.y >height+5 ||this.pos.x<=0 || this.pos.x >= width)))
      {
        return true;
      }


    }
    return false;
  }
  this.checkTouching = function(other,otherSize)
  {

      let a =  Math.abs(dist(this.pos.x, this.pos.y, target.x, target.y)) <=otherSize/2;
      if (a)
      {
        this.time = counter;
      }
      return a
  }

  this.show = function()
  {
    push();
    noStroke();
    fill(this.col,150);
    rectMode(CENTER);
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    rect(0,0,this.h,-this.w);
    pop();
  }

  this.calcFitness = function()
  {
      let d = dist(this.pos.x, this.pos.y, target.x, target.y);
      //d/=10;
        this.fitness = map(d,0,h,1,0);
      //this.fitness = pow(this.fitness,2);
//      this.fitness = pow(this.fitness,2);
      //console.log(d, this.touching);
      /*
      if (d==0)
      {
        this.fitness = 1;
      }
      else{
      this.fitness = Math.abs(1/d);
      //console.log(this.fitness);
    }
    */
      if (this.touching)
      {
        //this.fitness *=2;
        //this.fitness = this.fitness +((lifespan-this.time))/lifespan;// +h/this.distTraveled //  + (1/this.distTraveled) * h ;
        //this.fitness += lifespan-this.time;
        this.fitness +=map(pow(this.time,2), 0, pow(lifespan,2), 5, 0)
      }
      if (this.crashed)
      {
        this.fitness /=10;
      }
      this.fitness = pow(this.fitness,4);

  }


}//rocket
