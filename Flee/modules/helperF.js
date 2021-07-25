function drawRect(gArea,cObj)

{
  gArea.ctx.clearRect(0, 0, gArea.canvas.width, gArea.canvas.height);
  gArea.ctx.fillStyle = "#FF0000";
  gArea.ctx.fillRect(0,0,gArea.canvas.Width, gArea.canvas.Height);
  //console.log(gArea.canvas.Width, gArea.canvas.Height);
  gArea.ctx.fillStyle = cObj.color;
  gArea.ctx.fillRect(cObj.x, cObj.y, cObj.width, cObj.height);
  //gArea.ctx.fillRect(0, 0, 100, 100);
}


function checkKey(obj, oBoard,e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        obj.move('U');
        // up arrow
    }
    else if (e.keyCode == '40') {
        obj.move('D');
        // down arrow
    }
    else if (e.keyCode == '37') {
      obj.move('L');
       // left arrow
    }
    else if (e.keyCode == '39') {
      obj.move('R');
       // right arrow
    }
    else
    {
      return;
    }
    //oBoard.draw(obj);


}// Car

function checkCollision(oC,oB)
{
  //Checks if there is a collision, and returns velocities -- Bounces;
  var vx = oC.vx;
  var vy = oC.vy;
  var ratio =-1;
  if (Math.abs(vy) >=40 || Math.abs(vx)>=40)
  {
    ratio = -1;
  }
  var paddingX = 0;//(oC.vx);
  var paddingY = 0;//(oC.vy);
  //console.log(oC.x, oB.startX,oB.startX+ oB.x );
  if (oC.x <= oB.startX+paddingX || oC.x+ oC.width>= oB.startX + oB.w-paddingX)

  {

    vx *= ratio;
  }

  if (oC.y <= oB.startY+paddingY || oC.y+ oC.height >= oB.startY + oB.h-paddingY)

  {
    vy *= ratio;
  }
  //console.log(vx,vy);
  //console.log(oC.x, oC.y);
  return [vx, vy];

}

function checkCollisionGameOver(oB, oC, oEList, checkBorders= true)
{
  //Checks to see if oC is touching either oB or oE, if so return True, else False
  var ans = false;
  result = false;
  var count = 0;
  var indices = -1;
  if (checkBorders){
  if (oC.x <= oB.startX || oC.x+ oC.width>= oB.startX + oB.w)

  {
    result = true;
  }

  if (oC.y <= oB.startY || oC.y+ oC.height >= oB.startY + oB.h)

  {
    result = true;
  }

  if (result)
  {
    return [result,0,0];
  }
}//if checkBorders

  for (var i in oEList){
    //result = false;
    oE = oEList[i];
//x:

  if ( oE.x + oE.width  >= oC.x && oC.x + oC.width >= oE.width + oE.x )
  {
    if ( oE.y + oE.height  >= oC.y && oC.y + oC.height >= oE.height + oE.y )
    {
      //console.log('A');
      result = true;
    }


    if ( oE.y >= oC.y && oC.y + oC.height >= oE.y )
    {
      //console.log('B');
      result = true;
    }

  }


  if ( oE.x >= oC.x && oC.x + oC.width >= oE.x )
  {
    if ( oE.y + oE.height  >= oC.y && oC.y + oC.height >= oE.height + oE.y )
    {
      //console.log('D');
      result = true;
    }


    if ( oE.y >= oC.y && oC.y + oC.height >= oE.y )
    {
      //console.log('E');
      result = true;
    }

  }

  if (result)
  {
    ++count;
    indices =i;
    ans = true;
    result = false;
  }

}//for i
//console.log('Ans', ans, result);
return [ans,count, indices];
}


function getEnemyVelocity(oE, oC)

{
    maxSpeed = oE.stepSize;
    var vx, vy;
    var xDiff = oE.x -oC.x;
    var yDiff = oE.y - oC.y;
    if (xDiff ==0)
    {
      vx = 0;
      vy = maxSpeed;
    }
    else if (yDiff ==0)
    {
      vx = maxSpeed;
      vy = 0;
    }
    else{
    //var vy = Math.sqrt(25 /( Math.pow(yDiff/xDiff , 2)) + 1);
    vy = Math.sqrt(maxSpeed*maxSpeed * yDiff * yDiff / (xDiff * xDiff + yDiff * yDiff));
    if (yDiff <0 )
    {
      vy = Math.abs(vy);
    }
    else
    {
      vy = -Math.abs(vy);
    }
    //var vx = yDiff/xDiff * vy;
    vx = Math.sqrt(maxSpeed*maxSpeed - vy*vy);
    if (xDiff <0 )
    {
      vx = Math.abs(vx);
    }
    else
    {
      vx = -Math.abs(vx);
    }
    //console.log(xDiff, yDiff, vx,vy);
  }
    return[vx,vy];

}
function fitTextOnCanvas(text,fontface, oB){

    // start with a large font size
    var fontsize=300;

    // lower the font size until the text fits the canvas
    do{
        fontsize--;
        oB.ctx.font=fontsize+"px "+fontface;
    }while(oB.ctx.measureText(text).width>canvas.width)

return fontsize;
}

function render(oB, cObj)
{
  //console.log(oB ,img);
  var startX = 0;
  var startY = 0;
  if (cObj.id == 'E')
  {
    startX+=150;
  }
  else if (cObj.id == 'P')
  {
    startX =300;
  }
  oB.ctx.drawImage(img, startX, startY, 150, 150, cObj.x, cObj.y, cObj.width, cObj.height);
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
        y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
}

function moveFromMouse(m , p, obj)
{
  let tol = spriteSize *3;
  let dy = Math.abs(m.y  -p.y);
  let dx = Math.abs(m.x  -p.x);
  if ((m.x <= p.x+tol && m.x >= p.x-tol))// || dy >4*dx )
  {

    //x is same

  }
  else
  {
      //x is diff
      if (m.x < p.x)
      {
        obj.move('L');
      }
      else
      {
        obj.move('R');
      }
  }

  if ((m.y <= p.y+tol && m.y >= p.y-tol))// || dx > 4*dy)
  {

    //y is same

  }
  else
  {
    //y is diff
    if (m.y < p.y)
    {
      obj.move('U');
    }
    else
    {
      obj.move('D');
    }
  }

}


function mDownClick(e)
{
  //console.log(e);
  var mPos = getMousePos(b.canvas, e);
  var pPos = {x: oCar.x, y: oCar.y}
  //console.log(mPos, pPos);
  moveFromMouse(mPos, pPos, oCar);
}
