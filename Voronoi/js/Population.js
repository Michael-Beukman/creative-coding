class Population {
  constructor(numElems = 100) {
    this.pop = [];
    this.numElems = numElems;
    this.init();
    this.best = new Element();
  }
  init() {
    this.pop = [];
    for (let i = 0; i < this.numElems; ++i) {
      this.pop.push(new Element());
    }
  }
  step() {
    this.calcFitnesses();
    const newPos = this.breed();
    this.pop = newPos;
    if (!this.pop || this.pop.length == 0) {
      this.init();
      return;
    }
    // draw best
    const best = this.best;
    // for (let p of best.positions){
    //     // line(LEFT_CORNER.x, LEFT_CORNER.y, best.positions[0].x, best.positions[0].y)
    //     // line(RIGHT_CORNER.x, RIGHT_CORNER.y, best.positions[0].x, best.positions[0].y)
    //     ellipse(p.x, p.y, 20);
    // }
  }

  calcAreaRatios(elem, log) {
    const polyLines = findPolygonLinesAroundPoints(elem.lines);
    const verts = [];
    const areas = [];
    const cols  =[
      [255,0,0],
      [0,255,0],
      [0,0,255],
      [255, 255,0],
      [0, 255, 255],
      [255,0,  255]
    ]
    let i =0;
    for (let group of polyLines){
      let temp=[]
      for (let l of group){
        temp.push(l.start, l.end);
        if (log && i == 1){
          fill(color(cols[i]));
          ellipse(l.start.x, l.start.y, 10)
          ellipse(l.end.x, l.end.y, 10)
          l.draw();
          ellipse(points[i].x, points[i].y, 20);
        }
      }
      ++i;  
      verts.push(temp);
      areas.push(calcAreaFromVerts(temp)/mainArea);
    }

    if (log) {

      console.log(areas, 'ae');
    }
    return areas;
  }

  calcFitnesses() {
    const self = this;
    let multi = 0;
    function calcSingle(elem) {
      if (!validSplit(elem.lines)) {
        // console.log('ss')  
        // return -0.4;
        multi +=0.5;
      }
      for (let l of elem.lines) 
      if (outside(polygonLines, l.end) || outside(polygonLines, l.start)) {
        multi +=0.1;
        break;
      }
      // if (outside(polygonLines, elem.center)) return -1;
      // now calc area
      const areas = self.calcAreaRatios(elem);
      let fit = 0;
      elem.areas = [];
      for (let i in areas) {
        const a = areas[i];
        elem.areas.push(a);
        fit += abs(a - ratios[i]);
        }
      return 1 / (fit + 1) - multi;

      return 0.001;
    }
    for (let e of this.pop) {
      e.fitness = calcSingle(e);
      // console.log(e.fitness);
    }
  }

  getBreedingPairs() {
    const notBad = this.pop.filter((e) => e.fitness >= -0.5);
    notBad.forEach((e)=>e.fitness+=0.15);
    return notBad;
  }

  areaComp(a1, a2) {
    let d1 = 0,
      d2 = 0;
    for (let i in ratios) {
      d1 += abs(a1[i] - ratios[i]);
      d2 += abs(a2[i] - ratios[i]);
    }
    return d1 < d2;
  }

  breed() {
    const pairs = this.getBreedingPairs();
    if (pairs.length == 0) {
      this.init();
      // console.log('p')
      return this.pos;
    }
    let arr = [];
    let maxFit = 0;
    let maxI;
    for (let i in pairs) {
      if (pairs[i].fitness > maxFit) {
        maxFit = pairs[i].fitness;
        maxI = i;
      }
    }
    // console.log(pairs);
    for (let i in pairs) {
      pairs[i].fitness /= maxFit;
      //   print(pairs[i].fitness);
      for (let j = 0; j < 10 * pairs[i].fitness; ++j) {
        arr.push(i);
      }
    }

    if (arr.length == 0) {
      this.init();
      // console.log('p')
      return this.pos;
    }
    //   noLoop();
    let newPop = [];
    while (newPop.length < this.pop.length) {
      const i1 = random(arr);
      const i2 = random(arr);
      // console.log(i1, i2)
      // const c = this.pop[i1].breed(this.pop[i2]);
      const c = pairs[i1].breed(pairs[i2]);
      c.mutate(0.5);
      newPop.push(c);
    }
    // console.log(pairs[maxI].areas)
    if (this.areaComp(pairs[maxI].areas, this.best.areas))
      this.best = pairs[maxI];  
    //   newPop.push(pairs[maxI]);
      // console.log(maxI);
    // noLoop();
    return newPop;
  }
}
