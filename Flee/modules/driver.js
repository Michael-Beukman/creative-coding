// #################################################################### //
//                              Main
// #################################################################### //

// VARS
var Score = 0;
var hOffset = (document.getElementById('scoreHeader').offsetHeight);
var spriteSize = hOffset/2;
var enemySpeed = spriteSize/5;
var h = window.innerHeight-hOffset;
var w = window.innerWidth;
let oCar  = new Car (w/2,h/2,5, spriteSize,spriteSize, "#0000FF", 'img', 'blabla', 'P');
let b = new board(w, h  , 0, 0);
let enemy = [new Car(0,0,spriteSize/10,spriteSize,spriteSize, "#FF0000", 'img', 'modules/images/spritesheet.png', 'E')];//, new Car(100,800,5,40,40, "#FF0000")]
//enemy = [];
let goals = [new Car(w/3,h/3,6,spriteSize,spriteSize, "#FFFF00",'img', 'modules/images/spritesheet.png', "G")];
var img = new Image();
img.src = 'modules/images/sp2.png';

var allSprites =  enemy.concat([oCar])
// VARS END

b.draw(allSprites );
cObj = goals[0];




document.onkeydown = function (){checkKey(oCar, b, window.event);}

/*document.onmousedown = function(){
   mPressVar = setInterval(function(){console.log(getMousePos(b.canvas, window.event))},10)
  ;};
document.onmouseup = function(){
  clearInterval(mPressVar);
};
*/
/*
window.addEventListener('mousedown',
function(s){
mPressVar  = setInterval(function(){mDownClick(s)},10);}
, false);

window.addEventListener('mouseup', function(){clearInterval(mPressVar)}, false);
*/

window.addEventListener('pointerdown',
function(s){
  //console.log('a');
  try {
    clearInterval(mPressVar);
  } catch (e) {

  } finally {

  }

mPressVar  = setInterval(function(){mDownClick(s)},50);}
, false);

window.addEventListener('pointerup', function(){ clearInterval(mPressVar)}, false);

var start = 0;

  interval = setInterval(function(){

    perFrame(oCar, b, enemy, goals);
  } ,10);
