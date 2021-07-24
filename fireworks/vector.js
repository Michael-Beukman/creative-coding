function Vector(x,y)
{
  this.x = x;
  this.y = y;

  this.mult = function(a)
  {
    this.x*=a;
    this.y*=a;
  }

  this.add = function(v)
  {
    this.x+= v.x;
    this.y+= v.y;
  }
}
