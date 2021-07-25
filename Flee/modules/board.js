class board
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

  }

  draw ( arrObj = [] )
  {
    //console.log(arrObj);
    var imgs =[];
    this.ctx.clearRect(0, 0, this.w, this.h);
    this.ctx.rect(0, 0, this.w, this.h);
    //this.ctx.lineWidth = 100;
    //this.ctx.strokeStyle  = "black";
    //this.ctx.stroke();
    this.ctx.fillStyle = this.dColor;
    //this.ctx.fillRect(0,0, this.w, this.h);
    this.ctx.fill();

    for (var i in arrObj){
      var cObj = arrObj[i];
    //console.log(cObj);
    this.ctx.fillStyle = cObj.color;
    //console.log(cObj.color);
    if (cObj.type == 'Rect'){
    this.ctx.fillRect(cObj.x, cObj.y, cObj.width, cObj.height);
  }
  else if (cObj.type == 'Circle')
  {
    this.ctx.beginPath();
    this.ctx.arc(cObj.x,cObj.y,cObj.height,0,2*Math.PI);
    this.ctx.stroke();
    this.ctx.fill();
  }//elif

  else if (cObj.type == 'img')// && cObj.id == 'G')
  {
    render(this, cObj);
  }//elif2

  }

  }

drawEfficient( arrObj = [], broken = false )
{
  //this.ctx.rect(0, 0, this.w, this.h);
  for (var i in arrObj){
    var cObj = arrObj[i];
    this.ctx.fillStyle = this.dColor;
    if (!(cObj.x ==cObj.lastx && cObj.y == cObj.lasty)){
    this.ctx.fillRect(cObj.lastx-1, cObj.lasty-1, cObj.width+2, cObj.height+2);
  }
  }

  for (var i in arrObj){
    var cObj = arrObj[i];
    //this.ctx.fillStyle = this.dColor;
    //this.ctx.fillRect(cObj.lastx-1, cObj.lasty-1, cObj.width+2, cObj.height+2);
    if (cObj.type == 'img')
    {
    //  if (cObj.id == 'G'){
    //  console.log(cObj);
    //}
      render(this, cObj);
      }//if1
      else{
      this.ctx.fillStyle = cObj.color;
      this.ctx.fillRect(cObj.x, cObj.y, cObj.width, cObj.height);
    }

}

    if (broken){
    this.ctx.rect(0, 0, this.w, this.h);
    this.ctx.lineWidth = 10;
    this.ctx.strokeStyle  = "black";
    this.ctx.stroke();
}

}

clear()
{
  //Clears canvas, fills with defaultColour;
  this.ctx.fillStyle = this.dColor;
  this.ctx.fillRect(this.startX, this.startY,this.w, this.h);
}

}//board
