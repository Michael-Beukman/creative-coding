/// <reference path="../p5.d/p5.global-mode.d.ts" />

class Ray {
  constructor(pos, dir) {
    /** @type {p5.Vector} */
    this.pos = pos;
    /** @type {p5.Vector} */
    this.dir = dir.normalize();
  }

  /**
   *
   * @param {number} maxDist
   * @param {Boundary[]} boundaries
   */
  cast(maxDist, boundaries, reflectCount = 0) {
    let closestOne = null;
    let closestDist = Infinity;
    let bestHit = null;

    for (let b of boundaries) {
      // console.log('rr')
      const ans = this.intersect(b);
      if (ans.hit) {
        if (ans.dist < closestDist && ans.dist < maxDist) {
          closestDist = ans.dist;
          closestOne = b;
          bestHit = ans;
        }
      }
    }
    if (closestOne != null) {
      if (reflectCount > 0 && bestHit.hit) {
        const col = bestHit.colour.slice();
        const reflectDir = reflect(this.dir, bestHit.normal);
        const newRay = new Ray(p5.Vector.add(bestHit.point, p5.Vector.mult(reflectDir,0.1)), reflectDir);
        bestHit = newRay.cast(maxDist, boundaries, reflectCount - 1);
        // bestHit.factor *= 0.8;
        // now merge colors;
        for (let i in bestHit.colour){
            bestHit.colour[i] = bestHit.colour[i] * 0.7 + col[i];
        }
        // console.log(bestHit.colour);
      }
    } else {
      bestHit = this.makeNoHit();
    }
    return bestHit;
  }

  /**
   * Checks intersections of this ray with boundary
   * @param {Boundary} boundary
   * @return {{hit: boolean dist: number, point: p5.Vector}}
   */
  intersect(boundary) {
    const A = boundary.start.x - this.pos.x;
    const B = boundary.start.y - this.pos.y;
    const d = this.dir.x,
      e = this.dir.y;
    const f = boundary.diff.x,
      g = boundary.diff.y;

    const det = d * g - f * e;
    // console.log(det, d, e, f, g)
    // todo
    if (det == 0) return this.makeNoHit();
    const alpha = (1 / det) * (g * A - f * B);
    let beta = (1 / det) * (d * B - e * A);
    // console.log(alpha, beta)
    beta *= -1;
    if (beta >= 0 && beta <= 1 && alpha > 0) {
      // hit
      const touchPoint = p5.Vector.add(
        this.pos,
        p5.Vector.mult(this.dir, alpha)
      );
      return {
        hit: true,
        dist: alpha,
        point: touchPoint,
        dir: this.dir,
        startPos: this.pos,
        normal: boundary.normal(touchPoint, this.dir),
        factor: 1,
        colour: boundary.colour.slice()
      };
    }
    return this.makeNoHit();
  }

  draw(info){
      const toS = toScreenVec(info.startPos)
      const toS2 = toScreenVec(p5.Vector.add(info.startPos, p5.Vector.mult(info.dir, info.dist)))
      console.log(toS, toS2)
      line(
        toS.x, toS.y,
        toS2.x, toS2.y
      )
  }

  makeNoHit() {
    return {
      hit: false,
      dist: 0,
      point: null,
      dir: this.dir,
      startPos: this.pos,
      normal: null,
      factor: 1
      ,colour: [255,255,255]
    };
  }
}
