function Population(MR, popSize, numPoints)
{
  this.population = [];
  this.MR = MR;
  this.popSize = popSize;

  for (let i=0; i<this.popSize; ++i)
  {
    this.population.push(new DNA(numPoints, this.MR));
  }
  this.show = function()
  {
    for (let i=0; i<this.population.length;++i)
    {
      stroke(this.population[i].col);
      for (let j=0; j<this.population[i].genes.length-1; ++j)
      {
        let index1 = this.population[i].genes[j];
        let index2 = this.population[i].genes[j+1];
        line(arrPoints[index1].x, arrPoints[index1].y, arrPoints[index2].x, arrPoints[index2].y);
      }
    }
  }

  this.calcFitness = function()
  {
    let maxFits =0;
    sumFit=0;
    aveFit = 0;
    for (let i=0; i<this.population.length; ++i)
    {
        let distTraveled = getDist(this.population[i].genes);
        distTraveled = Math.max(distTraveled, 1);
        aveFit+=distTraveled;
        let fitness = 1/distTraveled;
        //fitness = pow(fitness,2);
        sumFit+=fitness;
        if (fitness>maxFits)
        {
          maxFits = fitness;

        }
        this.population[i].fitness = fitness;
    }
    this.maxFit = maxFits;
    this.sumFit = sumFit;
  }

  this.getRand = function()
  {
    let index = 0;
    r = Math.random();
    while (r>0)
    {
      r -= this.population[index].prob;
      ++index;
    }
    --index;
    return index;
  }

  this.evaluate = function()
  {
    this.calcFitness();
    //return;
    for (let i=0; i<this.population.length; ++i)
    {
        let prob =this.population[i].fitness/this.sumFit;
        this.population[i].prob = prob //probabilities
    }
    this.population.sort(sortOnFitness);
    let best  = this.population[0];
    if (maxfit<this.maxFit){
        maxfit = this.maxFit;
        bestSoFar = best.genes;
        bestGen = genCount;
      }
    let newPop = this.mate();
    newPop.sort(sortOnFitness);
    newPop = newPop.slice(0,newPop.length-1);

    newPop.push(best);
    this.population = newPop;
  }

  this.mate = function()
  {
    let newPop = [];
    for (let i=0; i<this.popSize; ++i)
    {
      let parentA = this.getRand();
      let parentB = this.getRand();
      while (parentA == parentB)
      {
        parentB = this.getRand();
      }
      parentA = this.population[parentA];
      parentB = this.population[parentB];
      let child = parentA.crossover(parentB);
      child.mutate();
      newPop.push(child);
    }//fori
    return newPop;
  }

}
