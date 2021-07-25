var hOffset = 0;
var h = window.innerHeight-hOffset;
var w = window.innerWidth;
canvas = document.createElement("canvas");
canvas.id = "canvas";
canvas.className = "canvas";
canvas.width = w;
canvas.height = h;
ctx = this.canvas.getContext("2d");
ctx.textAlign = "center";
document.getElementById('canvasDiv').appendChild(this.canvas);
ctx.fillStyle  = 'ffffff';
(function() {
  document.addEventListener('DOMContentLoaded', function() {
  var pattern = Trianglify({
    cell_size: getCellSize(),
    variance: getVariance(),
    seed: getSeed(),
    //x_colors: ['F1C9FE', '#F1C9FE', '#F1C9FE'],
    x_colors: getBgColorsX(),
    y_colors: getBgColorsY(),
    color_space: 'rgb',
    color_function: false,
    width: window.innerWidth,
    //height: window.innerHeight*0.93,
    //height: document.getElementById('bodyDiv').offsetHeight,
    height: document.body.offsetHeight,
    color_function: null,
  });
  window.onresize = function(){ location.reload();}
  window.resize = function(){ location.reload();}
  //document.body.appendChild(pattern.canvas());
  //document.getElementById('bodyDiv').appendChild(pattern.canvas());
  document.getElementById('canvas').style.background = 'url(' + pattern.canvas().toDataURL() + ')';
  document.body.style.background = 'url(' + pattern.canvas().toDataURL() + ')';
  //document.getElementById('bodyDiv').childNodes.addat(0,pattern.canvas());
  });
}());
function clear()
{
  let c = canvas.getContext('2d')
  c.clearRect(0,0,canvas.width, canvas.height);
  //let temp2 = document.getElementById('eq').value;
  //document.getElementById('eq').value = '';
  //draw();
  showAxes(ctx,axes);
  //document.getElementById('eq').value = temp2;
}
document.getElementById('eqForm').onsubmit = function (event) {
   event.preventDefault()
   draw()
 }

//make input

document.getElementById('btnClear').onclick = function()
  {
    clear();
  }

document.getElementById('negDiv').style.display = 'none';
document.getElementById('scaleDiv').style.display = 'none';
document.getElementById('isPolar').onclick = function () {

  if (this.checked)
  {
    //alert('e');
    document.getElementById('negDiv').style.display = 'block';
    document.getElementById('scaleDiv').style.display = 'block';
    document.getElementById('y').innerHTML = 'r (in terms of x) = ';
  }
  else
  {
    document.getElementById('negDiv').style.display = 'none';
    document.getElementById('y').innerHTML = 'y = ';
    document.getElementById('scaleDiv').style.display = 'none';
  }
}
