x = window.innerWidth;
y= window.innerHeight*0.89;

var sliderLen;
var sliderR;
var sliderG;
var sliderB;
var textBox;

function setVar(){
red = sliderR.value();
green = sliderG.value();
blue = sliderB.value();
len = sliderLen.value();
numLevels = textBox.value();
}

function setup() {
sliderLen = createSlider(100,1400,400,50);
sliderR = createSlider(0,255,0,1);
sliderG = createSlider(0,255,255,1);
sliderB = createSlider(0,255,255,1);

textBox = createInput("1");

createCanvas(x, y-100);
var red = sliderR.value();
var green = sliderG.value();
var blue = sliderB.value();
var len = sliderLen.value();
var numLevels = (textBox.value());


sliderLen.changed(redraw);
sliderR.changed(redraw);
sliderG.changed(redraw);
sliderB.changed(redraw);
textBox.changed(redraw);

noLoop();
//go(len);
}

function getPyramidLevel(len, i,j)
{
/*
  if (i==1){
    push();
    translate(len/2,0);
    go(len,1);
    pop();

  }
  */
  //if even => -1, 1
  //if odd => -1,0,1
  var starti, endi, startj, endj;
  if (i%2==0)
  {
    starti =  (-i/2);
    endi = (i/2);
    startj = (-(j)/2);
    endj =  ((j)/2)
  }
  else
  {
    starti = (-(i)/2);
    endi = ((i)/2);
    startj = (-j/2);
    endj = (j/2);
  }

  for (var k=starti; k<=endi ; ++k){
    push();
    if (i==-1){
        translate(len*k/2,0);
    }
    else{
      translate(4*len*k/4,0);
    }
    go(len,1);
    pop();
    if (k==-1 && i % 2==0)
    {
      //++k;
    }

  }//for k
  console.log(starti,endi, startj,endj);
  for (var k=startj; k<=endj;++k )
  {
    push();
    stroke(blue,red,green);
    //translate(len, -len*Math.sqrt(3)/2);
    translate(k*len+len, -len*Math.sqrt(3)/2);
    rotate(PI);
    go(len,0);
    pop();
    if (k==-1 && j % 2==0)
    {
      //++k;
    }
  }
/*
  background(51);
  //push();
  //translate(x/2 -len/2 , y-110);
  //push();
  go(len);
  //pop();
  //push();
  push();
  translate(-len ,0);
  go(len);
  //pop();
  //push();
  pop();
  translate(len, 0);
  go(len);
  pop();

  //

  //pop();
  push();
  translate(len/2, - len*Math.sqrt(3)/2);
  rotate(PI);
  stroke(255,0,0);
  go(len);

  pop();
  push();
  stroke(255,0,0);
  translate(len*1.5,- len*Math.sqrt(3)/2);
  rotate(PI);
  go(len);
  pop();
  push();
  translate(len/2,- len*Math.sqrt(3)/2);
  go(len);
  pop();
*/

}


function draw() {

if ( red != sliderR.value() ||
 green != sliderG.value() ||
 blue != sliderB.value() ||
 len != sliderLen.value() ||
  textBox.value() != numLevels)
 {
   setVar();
   stroke(red,green,blue)
   background(51);



   translate(x/2 -len*((numLevels)) +len*(numLevels)-len/2 , y-110);
   //getPyramidLevel(len,5,4);
   //translate(0, -len * Math.sqrt(3)/2);

   for (var i=0 ;i <=numLevels; ++i)
   {
        getPyramidLevel(len,numLevels-i,numLevels-1-i);
        translate(0, -len * Math.sqrt(3)/2);
   }//for i
/*
   getPyramidLevel(len,4,3);
   translate(0, -len * Math.sqrt(3)/2);
   getPyramidLevel(len,3,2);
   translate(0, -len * Math.sqrt(3)/2);
   getPyramidLevel(len,2,1);
*/
   /*

   push();
   go(len);
   //pop();
   //push();
   translate(-len ,0);
   go(len);
   //pop();
   //push();
   translate(2*len, 0);
   go(len);
   pop();

   //

   //pop();
   push();
   translate(len/2, - len*Math.sqrt(3)/2);
   rotate(PI);
   stroke(255,0,0);
   go(len);

   pop();
   push();
   stroke(255,0,0);
   translate(len*1.5,- len*Math.sqrt(3)/2);
   rotate(PI);
   go(len);
   pop();
   push();
   translate(len/2,- len*Math.sqrt(3)/2);
   go(len);
   pop();
*/

}
}

function go(len, col){

  //len = 1200;
  //stroke(red,green,blue);

  Sierpinski(len);
  //translate(len,0);
  //push();

  rotate(PI);
  if (col ==1){
      stroke(green,blue,red);
  }
  else{
    stroke(blue,green,red);
  }

  translate(-3*len/4  ,Math.sqrt(3) * len/4);
  Sierpinski(len/2);

  pop();
  //line(0,0,50,-50)

}

function Sierpinski(len){
  //push();
  if (len>10){
  Triangle(len);
  Triangle(len/2);
  translate(len/2,0);
  Triangle(len/2);
  translate(-len/4,-Math.sqrt(3)*len/4);
  Triangle(len/2);

  translate(-len/4,Math.sqrt(3)*len/4);

  //Now Back at origin;
  push();
  Sierpinski(len/4);
  pop();
  translate(len/4,0);
  push();
  Sierpinski(len/4);
  pop();
  push();
  translate( -len/8,-Math.sqrt(3)*len/8 );
  Sierpinski(len/4);
  pop();
  translate(len/4,0);
  //line(0,0,50,-50)
  push();

  Sierpinski(len/2);
  pop();

  translate(-len/4,-Math.sqrt(3)*len/4);
  push();
  Sierpinski(len/2);
  pop();
  translate(-len/4,Math.sqrt(3)*len/4);
  push();
  Sierpinski(len/2);
  pop();
}


  /*
  push();
  translate(3*len/4,0);
  Sierpinski(len/4);
  pop();
  translate(len/2,-Math.sqrt(3)*len/4);
  Sierpinski(len/4);
*/




}

function Triangle(len){
  //rotate(PI/2);
  //rotate(PI/2);
  line(0,0,len,0);
  translate(len,0);
  tX = Math.sqrt(3) * len/2;
  tY = len/2;
  line(0,0,-tY ,-tX);
  translate(-tY,-tX);
  line(0,0,-tY,tX);
  translate(tY- len,tX);
  //rotate(PI/2)
}
