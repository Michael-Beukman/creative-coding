var cDiv = document.getElementById("canvasDiv");
var h = cDiv.offsetHeight;
var w = cDiv.offsetWidth;
let canvas;
let point = { x: 0, y: 200 };
let angle = 0;
let circleSpeed;
let moveSpeed;
let circles = [];
let sm;
let string = "abababaa";
let index = 0;
let cols = {
  a: [255, 0, 255],
  b: [0, 0, 255],
};
let isAnimating = false;
let nextIndex;
let currentIndex;
let timeForAnimation = 1000.0;
let timeCurr = 0.0;

let isDragging = false;
let dragItem = null;
let mouseOffsetX, mouseOffsetY;
let dragIndex;
let isPlaying = false;
let selected = [];

function setup() {
  $("#btnNext").on("click", startAnimating);
  $("#btnPlay").on('click', playPause);

  const press = (letter) => {
      return ()=>{
          key = letter;
          keyPressed();
      };
  };

  $("#btnA").on('click', press('a'));
  $("#btnB").on('click', press('b'));
  $("#btnN").on('click', press('n'));
  $("#btnD").on('click', press('d'));

  canvas = createCanvas(w, h);
  canvas.parent(cDiv);
  sm = new StateMachine();
  currentIndex = 0;
}
function fillSymbol(sym) {
  fill(cols[sym] || [255, 255, 255]);
}

function strokeSymbol(sym) {
  stroke(cols[sym] || [255, 255, 255]);
}
function draw() {
  if (isDragging && dragItem != null) {
    const index = dragIndex;
    const i1 = index + 1;
    const ineg1 = index - 1;
    let minX = -100000000,
      maxX = 10000000;
    if (i1 < sm.spheres.length) {
      maxX = sm.spheres[i1].x - sm.r;
    }

    if (ineg1 >= 0) {
      minX = sm.spheres[ineg1].x + sm.r;
    }

    dragItem.x = max(min(mouseX + offsetX, maxX), minX);
    dragItem.y = mouseY + offsetY;
  }

  background(0);
  noFill();
  sm.draw();
  let deltaTime = window.performance.now() - canvas._pInst._lastFrameTime;
  stroke(255);
  textSize(36);
  let pos = 100;
  for (let i in string) {
    if (i == index) {
      stroke(255, 255, 0);
    } else stroke(255);
    text(string[i], pos, 100, pos + 36, 100);
    pos += 24;
  }
  //   text(string, 100, 100, 100, 100);
  //   text(index, 200, 100, 300, 100);
  textSize(12);

  if (timeCurr < timeForAnimation && timeCurr != 0) {
    timeCurr += deltaTime;
    const t = timeCurr / timeForAnimation;
    const poly = -4 * t * (t - 1);
    const ss = lerp(sm.spheres[currentIndex].x, sm.spheres[nextIndex].x, t);
    // const line = sm.linePoints[currentIndex + "-" + nextIndex + "-" + string[index]];
    const line = sm.getLinePoint(currentIndex, nextIndex, string[index]);
    // const yy = lerp(sm.spheres[currentIndex].y, line.midY, poly);
    let yy;
    if (t < 0.5) yy = lerp(line.posY, line.midY, t / 0.5);
    else yy = lerp(line.midY, line.posY2, (t - 0.5) * 2);
    // console.log(yy, line);
    // stroke(255, 0, 0);
    noStroke();
    fillSymbol(string[index]);
    ellipse(ss, yy, 10, 10);
  } else if (timeCurr != 0) {
    timeCurr = 0;
    currentIndex = nextIndex;
    sm.next(string[index]);
    index += 1;
    index = min(index, string.length-1);
    if (isPlaying){
        startAnimating();
    }
  }else if (timeCurr == 0){
     noStroke();
      const {x,y} = sm.spheres[sm.currentIndex];
      fill(200,80,140);
      ellipse(x, y, 10);
  }
}

function startAnimating() {
  timeCurr = 0.001; // millis() + timeForAnimation / 2;
  nextIndex = sm.states[currentIndex].next(string[index]); //currentIndex + 1;
}

function mousePressed() {
  //   startAnimating();
}
function resetValues(vals) {
  currentIndex = 0;
  if (sm) sm.reset();
  index = 0;
  string = vals.string;
  timeForAnimation = vals.time * 1000;
}

function getSphereIntersection(mouseX, mouseY) {
  for (let i = 0; i < sm.spheres.length; ++i) {
    const { x, y } = sm.spheres[i];
    if (dist(x, y, mouseX, mouseY) < sm.r / 2) {
      isDragging = true;
      // If so, keep track of relative location of click to corner of rectangle
      return {
        sphere: sm.spheres[i],
        index: i,
        offsetX: x - mouseX,
        offsetY: y - mouseY,
      };
    }
  }
}

function mousePressed() {
  // Did I click on the rectangle?
  const ans = getSphereIntersection(mouseX, mouseY);
  if (ans) {
    dragItem = ans.sphere;
    dragIndex = ans.index;
    offsetX = ans.offsetX;
    offsetY = ans.offsetY;

    const ii = selected.indexOf(dragIndex);
    if (ii >= 0) {
      selected.splice(ii, 1);
    } else {
      selected.push(dragIndex);
      if (selected.length > 2) {
        selected = selected.slice(selected.length - 2);
        // console.log(selected);
      }
    }
  }
}

function mouseReleased() {
  // Quit dragging
  isDragging = false;
  dragItem = null;
  sm.fillLines();
}


function keyPressed(){
    if (selected.length == 2 || selected.length == 1){
        if (key == "d" && selected.length == 1){
            //remove
            const index = selected[0];
            sm.states.splice(index, 1);
            for (let i in sm.states){
                let s = sm.states[i];
                let a = s("a");
                let b = s("b");
                if (a == index){
                    a = i;
                } else if (a >index){
                    a--;
                }
                if (b==index){
                    b=i;
                } else if (b >index){
                    b--;
                }
                sm.states[i] = (kk) => kk == "a" ? a : b;
            }
            selected = [];
            sm.doAllReset();
            return;
        }
        const start = selected[0];
        const a = sm.states[start].next("a");
        const b = sm.states[start].next("b");
        let f;
        const ddd = selected.length == 2 ? selected[1]: selected[0];
        if (key == "a"){
            f = s => s == "b" ? b : ddd;
            f = {'a': ddd}
        }else if (key == "b"){
            // f = s => s == "a" ? a : ddd;
            f = {'b': ddd}
        }else{
            return;
        }
        sm.states[start].table = {...sm.states[start].table,...f}
        // sm.states[start] = f;

        sm.doAllLines();
        selected = [];
    }

    if (key == "n"){
        // const l = sm.states.length;
        // sm.states.push(
        //     s => l
        // )
        sm.addState();
        sm.doAllReset();
    }
}

function playPause(){
    if (isPlaying){
        isPlaying = false;
        $("#btnPlay").html("Play >");
    }else{
        isPlaying = true;
        $("#btnPlay").html("Pause ||");
        startAnimating();
    }
}