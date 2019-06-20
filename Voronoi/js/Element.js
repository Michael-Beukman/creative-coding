class Element {
  constructor(lines=null, center=null, positions=null) {
      const arr = [LEFT_CORNER, RIGHT_CORNER, LEFT_B, RIGHT_B];
    if (!lines) {
      center = createVector(-100, 100) //p5.Vector.random2D();
    //   center.mult()
        lines = []
        positions=  [];
        for (let i = 0; i < 2; ++i) {
          const v = arr[i];//p5.Vector.random2D();
        //   v.x = (v.x * width) / 2;
        //   v.y = (v.y * height) / 2;
        //   v = arr[i];
          lines.push(new Line(center.x, center.y, v.x, v.y));
          positions.push(v);
        }
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
      for (let p of pos){
          lines.push(new Line(center.x, center.y, p.x, p.y));
          if (!leftMost || p.x < leftMost.x) leftMost = p;
          if (!rightMost || p.x > rightMost.x) rightMost = p;
      }
      lines.push(new Line(leftMost.x, leftMost.y, LEFT_MID.x, LEFT_MID.y), 
      new Line(rightMost.x, rightMost.y, RIGHT_MID.x, RIGHT_MID.y))
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
        r.mult(200);
        this.center.add(r);
      }
      this.lines = this.makeLines(this.positions, this.center);
  }

  breed(other) {
    let newPos = [];
      for (let j in this.positions) {
        newPos.push(
          p5.Vector.add(this.positions[j], other.positions[j]).div(2)
        );
    }
    const newCenter = p5.Vector.add(this.center, other.center).div(2);
    const newLines = this.makeLines(newPos, newCenter);
    return new Element(newLines, newCenter, newPos);
  }
}
