class Population {
  constructor(numElems = 400) {
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
    let vs = elem.positions.slice();
    vs = orderVertices(vs);
    let areas = [];
    for (let i = 0; i < vs.length; ++i) {
      const j = (i + 1) % vs.length;
      let l1 = null,
        l2 = null;
      for (let l of elem.lines) {
        if (l.end.x == vs[i].x && l.end.y == vs[i].y) l1 = l;
        if (l.end.x == vs[j].x && l.end.y == vs[j].y) l2 = l;
      }
      if (!l1 || !l2) {
        console.log("NOT");
        noLoop();
        return;
      }
      // yBound is one that is furthest away from point, and everythin in direction up to point. Similarly for x
      const xBound = l2.end.x;
      const yBound = l1.end.y;
      // console.log(xBound, l2.end.x);
      const less = (a, b) => a < b;
      const greater = (a, b) => a >= b;
      let xFunc = greater;
      if (l1.end.x <= l2.end.x) xFunc = less;
      let yFunc = less;
      // console.log(xBound, l2.end.x);
      if (l2.end.y < l1.end.y) yFunc = greater;
      // console.log("xx", xBound, yBound, l2.end.x);

      // console.log(xFunc, yFunc)
      const polyVerts = getLineElemVerts(xBound, yBound, xFunc, yFunc);
      // noLoop();
      polyVerts.push(l1.end, l2.end, LEFT_MID, RIGHT_MID);
      if (log){
        fill(0,255,0)
        for (let p of polyVerts){
          ellipse(p.x,p.y, 30);
        }
              stroke(255,0,0);
      line(xBound, -100, xBound, 100);
      line(-100, yBound, 100, yBound);

      l1.draw();
      stroke(0,255,0);
      l2.draw()
      }
      // throw "";
      areas.push(calcAreaFromVerts(polyVerts));
    }
    return areas;
  }

  calcFitnesses() {
    const self = this;
    function calcSingle(elem) {
      if (!validSplit(elem.lines)) {
        // console.log('ss')
        return -1;
      }
      for (let l of elem.lines) if (outside(polygonLines, l.end)) return -1;
      if (outside(polygonLines, elem.center)) return -1;
      // now calc area
      const areas = self.calcAreaRatios(elem);
      let fit = 0;
      elem.areas = [];
      for (let i in areas) {
        const a = areas[i] / mainArea;
        elem.areas.push(a);
        fit += abs(a - ratios[i]);
      }
      return 1 / (fit + 0.0001);

      return 0.001;
    }
    for (let e of this.pop) {
      e.fitness = calcSingle(e);
      // console.log(e.fitness);
    }
  }

  getBreedingPairs() {
    const notBad = this.pop.filter((e) => e.fitness >= -0.5);
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
    for (let i in pairs) {
      pairs[i].fitness /= maxFit;
      //   print(pairs[i].fitness);
      for (let j = 0; j < 100 * pairs[i].fitness; ++j) {
        arr.push(i);
      }
    }
    // console.log(arr);
    //   noLoop();
    let newPop = [];
    while (newPop.length < this.pop.length) {
      const i1 = random(arr);
      const i2 = random(arr);
      const c = this.pop[i1].breed(this.pop[i2]);
      c.mutate(1);
      newPop.push(c);
    }
    // console.log(pairs[maxI].areas)
    if (this.areaComp(pairs[maxI].areas, this.best.areas))
      this.best = pairs[maxI];
    //   newPop.push(pairs[maxI]);
    //   console.log(pairs[maxI].area);
    // noLoop();
    return newPop;
  }
}
