class cPlane
{
  constructor(w,h, sX,sY, dColor = "#00FFFF")
  {
    this.h = h;
    this. w = w;
    this.startX = sX;
    this.startY =sY;
    this.dColor = dColor;
    this.canvas = document.createElement("canvas");
    this.canvas.id = "canvas";
    this.canvas.className = "canvas";
    this.canvas.width = w;
    this.canvas.height = h;
    this.ctx = this.canvas.getContext("2d");
    this.ctx.textAlign = "center";
    document.getElementById('canvasDiv').appendChild(this.canvas);
    this.ctx.fillStyle  = 'ffffff';
    this.offsetX = w/2;
    this.offsetY = h/2;
    this.minX = 0;
    this.minY = h;
    this.maxX = w;
    this.maxY = 0;
    this.lineThickness = 4;
    this.ctx.lineWidth = this.lineThickness;
  }

draw(x,y, size=1)
{
  
  this.ctx.moveTo(this.offsetX, this.offsetY);

  this.ctx.beginPath();
  this.ctx.lineWidth = 4;
  this.ctx.strokeStyle = '#FF0000';
  for (var i in x)
  {
    //this.ctx.fillRect(x[i]+this.offsetX, y[i]+this.offsetY, size, size);
    this.ctx.lineTo(x[i]+this.offsetX, y[i]+this.offsetY);
    //this.ctx.lineTo()
    this.ctx.moveTo(x[i]+this.offsetX, y[i]+this.offsetY)

  }
this.ctx.stroke();
}

getAxes()
{
this.ctx.moveTo(this.minX,this.h/2);
this.ctx.beginPath();
for (var i =this.minX; i<=this.maxX; ++i)

{
  this.ctx.lineTo(i,this.h/2);
}
this.ctx.stroke();
this.ctx.moveTo(this.w/2, this.maxY);
this.ctx.beginPath();

for (var i =this.maxY; i<=this.minY; ++i)

{
  this.ctx.lineTo(this.w/2,i);
}

this.ctx.stroke();
}

}


var hOffset = (document.getElementById('headerDiv').offsetHeight);
var h = window.innerHeight-hOffset;
var w = window.innerWidth;
let plane = new cPlane(w, h  , 0, 0);


function getLine(minX, maxX)
{
  let x1 = [];
  let y1 = [];
  for (var i = minX; i<=maxX; ++i)
  {
    var s = i;
    x1.push(s);
    y1.push(-s*s);
  }//for i
  return {
      x: x1,
      y: y1
  };

}

let points = getLine(-1000,1000);
console.log(points);
//x = [10,20,30];
//y  =[10,20,30]
plane.getAxes();
  plane.draw(points.x,points.y);
