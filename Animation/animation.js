let canvasDiv = document.getElementById('canvasDiv')
let w = canvasDiv.offsetWidth;
let h = canvasDiv.offsetHeight;
let images = [];
let numImages = 7;
let imgName = 'horse-run';
function preload(){
  for (let i=0; i<numImages; ++i){
    images[i] = loadImage('assets/'+imgName + '-0'+i+'.png');
  }
}
function setup()
{
  var canvas = createCanvas(w,h);
  canvas.parent('canvasDiv');
  frameRate(20);
}

function draw()
{
  background(0);
  image(images[frameCount %  numImages],0 ,0);
}
