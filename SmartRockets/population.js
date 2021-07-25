function Population()
{
  this.rockets = [];
  this.popSize = popSize;
  this.topPercent = 0.2;
  this.matingPool = []
   for (let i=0; i<this.popSize;++i)
   {
     this.rockets.push(new Rocket());
   }

   this.update = function()
   {
     let completed = true;
     for (let i=0; i<this.popSize;++i)
     {
       this.rockets[i].update();
       this.rockets[i].show();
       if (!(this.rockets[i].touching || this.rockets[i].crashed))
       {
         completed = false;
       }
     }
     return completed;
   }

this.evaluate = function()
  {
    averageFitness = 0;
    let dist = {}
    let maxFit = 0;
    for (let i=0;i<this.rockets.length; ++i)
    {

      this.rockets[i].calcFitness();
      //numHit +=this.rockets[i].touching;

      if (this.rockets[i].fitness>maxFit)
      {
        maxFit = this.rockets[i].fitness;
      }

      if (this.rockets[i].touching)
      {
        ++numHit;
        if ((this.rockets[i].distTraveled < prevBestDist || prevBestDist<0))
        {
            prevBestDist = this.rockets[i].distTraveled;
            distGen = genCount;
            //console.log(prevBestDist, genCount, distGen);
        }

        if ((this.rockets[i].time < MinTime || MinTime<0))
        {
            MinTime = this.rockets[i].time;
            timeGen = genCount;
        }

      }
    }//for

    this.matingPool = [];

    maxFitRocket = maxFit;
      //normalise
    this.rockets.sort(sortOnFitness);
    for (let i=0; i<this.rockets.length; ++i)
    {
        this.rockets[i].fitness /= maxFit;
        averageFitness +=this.rockets[i].fitness;
        let temp = this.rockets[i].fitness * 100;
        for (let j=0; j<temp;++j)
        {
          this.matingPool.push(i);
        }
    }//for
    averageFitness/=this.rockets.length ;
    averageFitness*=maxFit;
    //get Pool

  /*
    for (var i=0; i<this.rockets.length; ++i)
    {
        let temp = this.rockets[i].fitness * 100;
        for (var j=0; j<temp;++j)
        {
          this.matingPool.push(i);
        }
    }//for
  */
    newPop = this.mate();
    if (this.rockets[0].touching ||1)
    {
      newPop.splice(newPop.length-1,1);
      //console.log('newpop length after splice', newPop.length);
      let best = this.rockets[0];
      best.pos = createVector(width/2,height);
      best.col = [0,0,255];
      best.vel.mult(0);
      best.distTraveled = 0;
      best.touching = false;
      best.crashed = false;
      newPop.push(best);
      //console.log(best,'BEST');
    }
    //noLoop();
    //return;

    /*
    if (numHit>0){
        console.log('rockets:', this.rockets);
        console.log('new:', newPop);
        console.log('mating:', this.matingPool);
        noLoop();
        return;
      }
      */

    this.rockets = newPop;
  }
  this.mate = function()
  {
    let len = this.matingPool.length-1;
    let ans = [];
    for (let i =0; i<this.popSize;++i)
    {
      let index1 = Math.floor( Math.random() *len);
      let index2;
      while (index2!=index1){
        index2 = Math.floor( Math.random() *len);
      }
      childGenes = this.rockets[ this.matingPool[index1] ].dna.crossover( this.rockets[this.matingPool[index2] ].dna);
      let childDNA = new DNA(childGenes) ;
      childDNA.mutate();
      let x = new Rocket(childDNA);
      ans.push(x);
    }
    return ans;
  }

}//pop
