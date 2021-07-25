var h = document.getElementById('canvasDiv').offsetHeight;
var w = document.getElementById('canvasDiv').offsetWidth;
var genCount = 0;
var population;
var lifespan = 400;
var counter =0;
var pLife;
var target;
var targetSize = h/20;
var numHit = 0;
var forceMag = 0.2
var popSize = 25;
var inpLifespan, btnGo, inpPopSize, inpMutationRate;
var rectDraw = false;
var obstacles=[];
var started = false;
var prevBestDist = -1;
var distGen = -1;
var MinTime = -1;
var timeGen = -1;
var maxFitRocket = 0;
var mutationRate  = 0.01;
var seperator =' || ';
var averageFitness = 0;
var sPos, ePos;
var outlineTemp;
function setup()
{
  //obstacles = [new Obstacle(createVector(w/2-w/10,h/2), createVector(w/5, h/2+h/20) )];

  var canvas = createCanvas(w,h);
  canvas.parent('canvasDiv');
  btnGo = document.getElementById('btnGo');
  target = createVector(width/2, h*0.1);

  background(31);

  //pLife.html("Generation #: " + genCount +seperator+' Step: ' +counter+ seperator+"Accuracy: " + numHit );

  outputStats();
  document.getElementById('inpLifespan').oninput = outputStats;
  document.getElementById('inpPopSize').oninput = outputStats;
  document.getElementById('inpMutationRate').oninput = outputStats;
  noStroke();
  // noLoop();
}
function draw()
{
  // console.log(obstacles);
  background(31);
  fill(255,255,0);
  noStroke();
  ellipse(target.x, target.y, targetSize,targetSize);
  fill(255);
  if (started){


    outputStats();
    let completed = population.update();
    ++counter;
    if (counter==lifespan || completed)
    {
      counter=0;
      numHit = 0;
      ++genCount;
      population.evaluate();
    }
  }//if started

  // rect(rx,ry,rw,rh);
  for (obst of obstacles)
  {
    rect(obst.x, obst.y, obst.w, obst.h);
  }
  if (outlineTemp)
  {
    noFill();
    stroke(255);
    rect(outlineTemp.x,outlineTemp.y,outlineTemp.w,outlineTemp.h);
  }
}


function sortOnFitness(a,b)
{
  return b.fitness - a.fitness;
}

function start()
{
  if (started){location.reload(); return;}
  started = true;
  //audio.play();
  lifespan = document.getElementById('inpLifespan').value;
  popSize = document.getElementById('inpPopSize').value;
  mutationRate = document.getElementById('inpMutationRate').value/100;
  //console.log(mutationRate);
  population = new Population();
  // loop();
  btnGo.innerHTML = ('Refresh');
}


function outputStats()
{
  if (!started){
    lifespan = document.getElementById('inpLifespan').value;
    popSize = document.getElementById('inpPopSize').value;
    mutationRate = document.getElementById('inpMutationRate').value/100;
  }
  let distMsg, timeMsg;
  if ( prevBestDist<0)
  {
    distMsg = 'inf';
  }
  else
  {
    distMsg = Math.round(prevBestDist,0) + ' At gen ' + distGen;
  }

  if ( MinTime<0)
  {
    timeMsg = 'inf';
  }
  else
  {
    timeMsg = Math.round(MinTime,0) + ' At gen ' + timeGen;
  }

    let text = ''+
      '<font color = "red">'+'Lifespan: '+'</font>'+
      lifespan+
        '<br/><br/>'+
      '<font color = "red">'+'popSize: '+'</font>'+
      popSize+
        '<br/><br/>'+
      '<font color = "red">'+'MR: '+'</font>'+
      mutationRate+
        '<br/><br/>'+
      '<font color = "red">'+  "Generation # " +'</font>'+
            genCount+
          '<br/><br/>'+
      '<font color = "red">'+  'Step: ' +'</font>'+
            counter+
          '<br/><br/>'+
      '<font color = "red">'+'DistRecord: ' +'</font>'+
            distMsg+
        '<br/><br/>'+
      '<font color = "red">'+'TimeRecord: '+'</font>'+
            timeMsg+
        '<br/><br/>'+
      '<font color = "red">'+" Accuracy: " +'</font>'+
            numHit+
        '<br/><br/>'+
    '<font color = "red">'+  "maxFit: "+ '</font>'+
          (maxFitRocket.toFixed(3)) +
        '<br/><br/>'+
    '<font color = "red">'+"aveFit: "+'</font>'+
          (averageFitness.toFixed(3)) +
        '<br/><br/>';
      document.getElementById('outputStats').innerHTML = text;
}



function Obstacle(s,e)
{
  //check size:
  let ss = s.copy();
  let ee = e.copy();
  if (ee.x <ss.x)
  {
    let temp = ss.x;
    ss.x = ee.x;
    ee.x = temp;
  }
  if (ee.y < ss.y)
  {
    let temp = ss.y;
    ss.y = ee.y;
    ee.y = temp;
  }
  this.x = ss.x;
  this.y = ss.y;
  this.w = (ee.x - ss.x);
  this.h = (ee.y-ss.y)
}
function mousePressed()
{
  if (mouseX <0 || mouseX >w || mouseY <0 || mouseY >h){return;}
  sPos = createVector(mouseX, mouseY);
  log('yee');

}
function mouseReleased()
{
  if (mouseX <0 || mouseX >w || mouseY <0 || mouseY >h){return;}
  ePos = createVector(mouseX,mouseY);
  obstacles.push(new Obstacle(sPos, ePos));
  outlineTemp =null;
}

function mouseDragged()
{
  if (mouseX <0 || mouseX >w || mouseY <0 || mouseY >h){
    outlineTemp = null;
    return;}
  ePos = createVector(mouseX, mouseY);
  outlineTemp = new Obstacle(sPos, ePos);;
}
