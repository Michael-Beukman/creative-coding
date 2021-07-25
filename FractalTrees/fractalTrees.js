x = window.innerWidth;
y= window.innerHeight*0.89;
var slider;
var slider2;
var slider3;
var rSlider;
var gSlider;
var bSlider;


function setup() {
slider = createSlider(-PI,PI, PI/4, 0.05);
slider2 = createSlider(0,0.75,0.67, 0.05);
slider3 = createSlider(0,0.75,0.67, 0.05);

createCanvas(x, y-100);
var angle = PI/4;
// create sliders
//var y = (slider.position()['y']);
var y_pos = (slider.position()['y']);
rSlider = createSlider(0, 255, 0);
rSlider.position(500, y_pos-60);
gSlider = createSlider(0, 255, 255);
gSlider.position(500, y_pos-30);
bSlider = createSlider(0, 255, 255);
bSlider.position(500, y_pos);

slider.input(go);
slider2.input(go);
slider3.input(go);

rSlider.input(go);
gSlider.input(go);
bSlider.input(go);

noLoop();



}

function go()
{
  //console.log('abc');
  redraw();
}

function draw() {

  /*
  if (mouseIsPressed) {
    fill(0);
    ellipse(mouseX, mouseY, 80, 80);
  } else {
    fill(255);
  }

*/
//console.log(x,y);
angle = slider.value();
var a = slider2.value();
var b = slider3.value();
document.getElementById('angle').innerHTML ="Angle: "+ round(angle*180/PI) +"&emsp;&emsp;" + "Left Scale: " + a  + "&emsp;&emsp;" + "Right Scale: " + b;
background(51);

//stroke(255,0,255);
stroke(rSlider.value(), gSlider.value(), bSlider.value());
strokeWeight(5);


translate(width/2,height);

tree(400, a,b);

}

function tree(len, a, b)
{
  if (len <4){
    return;
  }
  line(0,0,0,-len);
  translate(0,-len);
  push();
  rotate(angle);
  tree(len*a,a,b);
  pop();
  push();
  rotate(- angle);
  tree(len*b,a,b);
  pop();
}
