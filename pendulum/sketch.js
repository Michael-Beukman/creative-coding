var cDiv = document.getElementById('canvasDiv');
var h = cDiv.offsetHeight;
var w = cDiv.offsetWidth;
var a;
var r;
var size;
var dir;
var oX, oY; //origin
var pend;
var gravity =0.5;
var pend2;
var m1, m2;
var a1, a2;
var a1_v, a2_v;
var l1, l2;
var btnS;
var sM1, sM2, sL1, sL2, sA1, sA2;

var started=false;
function setup()
{
  var canvas = createCanvas(w,h);
  canvas.parent(cDiv);
  btnS = document.getElementById('btnS');
  sM1 = document.getElementById('iM1');
  sM2 = document.getElementById('iM2');
  sL1 = document.getElementById('iL1');
  sL2 = document.getElementById('iL2');
  sA1 = document.getElementById('iA1');
  sA2 = document.getElementById('iA2');
  btnS = document.getElementById('btnStart');

  sM1.onchange = function(){setVars(false)};
  sM2.onchange = function(){setVars(false)};
  sL1.onchange = function(){setVars(false)};
  sL2.onchange = function(){setVars(false)};
  sA1.onchange = function(){setVars(false)};
  sA2.onchange = function(){setVars(false)};


  btnS.onclick = fStart;
  setVars();
}

function draw()
{
  background(42);
  translate(oX,oY);
  // sA1.value = a1;
  // sA2.value = a2;
  if (!started){
    setVars();
    pend = new Pendulum(l1,m1, a1);
    pend2 = new Pendulum(l2,m2, a2,  pend.pos.x, pend.pos.y, 1);
    pend.show();
    pend2.show();
  }
  else{
    a1 = pend.a;
    a2 = pend2.a;
    a1_v = pend.vel;
    a2_v = pend2.vel;
    pend.show();
    pend2.show();
    pend.update();
    pend2.origin = pend.pos;
    pend2.update();
  }
}

function setVars(news=true){
  // a=0;
  // r=100;
  // size=20;
  dir=1;
  oX = width/2;
  oY = height/8;
  l1= parseInt(sL1.value);
  l2= parseInt(sL2.value);
  m1 = parseInt(sM1.value);
  m2 = parseInt(sM2.value);
  a1=parseFloat(sA1.value);
  a2=parseFloat(sA2.value);
  if (news){
    pend = new Pendulum(l1,m1, a1);
    pend2 = new Pendulum(l2,m2, a2,  pend.pos.x, pend.pos.y, 1)
  }
  else{
    if (started){
      pend.l = l1;
      pend2.l = l2;
      pend.r = m1;
      pend2.r = m2;
      pend.a=a1;
      pend2.a =a2;
    }
  }
}

function fStart(){
  if (started){
    setVars();
    btnStart.innerHTML = 'Restart';
  }
  else{
    btnStart.innerHTML = 'Start';
  }
  started = !started;
}
