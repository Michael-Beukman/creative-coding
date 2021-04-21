// function draw() {
//  const expr =math.compile(document.getElementById('eq').value);
//  function getFunc(x)
//  {
//    try {
//      let ans =  expr.eval({x:x});
//      return ans;
//    } catch (e) {

//      return 'invalid';
//    } finally {

//    }

//  }
// var canvas = document.getElementById("canvas");
// if (null==canvas || !canvas.getContext) return;
// //ctx.clearRect(0,0,canvas.width, canvas.height);
// let colour = "rgb(" + document.getElementById('sRed').value + ","+document.getElementById('sGreen').value+","+document.getElementById('sBlue').value+")";

// //funGraph(ctx,axes,getFunc,colour,2);
// if (document.getElementById('isPolar').checked){
// polarGraph(ctx,axes,getFunc,colour,axes.thick);
// }
// else
// {
//  funGraph(ctx,axes,getFunc,colour,axes.thick);
// }//else

// }
function funGraph(ctx, axes, func, color, thick) {
  var xx,
    yy,
    dx = 4,
    x0 = axes.x0,
    y0 = axes.y0,
    scale = axes.scale;
  var iMax = Math.round((ctx.canvas.width - x0) / dx);
  var iMin = axes.doNegativeX ? Math.round(-x0 / dx) : 0;
  ctx.beginPath();
  ctx.lineWidth = thick * 2;
  ctx.strokeStyle = color;
  //scale = document.getElementById('sScale').value;
  for (var i = iMin; i <= iMax; i++) {
    xx = dx * i;
    let f = func(xx / scale);
    //console.log(f);
    if (f == Infinity || Math.abs(f) > 25) {
      //Need to help here -> on tan x, does not get infinity often enough
      ctx.stroke();
      xx = dx * (i + 1);
      let newF = func(xx / scale);

      //console.log(f,newF);
      yy = scale * newF;
      //console.log(xx,yy,f);
      ctx.moveTo(xx, yy);
      ctx.beginPath();
      continue;
    }
    yy = scale * f;
    if (f == "invalid" || typeof f == "object") {
      alert("Invalid Equation");
      return;
    }

    //polar :
    /*
  rx = yy*Math.cos(xx);
  ry = yy*Math.sin(xx);
  xx=rx;
  yy = ry;
  */
    //console.log(xx,yy,f);
    if (i == iMin) ctx.moveTo(x0 + xx, y0 - yy);
    else ctx.lineTo(x0 + xx, y0 - yy);
  } //for i
  ctx.stroke();
}

function polarGraph(ctx, axes, func, color, thick, draw = true) {
  //scale = 1;
  //scale = 60;
  var rr,
    tt,
    dt = 4,
    x0 = axes.x0,
    y0 = axes.y0,
    scale = axes.scale;
  var iMax = Math.round((ctx.canvas.width - x0) / dt);
  var iMin = axes.doNegativeX ? Math.round(-x0 / dt) : 0;
  //scale =80;
  scale = 80; //document.getElementById('sScale').value;
  iMin = Math.PI * -2;
  iMax = Math.PI * 2;
  ctx.beginPath();
  //  console.log((iMax-iMin)*250, ctx);
  if (draw) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 10;
    ctx.fillStyle = color;
  }
  arrs = [];

  for (var i = iMin; i <= iMax; i += 0.001) {
    tt = i;
    rr = func(tt);
    xx = rr * Math.cos(tt) * scale;
    yy = rr * Math.sin(tt) * scale;
    xx = Math.round(xx);
    yy = Math.round(yy);
    arrs.push({ x: x0 + xx, y: y0 - yy });
    ctx.moveTo(x0 + xx, y0 - yy);
    if (draw) ctx.arc(x0 + xx, y0 - yy, thick, 0, Math.PI * 2);
  }
  if (draw) ctx.fill();
  return arrs;
  //  ctx.stroke()
}

function showAxes(ctx, axes) {
  var x0 = axes.x0,
    w = ctx.canvas.width;
  var y0 = axes.y0,
    h = ctx.canvas.height;
  var xmin = axes.doNegativeX ? 0 : x0;
  ctx.beginPath();
  ctx.strokeStyle = "#000000"; //"rgb(0,0,0)";
  ctx.moveTo(xmin, y0);
  ctx.lineTo(w, y0); // X axis
  ctx.moveTo(x0, 0);
  ctx.lineTo(x0, h); // Y axis
  ctx.lineWidth = axes.thick;
  ctx.stroke();
}
// clear();
//showAxes(ctx,axes);
// draw();
//const expr =math.compile('x^2');

//console.log(expr.eval({x: 3}));
