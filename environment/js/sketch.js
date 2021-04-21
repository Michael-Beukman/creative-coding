var cDiv = document.getElementById("canvasDiv");
var h = cDiv.offsetHeight;
var w = cDiv.offsetWidth;
let canvas;
let pointsCos8X;
axes = {};
function setup() {
  canvas = createCanvas(w, h);
  canvas.parent(cDiv);
  // canvas.id = "reeID"
  canvas = document.getElementsByTagName("canvas")[0];
  ctx = canvas.getContext("2d");
  //axes.x0 = 0.5 + 0.5 * canvas.width; // x0 pixels from left to x=0
  //axes.y0 = 0.5 + 0.5 * canvas.height; // y0 pixels from top to y=0
  axes.x0 = 0;
  axes.y0 = 0;
  axes.scale = 100; // 40 pixels from x=0 to x=1
  axes.doNegativeX = true;
  axes.thick = 5;
  axes.thin = 2;

  pointsCos8X = polarGraph(
    canvas.getContext("2d"),
    axes,
    (x) => cos(8 * x),
    null,
    axes.thin + 1,
    false
  );
}

function draw() {
  background(40, 240, 140);
  const T=1
  num=3;
  // stroke(255)
  // line(0,0,width,height);
  // now make things

  strokeWeight(3);
  for (let j = 0; j < 1; ++j) {
      push()
    // translate(0  , 4 * h / 5);
    translate(width/2, height/2)
    for (let i = 0; i < 8; ++i) {
    //   translate(200 + random(-10, 11), 0);
    //   flower(200);
    line(0,0,0,100)
    stroke(255,0,0)
    coolThing(400, 0.01, 6);
    }
    // pop()
  }
//   noLoop();
}

function flower(len) {
//   push();
//   translate(0, -len);
  // leaves
//   stroke(255, 100, 0);
//   line(0, 0, 0, len);
  //   let colour = color(255, 140, 0); //"rgb(" + document.getElementById('sRed').value + ","+document.getElementById('sGreen').value+","+document.getElementById('sBlue').value+")";

  //   stroke(255,140,0)
  for (p of pointsCos8X) {
    // ellipse(p.x, p.y, 2.5);
    point(p.x, p.y, 1)
    //   arc(p.x, p.y, 100, 100,0, -PI/2);
    // arc(p.x, p.y, 100, 100,0, -PI/2); This is very cool
  }
  // top
//   pop();
}

/**
 
 */

 // very cool https://editor.p5js.org/mrporterphysics/sketches/Q6UeWcHw_


 function coolThing(scale=width,T=0, num=10){
    //  const T=0;
    //  const num=10;
     var xmin = -5;
     var xmax = 5;
     var ymin = -5;
     var ymax = 5;
     noFill();
    for (var theta = 0; theta < TWO_PI; theta += TWO_PI/100){
        var r,xp,yp;
        // print(num)
        // r = 2.5*T + cos(num*(theta-T));
        // let num=2;
        r = 2.5*T + cos(num*(theta-T));
        xp = r*cos(theta);
        yp = r*sin(theta);

        //x and y are the locations for the virtual pixels to the actual Processing window
        var x, y;
        x = map(xp, xmin, xmax,    -scale/2     , scale/2);
        y = map(yp, ymin, ymax,    scale/2, -scale/2);

        //only graph the point if it's insid ethe window
        // if (x > 0 && x < width && y > 0 && y < height) {
            // print(x,y)
          vertex(x, y);
        // } else {
        //   endShape();
        //   beginShape();
        // }
      }
      endShape();
 }