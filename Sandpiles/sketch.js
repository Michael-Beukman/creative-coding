var canvasDiv = document.getElementById('canvasDiv')
let w = canvasDiv.offsetWidth;
let h = canvasDiv.offsetHeight;
let map = [];
let blockSize;
let gridSize;

function setup() {
  let canvas = createCanvas(w, h);
  canvas.parent('canvasDiv');
  gridSize = 100;
  for (let i = 0; i < gridSize; ++i) {
    map[i] = [];
    for (let j = 0; j < gridSize; ++j) {
      map[i][j] = 0;
    }
  }
  map[round(gridSize / 2)][round(gridSize / 2)] = (1000);
  blockSize = h / gridSize;
}

function draw() {
  for (let i in map) {
    for (let j in map[i]) {
      let num = map[i][j];
      let col;
      if (num == 0) {
        col = [0, 0, 255];
      } else if (num == 1) {
        col = [0, 125, 0];
      } else if (num == 2) {
        col = [255, 255, 0]
      } else if (num == 3) {
        col = [255, 50, 50];
      } else {
        col = [255, 255, 0];
      }
      noStroke();
      fill(col);
      rect(i * blockSize, j * blockSize, blockSize, blockSize);
    }
  }
  update2();
}

function update() {
  for (let i = 0; i < map.length; ++i) {
    for (let j = 0; j < map[i].length; ++j) {
      if (map[i][j].update()) {
        if (j - 1 >= 0) {
          map[i][j - 1]
        }
        for (let k = -1; k < 2; k += 2) {
          if (j + k >= 0 && j + k < map[i].length) {
            map[i][j + k].incNum(); // += 1;
          }
        }
        for (let k = -1; k < 2; k += 2) {
          if (i + k >= 0 && i + k < map.length) {
            map[i + k][j].incNum(); // += 1;
          }
        }
      }
    }
  }
}

function update2() {
  // let newMap = map.slice();
  let newMap  =[];
  for (let i = 0; i < map.length; ++i) {
          newMap[i] = [];
    for (let j = 0; j < map[i].length; ++j) {
      if (map[i][j] < 4) {
        newMap[i][j] = map[i][j];
    }
    else{
      newMap[i][j]=0;
    }
  }
}

  for (let i = 0; i < map.length; ++i) {
    for (let j = 0; j < map[i].length; ++j) {
      if (map[i][j] >= 4) {
        let num = map[i][j];
        newMap[i][j] += (num-4);
        if (i + 1 < map.length) {
          ++newMap[i + 1][j];
        }
        if (i - 1 >= 0) {
          ++newMap[i - 1][j];
        }
        if (j + 1 < map[i].length) {
          ++newMap[i][j + 1];
        }
        if (j - 1 >= 0) {
          ++newMap[i][j - 1];
        }
      }
    }
  }
  map = newMap;
}

function Cell(num = 0) {
  this.num = num;
  this.update = function() {
    let ans;
    if (this.num >= 4) {
      this.num -= 4;
      ans = true;
    } else {
      ans = false;
    }
    // this.prevNum = num;
    return ans;
  }
  this.incNum = function(num = 1) {
    if (num != 1) {
      this.num = num;
      // this.prevNum = num;
    } else {
      ++this.num;
    }
  }
}
