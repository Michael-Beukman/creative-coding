class State {
  constructor(table, index) {
    this.table = table;
    this.index = index;
  }
  next(symbol) {
    return this.table[symbol] || index;
  }
}
class StateMachine {
  constructor() {
    this.states = [
      new State({ a: 0, b: 1 }, 0),
      new State({ a: 2, b: 1 }, 1),
      new State({ a: 2, b: 2 },2 ),
      //   (s) => (s == "a" ? 0 : 1),
      //   (s) => (s == "a" ? 2 : 1),
      //   (s) => 2,
    ];
    this.acceptingStates = [0, 1];
    this.r = 100;
    this.doSpheres();
    this.lol = {};
    this.lines = {};
    this.linePoints = {};

    this.doAllLines();
    // this.fillLines();

    this.currentString = "";
    this.currentIndex = 0;
  }
  doAllReset() {
    this.doSpheres();
    this.doAllLines();
  }
  doSpheres() {
    this.spheres = this.states.map((v, index) => {
      return {
        x: index * this.r * 2 + this.r,
        y: height / 2,
      };
    });
  }
  doAllLines() {
    this.lol = {};
    this.lines = {};
    this.linePoints = {};
    for (let i = 0; i < this.states.length; ++i) {
      let s = this.states[i];
      console.log();
      const indexA = s.next("a");
      const indexB = s.next("b");
      // check lines between i and indexA, i and indexB;
      const doStuff = (i1, i2, symbol, start) => {
        let found = false;
        let num = 0;
        let name;
        while (!found) {
          for (let suffix of ["up", "down"]) {
            name = i1 + "-" + i2 + "-" + suffix + "-" + num;
            if (!this.lines[name]) {
              // i.e. empty
              found = true;
              break;
            }
          }
          num++;
        }
        this.lines[name] = [symbol, start];
        this.lol[start + "-" + (start == i1 ? i2 : i1) + "-" + symbol] = name;
      };
      //   let i1 = min(i, indexA);
      //   let i2 = max(i, indexA);
      doStuff(min(i, indexA), max(i, indexA), "a", i);
      doStuff(min(i, indexB), max(i, indexB), "b", i);
      // let suffix = "u"
    }
    this.fillLines();
  }
  reset() {
    this.currentIndex = 0;
    this.currentString = "";
  }

  next(inputSymbol) {
    this.currentString += inputSymbol;
    this.currentIndex = this.states[this.currentIndex].next(inputSymbol);
  }

  draw() {
    // let p = 100;
    // let r = 100;
    for (let i in this.states) {
      if (i == this.currentIndex) {
        if (this.acceptingStates.find((x) => x == i) >= 0) stroke(0, 255, 0);
        else stroke(255, 0, 0);
      } else stroke(255);

      if (selected.find((x) => x == i) >= 0) {
        strokeWeight(5);
      } else {
        strokeWeight(1);
      }

      const { x, y } = this.spheres[i];
      ellipse(x, y, this.r);
      //   p += r * 2;
    }
    strokeWeight(1);
    for (let l in this.lines) {
      const lols = l.split("-");
      const i1 = parseInt(lols[0]);
      const i2 = parseInt(lols[1]);
      const dir = lols[2];
      strokeSymbol(this.lines[l][0]);

      const num = parseInt(lols[3]);
      let midX, midY;
      if (i1 != i2) {
        let { x: posX, y: posY } = this.spheres[i1];
        let { x: posX2, y: posY2 } = this.spheres[i2];
        midX = (posX + posX2) / 2;
        midY = this.r * (dir == "up" ? -1 : 1) * (num + 1) + posY;

        fillSymbol(this.lines[l][0]);

        noFill();
        beginShape();
        curveVertex(posX, posY);
        curveVertex(posX, posY);
        curveVertex(midX, midY);
        curveVertex(posX2, posY2);
        curveVertex(posX2, posY2);

        endShape();
      } else {
        let { x: posX, y: posY } = this.spheres[i1];
        beginShape();
        curveVertex(posX - this.r / 2, posY);
        curveVertex(posX - this.r / 2, posY);
        midX = posX;
        midY = posY + (dir == "up" ? -1 : 1) * this.r * (num + 1);
        curveVertex(midX, midY);
        curveVertex(posX + this.r / 2, posY);
        curveVertex(posX + this.r / 2, posY);
        endShape();
      }

      fillSymbol(this.lines[l][0]);
      //   if (this.lines[l][0] == "a") fill(0, 255, 0);
      //   else fill(0, 0, 255);
      triangle(
        midX,
        midY - 10,
        midX,
        midY + 10,
        midX + (this.lines[l][1] == i1 ? 1 : -1) * 10,
        midY
      );
      noFill();
      text(this.lines[l][0], midX - 10, midY - 20, midX + 10, midY);
    }

    for (let i of this.acceptingStates) {
      if (i == this.currentIndex) stroke(0, 255, 0);
      else stroke(255);
      ellipse(this.spheres[i].x, this.spheres[i].y, this.r * 0.8);
    }
  }

  fillLines() {
    for (let l in this.lines) {
      const lols = l.split("-");
      const i1 = parseInt(lols[0]);
      const i2 = parseInt(lols[1]);
      const dir = lols[2];
      const num = parseInt(lols[3]);
      let midX, midY;
      if (i1 != i2) {
        let { x: posX, y: posY } = this.spheres[i1];
        let { x: posX2, y: posY2 } = this.spheres[i2];
        midX = (posX + posX2) / 2;
        midY = this.r * (dir == "up" ? -1 : 1) * (num + 1) + posY;
        if (this.lines[l][0] == "a") fill(0, 255, 0);
        else fill(0, 0, 255);
        if (this.lines[l][1] == i1) ellipse(posX, posY, 10, 10);
        else ellipse(posX2, posY2, 10, 10);
        this.linePoints[i1 + "-" + i2 + "-" + this.lines[l][0]] = {
          posX,
          posY,
          midX,
          midY,
          posX2,
          posY2,
        };
      } else {
        let { x: posX, y: posY } = this.spheres[i1];
        midX = posX;
        midY = posY + (dir == "up" ? -1 : 1) * this.r * (num + 1);
        const posX2 = posX,
          posY2 = posY;
        this.linePoints[i1 + "-" + i2 + "-" + this.lines[l][0]] = {
          posX,
          posY,
          midX,
          midY,
          posX2,
          posY2,
        };
      }

      this.linePoints[i2 + "-" + i1 + "-" + this.lines[l][0]] = this.linePoints[
        i1 + "-" + i2 + "-" + this.lines[l][0]
      ];

      const [sym, start] = this.lines[l];
      const end = i1 == start ? i2 : i1;
      const name = start + "-" + end + "-" + sym;
      this.lol[name] = this.linePoints[i2 + "-" + i1 + "-" + this.lines[l][0]];
    }
  }

  getLinePoint(stateIndexStart, stateIndexEnd, symbol) {
    return this.lol[stateIndexStart + "-" + stateIndexEnd + "-" + symbol];
  }
  addState(table = {}) {
      table = {a: this.states.length, b:this.states.length}
    this.states.push(new State(table, this.states.length));
  }
  /**
   * Converts this to a regex string
   */
  toRegex() {
  }
}
