var canvasDiv = document.getElementById('canvasDiv')
var w = canvasDiv.offsetWidth;
var h = canvasDiv.offsetHeight;
var n = 0;
var c = 15;
var dotSize = 44;
var changeDotsSize = false;
var minSize = 10;
var done = false;
var started = false;
var btnStart = document.getElementById('btnStart');
function setup()
{
  var canvas = createCanvas(w,h);
  canvas.parent('canvasDiv');
  canvas.id('canvasDraw');
  angleMode(DEGREES)
  colorMode(HSB);
  noLoop();
  noStroke();
}

function draw()
{

  if (started){
      let a = 137.5;
      let ra = radians(a);
      a =n*a;
      let r = c*sqrt(n);
      let x = r*cos(a)+width/2;
      let y = r*sin(a) + height/2;
      //console.log(c,dotSize);
      if (!done){
      fill(((a) -r) %361,100,100);
      if (changeDotsSize){
        dotSize= Math.max( r/10, minSize);
      }
      //console.log(dotSize, c, n);
      ellipse(x,y,dotSize,dotSize);
      done = x>=width-dotSize || x<=dotSize || y>=height-dotSize || y<=dotSize;
    }//if done
    canvas.style.transform = 'rotate('+ -a/360%361 +'deg)';
    ++n;
  }
}

function rainbow(n) {
    n%=255;
    return 'hsl(' + n + ',100%,50%)';
}

btnStart.onclick = function()
{
  if (started)
    {
      resetSketch();
    }
  else{
    c = parseInt(document.getElementById('sC').value);
    dotSize =  parseInt(document.getElementById('sDotSize').value);
    n = parseInt(document.getElementById('sN').value);
    btnStart.innerHTML = 'Restart';
    started = true;
    loop();
  }
}


function resetSketch()
{
  started = false;
  done = false;
  btnStart.innerHTML = 'Start';
  noLoop();
  clear();
  canvas.getContext('2d').clearRect(0,0,width, height);
}
