var cDiv = document.getElementById('canvasDiv');
var h = cDiv.offsetHeight;
var w = cDiv.offsetWidth;
let maxVal;
let set;
let maxIterations;
let rC, iC;
let range;
let angle;
let changed;
let inpRange, inpReal, inpIm, selSet;

function setup() {
  var canvas = createCanvas(w, h);
  canvas.parent(cDiv);
  z = 0;
  maxIterations = 50;
  range = 2.5;
  pixelDensity(1);
  // loadPixels();
  // rC = -0.8;
  // iC =0.156;
  // rC = 0255;
  // iC =0.8;
  // rC = -0.7269;
  // iC = 0.1889;
  rC = -0.5;
  iC = -1;
  angle = 0;
  changed = true;

  inpRange = select('inpRange');
  inpReal = select('inpRC');
  inpIm = select('inpIC');
  selSet = select('selSet');
  selSet.onchange = inpChanged;
  inpRange.onchange = inpChanged;
  inpReal.onchange = inpChanged;
  inpIm.onchange = inpChanged;
  inpChanged();
  // colorMode(HSB,100);
}

function draw() {
  //z = z^2 + C;
  // rC = -0.8;
  // iC=0;
  // rC = map(mouseX, 0, width, -1, 1);
  // iC = map(mouseY, 0, height, -1, 1);
  // rC +=0.01;
  // iC+=-0.01;
  // if (rC>=1){
  //   rC=-1;
  // }
  // if (iC>=1){
  //   iC=-1;
  // }

  // rC = sin(angle);
  // rC=0;
  // iC = cos(angle);
  // angle+=0.05
  if (document.getElementById('inpMouse').checked){
    inpRC.value = map(mouseX, 0, width, -1, 1);
    inpIC.value = map(mouseY, 0, height, -1, 1);
    // getJulia();
    changed=1;
  }
  if (changed) {
    rC = parseFloat(inpRC.value);
    iC = parseFloat(inpIC.value);
    range = parseInt(inpRange.value);
    if (selSet.value == 'Mandlebrot Set') {
      //draw mandleBrot
      getMandleBrot(rC, iC);
    } else {
      //draw julia
      getJulia(rC, iC);
    }

    changed = false;
  }
}

function isTrue(rC, iC) {
  let rZ = 0;
  let iZ = 0;
  let nRZ, nIZ;
  for (let i = 0; i < 50; ++i) {
    if (sqrt(iZ * iZ + rZ * rZ) > 2) {
      return i;
    }
    nRZ = rZ * rZ - iZ * iZ + rC;
    nIZ = 2 * rZ * iZ + iC;

    rZ = nRZ;
    iZ = nIZ;
  }
  // console.log(rZ, iZ);
  return 0;
}

function julia(rZ, iZ) {
  let nRZ, nIZ;
  for (let i = 0; i < 50; ++i) {
    if (sqrt(iZ * iZ + rZ * rZ) > 2) {
      return i;
    }
    nRZ = rZ * rZ - iZ * iZ + rC;
    nIZ = 2 * rZ * iZ + iC;
    rZ = nRZ;
    iZ = nIZ;
  }
  // console.log(rZ, iZ);
  return 0;
}


function getMandleBrot() {
  //mandleBrot
  loadPixels();
  for (let i = 0; i < width; ++i) {
    for (let j = 0; j < height; ++j) {
      let ind = (i + j * width) * 4;
      let a = map(i, 0, width, -range, range);
      let b = map(j, 0, height, -range, range);
      let n = isTrue(a, b);
      // n/=maxIterations;
      n = map(n, 0, maxIterations, 0, 1);
      n = sqrt(n);
      let brightness = map(n, 0, 1, 0, 255);
      pixels[ind] = brightness;
      pixels[ind + 1] = brightness;
      pixels[ind + 2] = brightness;
      pixels[ind + 3] = 255;
      // if (brightness<127){
      //   pixels[ind] = brightness;
      //   pixels[ind+1] = brightness/2;
      // }
      // else{
      //   pixels[ind+2] = brightness;
      // }
    }
  }
  updatePixels();
}


function getJulia(rC, iC) {
  //Julia
  loadPixels();
  for (let i = 0; i < width; ++i) {
    for (let j = 0; j < height; ++j) {
      let ind = (i + j * width) * 4;
      let a = map(i, 0, width, -range, range);
      let b = map(j, 0, height, -range, range);
      let n = julia(a, b);
      // n/=maxIterations;
      n = map(n, 0, maxIterations, 0, 1);
      n = sqrt(n);
      let brightness = map(n, 0, 1, 0, 255);
      // let col = color(brightness,255,255);
      // pixels[ind] = red(col);
      // pixels[ind + 1] = green(col);
      // pixels[ind + 2] = blue(col);
      // pixels[ind + 3] = alpha(col);
      pixels[ind] = brightness;
      pixels[ind + 1] = brightness;
      pixels[ind + 2] = brightness;
      pixels[ind + 3] = 255;

      // if (brightness<127){
      //   pixels[ind] = brightness;
      //   pixels[ind+1] = brightness/2;
      // }
      // else{
      //   pixels[ind+2] = brightness;
      // }
    }
  }
  updatePixels();
}

function select(id) {
  return document.getElementById(id);
}


function inpChanged() {
  changed = 1;
  let inpDiv = select('divInputs');
  if (selSet.value == 'Mandlebrot Set') {
    inpRC.parentElement.style.display = 'none';
    document.getElementById('inpMouse').checked = false;
  } else {
    inpRC.parentElement.style.display = 'block';
  }

}
