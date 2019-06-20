class Population {
  constructor(numElems = 400) {
    this.pop = [];
    this.numElems = numElems;
    this.init();
    this.best = { area: 0 };
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

  calcFitnesses() {
    function calcSingle(elem) {
      let verts = [];
      const b = elem;
      let bestFit = -1;
      for (let i =0; i< b.positions.length && bestFit==-1; ++i){
        const lines1 = getLines(b.positions[i]);
          for (let j =i+1; j< b.positions.length; ++j){
            const lines2 = getLines(b.positions[j]);
            // any intersects
            for (let l of lines1){
              for (let l2 of lines2){
                if (l.getIntersectPoint(l2)!==null) {
                  bestFit = 0.000000000005;
                  break;
                }
               }
            }
          }
      }
      for (let pCount = 0; pCount < elem.positions.length; ++pCount) {
        const verts = elem.positions[pCount];
        const v = validSplit(verts, points[pCount]);
        if (!v) return 0.0000000005;
      }
      // const v = validSplit(all);
      // console.log(v);
      // if (!v) return 0.0000000005;
      // if (outside(getLines(all), points[0])) return 0.000000001;
      let fitSum = 0;
      for (let i in elem.positions) {
        verts = [];
        for (let p of elem.positions[i]) {
          if (outside(polygonLines, p)) return -1;
          verts.push(p);
          // otherwise calc area
          // left, right corners
        }
        // console.log(verts.length)
        // verts.push(LEFT_CORNER, RIGHT_CORNER);
        const area = calcAreaFromVerts(verts);
        fitSum += 1/((abs(area-ratios[i])) + 0.0001);
        if (i == 0) 
          elem.area = area / mainArea;

      }
      return min(fitSum, bestFit);
      return 1 / (abs(area1 / mainArea - ratios[0]) + 0.0001);
    }
    for (let e of this.pop) {
      e.fitness = calcSingle(e);
    }
  }

  getBreedingPairs() {
    const notBad = this.pop.filter((e) => e.fitness >= -0.5);
    return notBad;
  }

  breed() {
    const pairs = this.getBreedingPairs();
    if (pairs.length == 0) {
      this.init();
      return this.pos;
    }
      // console.log(pairs.length);
    let arr = [];
    let maxFit = 0;
    let maxI;
    for (let i in pairs) {
      if (pairs[i].fitness > maxFit) {
        maxFit = pairs[i].fitness;
        maxI = i;
      }
    }
    for (let i in pairs) {
      pairs[i].fitness /= maxFit;
      //   print(pairs[i].fitness);
      for (let j = 0; j < 100 * pairs[i].fitness; ++j) {
        arr.push(i);
      }
    }
    //   console.log(arr);
    //   noLoop();
    let newPop = [];
    while (newPop.length < this.pop.length) {
      const i1 = random(arr);
      const i2 = random(arr);
      const c = this.pop[i1].breed(this.pop[i2]);
      c.mutate(1);
      newPop.push(c);
    }
    if (
      !this.best.area ||
      abs(this.best.area - ratios[0]) > abs(pairs[maxI].area - ratios[0])
    )
      this.best = pairs[maxI];
    //   newPop.push(pairs[maxI]);
    //   console.log(pairs[maxI].area);
    // noLoop();
    return newPop;
  }
}
