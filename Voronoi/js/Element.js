class Element {
  constructor(lines=null, center=null, positions=null) {
      const arr = [LEFT_CORNER.copy(), RIGHT_CORNER.copy(), LEFT_B.copy(), RIGHT_B.copy()];
    if (!lines) {
      center = p5.Vector.random2D(); // createVector(-100, 100) //
      center.mult(200);
        lines = []
        positions=  [];
        for (let i = 0; i < 3; ++i) {
          // const v=   p5.Vector.random2D();
          const v = random(arr);
          const r = p5.Vector.random2D();
          // r.mult(10)
          v.add(r);
          // v.x = (v.x * width) / 2;
          // v.y = (v.y * height) / 2;
          // v = arr[i];
          // lines.push(new Line(center.x, center.y, v.x, v.y));
          positions.push(v);
        }
        // positions.push(LEFT_CORNER, RIGHT_CORNER);
        lines = this.makeLines(positions, center);
    }
    this.positions = positions;
    this.lines = lines;
    this.center = center;
    this.fitness = -1;
    this.area = 0;
    this.areas = [];
    for (let l of lines) this.areas.push(0);
  }

  makeLines(pos, center){
      let lines = []
      let leftMost=null, rightMost=null;
      for (let j in pos){
        let p  =pos[j];
        let isGood = false;
        for (let poly of polygonLines){
          if (poly.isInBetween(p)) isGood = 1;
          if (isGood) break;
        }
        if (!isGood){
          const vec = p5.Vector.sub(p, center);
          vec.mult(10000);
          vec.add(p);
          let didChange = false;
          const tempL = new Line(p.x, p.y, vec.x, vec.y);
          for (let poly of polygonLines){
            const intp = poly.getIntersectPoint(tempL);
            if (intp){
              pos[j] = intp;
              p = intp;
              didChange = true;
              break;
            }
          }
          if (!didChange){
            const tempL = new Line(p.x, p.y, center.x, center.y);
            for (let poly of polygonLines){
              const int = poly.getIntersectPoint(tempL);
              if (int){
                p = int;
                pos[j] = int;
                break;
              }
            }
          }
        }
          // if p is not in polygonline, extend to make it so

          lines.push(new Line(center.x, center.y, p.x, p.y));
          if (!leftMost || p.x < leftMost.x) leftMost = p;
          if (!rightMost || p.x > rightMost.x) rightMost = p;
      }

      return lines;
  }

  mutate(chance = 0.1) {
      for (let j in this.positions) {
        if (random() < chance) {
          const r = p5.Vector.random2D();
          // r.x -= 0.5; r.y -= 0.5;
          r.mult(200);
          this.positions[j].add(r);
        }
      }
      if (random() < chance) {
        const r = p5.Vector.random2D();
        r.mult(400);
        this.center.add(r);
      }
      this.lines = this.makeLines(this.positions, this.center);
  }

  breed(other) {
    let newPos = [];
      for (let j in this.positions) {
        if (random() < 0.5){
            newPos.push(this.positions[j].copy())
        }else{
          newPos.push(other.positions[j].copy())
        }
        // newPos.push(
          // p5.Vector.add(this.positions[j], other.positions[j]).div(2)
        // );
    }
    const newCenter = this.center.copy(); p5.Vector.add(this.center, other.center).div(2);
    const newLines = this.makeLines(newPos, newCenter);
    return new Element(newLines, newCenter, newPos);
  }
}
