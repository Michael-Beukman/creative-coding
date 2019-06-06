class Population {
  constructor(agents) {
    this.numAgents = agents.length;
    this.agents = agents;
    this.newGen = [];
  }

  stepOneGen(checkpoints) {

    const bestAgent = this.calcFitness();
    const breedingpool = this.select();
    let children = this.crossover(breedingpool);
    children = this.mutate(children);
    this.agents = children; // add best of last
    this.agents.push(bestAgent);
    return bestAgent.fitness;
  }

  calcFitness() {
    let bestF = -1;
    let bestA = null;
    let sumF = 0;
    for (let i = 0; i < this.agents.length; ++i) {
      this.agents[i].fitness = this.agents[i].checkpointsReached.length;
      sumF += this.agents[i].fitness;
      if (!bestA || bestF < this.agents[i].fitness) {
        bestF = this.agents[i].fitness;
        bestA = this.agents[i];
      }
    }

    if (sumF == 0) {
      bestA.fitness = 1;
    }
    const f = bestA.fitness;
    bestA = bestA.copy();
    bestA.setColor(color(0, 0, 255));
    bestA.fitness = f;
    bestA.size =32;
    for (let i = 0; i < this.agents.length; ++i) {
      this.agents[i].fitness /= sumF ? sumF : 1;
    }

    return bestA;
  }

  select() {
    this.agents.sort((a, b) => b.fitness - a.fitness);
    const a = this.agents.slice(0, round(this.agents.length / 3));
    // console.log(a)
    // console.log(this.agents);
    // console.log(het.emsag);
    return a;
  }

  getParent(pool) {
    let r = 1;
    let index
    while (r > 0) {
      index = round(random(pool.length - 1));
      r -= pool[index].fitness;
    }
    return pool[index];
  }

  crossover(pool) {
    const children = [];
    while (children.length < this.agents.length - 1) {
      const p1 = this.getParent(pool);
      let p2 = this.getParent(pool);
      while (p1 != p2)  p2 = this.getParent(pool);
      children.push(p1.cross(p2));
    }
    return children;
  }

  mutate(children){
    for (let i=0; i< children.length; ++i){
        children[i].mutate();
    }
    return children;
  }
}
