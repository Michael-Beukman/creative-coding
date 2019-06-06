let t;
let r;
let circleR;
let step;
let speed;
let sign = 1;
let coeffs1;
let coeffs2;
let coeffsSpeed1;
let coeffsSpeed2;
let freq = 0.0005;
function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent(document.getElementById("canvasDiv"));
  t = 0;
  r = min(width, height) / 3;
  step = 0.001;
  circleR = 8;
  speed = 1;
  background(0);
  stroke(255);
  coeffs1 = 20;
  coeffs2 = 30;

  coeffsSpeed1 = 0.1;
  coeffsSpeed2 = 0.2;
}

function draw() {
  t += speed;
  translate(width / 2, height / 2);
//   manySpirals();
    // parametric();
    // doubleParametric();
  background(0);
    circles();
    // fill(255);
    // t =  map(t, -55, 55, 55, -55);
    // circles();
    // fill(100)
    // t =  map(t, -55, 55, 55, -55);
}

function manySpirals() {
  const num = 20;
  background(0);
  scale(1.0 / num);
  for (let i = 2; i < num; ++i) {
    scale((((num / (i - 1)) * 1.0) / num) * i);
    spiral(num / i);
  }
}

function spiral(s) {
  for (let angle = 0; angle < TWO_PI; angle += step) {
    const xFac = pow(sin(t + angle / TWO_PI), 1);
    const yFac = pow(sin(t + angle / TWO_PI), 1);
    const col = lerpColor(
      color(0, 100, 255),
      color(255, 0, 255),
      map(cos(t + angle), -1, 1, 0, 1)
    );
    fill(col);
    const cR = circleR; //* (map(sin(t + angle), -1, 1, 0.5, 1.5));
    const x = r * xFac * cos(angle);
    const y = r * yFac * sin(angle);
    ellipse(x, y, cR * s);
  }
}

function parametric() {
//   speed = 0.1;
    noStroke();
    fill(255, 100)
const r = 40;
  const num = 6;
  const x = t => new Array(num).fill(0).map((_, i) => r * sin(t/(i+1))).reduce((total, num)=>total+num, 0);  
  const y = t => new Array(num).fill(0).map((_, i) => r * cos(t/(i+1))).reduce((total, num)=>total+num, 0);  
//   const x = (t) => sin(t) * r + sin(t/2) * r + sin(t/3) * r + sin(t/4) * r;
//   const y = (t) => cos(t) * r + cos(t/2)*r + cos(t/3) * r + cos(t/4) * r;
    for (let i=0; i<100; ++i){
        ellipse(x(t), y(t), 1);
        t+=speed;
    }
}


function doubleParametric(){
    // speed = 1;
    // speed = 0.0005;
    // translate(-width/2, 0);
    background(0);
    r = 400;
    // const x1 = t => r * cos(t/20);
    // const y1 = t => r * sin(t/20);
    // const x2 = t => r * cos(t/30);
    // const y2 = t => r * sin(t/30);
    coeffs1 += coeffsSpeed1;
    coeffs2 += coeffsSpeed2;

    if (abs(coeffs1) > 100) coeffsSpeed1 *=-1;
    if (abs(coeffs2) > 100) coeffsSpeed2 *=-1;
    const x1 = t => r * cos(t/coeffs1);
    const y1 = t => r * sin(t/coeffs1);
    const x2 = t => r * cos(t/coeffs2);
    const y2 = t => r * sin(t/coeffs2);
    // const x1 = t => r * cos(t/4);
    // const y1 = t => r * sin(t/4);
    // const x2 = t => r * sin(t);
    // const y2 = t => r * cos(t/2);
    // const x3 = t => r * sin(t);
    // const y3 = t => r * cos(t);
    // point(x1(t), y1(t));
    // point(x2(t), y2(t));
    for (let i=0; i<500; i+=1){
        // // // stroke(t/(1/500) * 255, t/(1/500) * 100 + 155, t/(1/500) * 50 + 205);
        stroke(abs(sin(t)) * 255, abs(cos(t)) * 255, abs(cos(t) * sin(t)) * 100 + 155)
        line(x1(t + i), y1(t + i), x2(t + i), y2(t + i))
        // line(x2(t + i), y2(t + i), x3(t + i), y3(t + i))
    }
  }


function circles(){
  for (let i=0; i< 200; ++i){
    let r = sin(t * freq * i);
    const col = color(map(r, -1, 1, 255, 60), 0, 255);
    stroke(col)
    fill(col)
    r = map(r, -1, 1, 400, 800);
    const y = r * sin(i) * map(sin(t * freq * i/1000), -1, 1, -0.5, 0.5);
    const x = r * cos(i) * map(sin(t * freq * i/1000), -1, 1, -0.5, 0.5);
    ellipse(x, y, 40);
  }
  // if (t > 55 && speed >0 || t < -55 && speed < 0) speed *=-1; 
}

function circlesV2(){
  for (let i=0; i< 1000; ++i){
    let r = sin(millis() * freq * i);
    const col = color(map(r, -1, 1, 255, 60), 0, 255);
    stroke(col)
    fill(col)
    r = map(r, -1, 1, 400, 800);
    const y = r * (sin(i) * sin(millis() * freq * i/500)* map(sin(millis() * freq * i/1000), -1, 1, -1, 1) + sin(t*i));
    const x = r * (cos(i) * sin(millis() * freq * i/500)* map(sin(millis() * freq * i/1000), -1, 1, -1, 1)+ cos(t*i));
    ellipse(x, y, 40);
  }
}