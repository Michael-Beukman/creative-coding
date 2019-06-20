class Element {
  constructor(positions = null, numPoints = 2) {
    if (!positions) {
      positions = [];
      for (let j = 0; j < numPoints; ++j) {
        positions[j] = [];
        for (let i = 0; i < 5; ++i) {
          positions[j].push(p5.Vector.random2D());
          positions[j][i].x = (positions[j][i].x * width) / 2;
          positions[j][i].y = (positions[j][i].y * height) / 2;
        }
      }
    }
    this.positions = positions;
    this.fitness = -1;
    this.area = 0;
  }

  mutate(chance = 0.1) {
    for (let i in this.positions) {
      for (let j in this.positions[i]) {
        if (random() < chance) {
          const r = p5.Vector.random2D();
          // r.x -= 0.5; r.y -= 0.5;
          r.mult(200);
          this.positions[i][j].add(r);
        }
      }
    }
  }

  breed(other) {
    let newPos = [];
    for (let i in this.positions) {
        newPos.push([]);
      for (let j in this.positions[i]) {
        newPos[i].push(
          p5.Vector.add(this.positions[i][j], other.positions[i][j]).div(2)
        );
      }

      // // if (random() < 0.5)
      //     newPos.push(this.positions[i]);
      // else
      //     newPos.push(other.positions[i]);
    }
    return new Element(newPos);
  }
}
