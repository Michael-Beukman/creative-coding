var h = document.getElementById('canvasDiv').offsetHeight;
var w = document.getElementById('canvasDiv').offsetWidth;
var btnStart = document.getElementById('btnStart');
var started = false;
var arrPoints = [];
var pSize = Math.min(w,h)/10;
var population;
var MR = 0.01;
var popSize = 200;
var bestSoFar = [];
var maxfit = -1;
var sumFit;
var aveFit;
var genCount = 0;
var time;
var sTime;
var bestGen=0;
//Fit text:
  jQuery("btnStart").fitText(1);
  //jQuery("divOutputHead").fitText(1);
//Fit text end

function setup()
{
  var canvas = createCanvas(w,h);
  canvas.parent('canvasDiv');
  background(51);
  noStroke();
  //noLoop();

}
function draw()
{
  background(51);
      fill([255,0,0]);
      //started
      if (started){
      strokeWeight(5);
      population.show();
      population.evaluate();
      //strokeWeight(1);
      population.show();
      if (bestSoFar.length)
      {
        output();
        strokeWeight(15);
        stroke([0,255,255]);
        for (let j=0; j<bestSoFar.length-1; ++j)
        {
          let index1 = bestSoFar[j];
          let index2 = bestSoFar[j+1];
          line(arrPoints[index1].x, arrPoints[index1].y, arrPoints[index2].x, arrPoints[index2].y);
        }
      }
      ++genCount;
    }
    noStroke();
    if (arrPoints.length){
      for (let pointElem of arrPoints)
      {
        ellipse(pointElem.x, pointElem.y, pSize, pSize)
      }
    }

}

function mousePressed() {
  // Check if mouse is inside the circle
  if (mouseX <0 || mouseX >width || mouseY<0 || mouseY > height){return;}
  if (!started){
    arrPoints.push(createVector(mouseX, mouseY));
  }
}

function startStop()
{
  if (started)
  {
    //stop
    location.reload();
  }
  else
  {
    sTime = millis();
    MR = (document.getElementById('sMR').value)/100;
    document.getElementById('divOutputHead').innerHTML = '';
    popSize = (document.getElementById('sPopSize').value);
    population = new Population(MR, popSize, arrPoints.length);
    started = true;
    btnStart.innerHTML = 'Refresh';
  }
}


function getDist(arrOrder)
{
  //calcs dist between point in order of arrOrder of arrPoints
  let distSoFar = 0;
  for (let i=0; i<arrOrder.length-1; ++i)
  {
    let point1 = arrPoints[arrOrder[i]];
    let point2 = arrPoints[arrOrder[i+1]];
    let dis = dist(point1.x, point1.y, point2.x, point2.y);
    distSoFar +=dis;
  }
  return distSoFar;
}

function sortOnFitness(a,b)
{
  return -a.fitness + b.fitness;
}

btnStart.onclick = startStop;

function output()
{
  let f  ='<font color = "blue">';
  let fe = '</font>'
  let text = '';
  text +=f+'Generation: '+fe+ genCount+'<br/>';
  text += f+'Best Order: ' + fe + bestSoFar + '<br/>' +
  f +'MinDist: '+fe + round(1/(maxfit)) + '<br/>' +
  f+'AveDist: '+fe + round(aveFit/popSize)+'<br/>';
  text +=f+'Best Gen So Far: '+fe + bestGen + '<br/>';
  text +=  f+'population Size: '+fe + popSize + '<br/>' +
  f+'Mutation Rate: '+fe + MR + '<br/>'+
  f+'Time: ' + fe +round( ((millis()-sTime)/1000) *100)/100 + ' seconds';
  document.getElementById('divTxtOutput').innerHTML=text;
}
