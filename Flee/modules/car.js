class Car
{
  constructor (x,y, stepSize = 20, w =50, h = 50, color = "#000000", type = "Rect", src = "", id = "")
  {
    this.width = w;
    this.height = h;
    this.x = x;
    this.y = y;
    this.color = color;
    this.stepSize = stepSize;
    this.vx = 0; // velocity x ;
    this.vy = 0; // velocity y ;
    this.lastx = x; //lastPosition
    this.lasty = y;
    this.maxV = spriteSize/8;
    this.type = type;
    this.src = src;
    this.id = id;
  }

  move(dir, stepSizeInc = 0)

  {
      //Direction must be U(p), D(own), L(eft), R(ight)
      var stepSize = this.stepSize + stepSizeInc;
      dir = dir.toUpperCase();
      dir = dir[0];
      var x =0;
      var y =0;
      switch (dir)
      {
        case 'U': y-=stepSize;
                  break;

        case 'D': y+=stepSize;
                  break;
        case 'L': x-=stepSize;
                  break;
        case 'R': x+=stepSize;
                  break;
      }

      //this.vx +=x;
      var tempX = this.vx +x;
      var tempY = this.vy +y;

      if (tempX >=0)
      {
        tempX = Math.min(tempX, this.maxV);
      }
      else
      {
        tempX = Math.max(tempX, -this.maxV);
      }


      if (tempY >=0)
      {
        tempY = Math.min(tempY, this.maxV);
      }
      else
      {
        tempY = Math.max(tempY, -this.maxV);
      }

      this.vx = tempX;
      this.vy = tempY;
      //this.vx = Math.min(this.vx +x,this.maxV );
      //this.vy = Math.min(this.vy +y,this.maxV );

      //this.vy +=y;
      //this.x += this.vx;
      //this.y += this.vy;
  }

  update()
  {
    this.lastx = this.x;
    this.lasty = this.y;
    this.x += this.vx;
    this.y += this.vy;
  }

}//Car
