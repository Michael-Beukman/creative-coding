var canvasDiv = document.getElementById('canvasDiv')
let w = canvasDiv.offsetWidth;
let h = canvasDiv.offsetHeight;
var gravity;
var fireworks = [];
var children = 100;
var FireWorksFreq = 30;
var pixelSize =5;
function setup()
{
 let canvas = createCanvas(w,h);
 canvas.parent('canvasDiv');
 gravity   = createVector(0,0.25);
}
function draw()
{
  // colorMode(RGB);
  background(0,25);

  if (random() < 1/FireWorksFreq)
  {
    let col = [random(255), random(255), random(255)];
    let a = new Particle(createVector(random(width),h), col);
    let  f = new Firework(a, children);
    fireworks.push(f);
  }

  for (let i= fireworks.length-1; i>=0; --i)
  {
    fireworks[i].update();
    if (fireworks[i].particles.length ==0 && fireworks[i].exploded)
    {
        fireworks.splice(i,1);
    }
  }
  // console.log(fireworks.length);
}
