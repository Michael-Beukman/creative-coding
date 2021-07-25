var cDiv = document.getElementById("canvasDiv");
var h = cDiv.offsetHeight;
var w = cDiv.offsetWidth;
let numGrids = 20;
let xSpace, ySpace;
let t=0;
const checkNorm = $('#chkNormalize')[0];
const inpSpeed = $('#inpSpeed');
let params = {};
let opts = {
  checked: false,
  speed:0.01,
  xFunc: 'y * sin(t)',
  yFunc: 'x * cos(t)'
};

function setup() {
  //x = x * (a*sin (t) + a*cos(t) + c*y) + y * (d*sin (t) + e*cos(t))
  //y = x * (g*sin (t) + h*cos(t) + i*y) + y * (j*sin (t) + k*cos(t) + l*x)
  let canvas = createCanvas(w, h);
  canvas.parent(cDiv);
  xSpace = width/numGrids;  
  ySpace = height/numGrids;  
  $('#inpXFunc').on('change', updateXFunc);
  $('#inpYFunc').on('change', updateYFunc);
  params = {};
}

function getX(x, y){
  const {a, b, c, d, e} = params;
  return x * (a*sin (t) + b*cos(t) + c*y) + y * (d*sin (t) + e*cos(t))
  // return eval(opts.xFunc);
  // return y * sin(millis() /1000) //+ y * cos(millis()/1000);
  return y * sin(t) //+ y * cos(millis()/1000);
}

function getY(x, y){
  const {g, h, i, k, j} =params;
  return x * (g*sin (t) + h*cos(t) + i*y) + y * (j*sin (t) + k*cos(t))
  // return x * cos(t) //+ x * sin(millis()/1000);
  // return x * cos(millis()/1000) //+ x * sin(millis()/1000);
}

function draw() {
  checkOpts();
  background(0);
  stroke(255);
  t += opts.speed;
  translate(width/2, height/2);
  for (let i=-numGrids/2; i<=numGrids/2; ++i){
    for (let j=-numGrids/2; j<=numGrids/2; ++j){
        const x = getX(i, j);
        const y = getY(i, j);
        const vec = createVector(x - i, y - j);
        const c = vec.mag();
        if (opts.checked)
          vec.normalize();
        stroke(map(c, 0, 30, 0, 255), map(c, 0, 30, 255, 0), 0);
        line(i*xSpace,   j * ySpace, (i+vec.x) * xSpace, (j+vec.y) *ySpace);
    }
  }
}

function updateXFunc(){
  opts.xFunc = $('#inpXFunc').val();
}

function updateYFunc(){
  opts.yFunc = $('#inpYFunc').val();
}

function checkOpts(){
  checkParams();
  opts.checked = checkNorm.checked;
  opts.speed = parseFloat(inpSpeed.val())
}
function checkParams(){
  for (let i=0; i < 12;++i){
    const c = char('a'.charCodeAt(0) + i);
    params[c] = parseFloat($('#inp'+c.toUpperCase()).val());
  }
}