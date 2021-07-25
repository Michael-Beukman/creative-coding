
function updateGame(oC, oB, oEList, oGList)
{
  //Function that needs to run every frame
  for (var i in oEList){
    var oE = oEList[i];
    var s = getEnemyVelocity(oE, oC);
    oE.vx = s[0];
    oE.vy = s[1];
    oE.update();
    //oB.drawEfficient([oC,oE]);
  }


oC.update();

var goalsReached =  checkCollisionGameOver(oB, oC, oGList, false);

if ( goalsReached[1] >0 )
{
  ++Score;
  oB.ctx.fillStyle = oB.dColor;
  var temp = oGList[goalsReached[2]];
  //console.log('temp',temp);
  //console.log('Oglist before', oGList);
  //console.log('goalsReached', goalsReached);
  oB.ctx.fillRect ( temp.x-1, temp.y-1, temp.width+2, temp.height +2);
  oGList.splice(goalsReached[2], 1);
  //console.log('Oglist after', oGList);
}
if (oGList.length > 0){
for (var i in oGList)
{
  oGList[i].update();
}
}

oB.drawEfficient(oEList.concat([oC]).concat(oGList));
  var isGameOver = checkCollisionGameOver(oB,oC,oEList, true)[0];
  if (isGameOver)
  {
    return true;
  }
return false;
}



function perFrame(oC, oB, oE, oG)
{
  //window.alert('busy');
  var isDone =  updateGame(oC, oB, oE, oG);
  if (isDone)
  {
    //document.getElementById("scoreHeader").innerHTML += "Game Over";
    oB.clear();
    var tList = ['Game Over','Score: '+Score,'Time Survived: '+ start/1000 + " seconds", 'Click to restart']

    var minSize = 10000;
    for (var i in tList)
    {
      minSize= Math.min( minSize, fitTextOnCanvas(tList[i], "Arial",  oB) )
    }

    oB.ctx.fillStyle = "red";
    oB.ctx.font=minSize+"px "+"Arial";
    var pos = oB.h/2 - minSize*tList.length/3;
    for (var i in tList){
      oB.ctx.fillText(tList[i], oB.w/2, pos);
      pos += minSize;
    }
    oB.canvas.onclick = function(){location.reload()};
    //oB.ctx.fillText('yee',100,100);
    clearInterval(interval);
  }// if isDone
  else{
  start +=10;
  if (start % 100 ==0){
    document.getElementById('scoreHeader').innerHTML ="Time survived: " + start/1000 + " seconds </br> Score: " + Score;
}
if (start % 10000==0)
{
  //Add new enemy
  var newX = 0;
  var newY = 0;
  var sizeW = Math.random() * 20  + 20;
  var sizeH = Math.random() * 20  + 20;
  var speed = Math.random() * (enemySpeed -4) + 3; // between 3 & 7.5
  oE.push(new Car(newX,newY,speed,spriteSize,spriteSize, "#FF0000", 'img', 'modules/images/coin.png', "E"));
}//if % 10K
if (start % 5000 ==0)
{
  newX = Math.random() * oB.w;
  newY = Math.random() * oB.h;
  oG.push(new Car(newX,newY,0,spriteSize,spriteSize, "#FFFF00", 'img', 'modules/images/coin.png', "G"));
}
if (start %30000 ==0)
{
  oC.maxV *=1.2;
  enemySpeed*=1.15;
}
} //else isDone
}
