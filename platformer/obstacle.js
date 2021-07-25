function Obstacle(x, y, w, h, col)
{
  this.pos = createVector(x, y);
  this.w = w;
  this.h = h;
  this.col = col;

  this.show = function()
  {
      fill(this.col)
      rect(this.pos.x, this.pos.y, this.w, this.h);
  }

}
