function DNA(maxSize,MR,genes)
{
  this.maxSize = maxSize;
  this.mutationRate = MR;
  this.fitness = 0;
  this.prob = 0;
  this.col = 255;
  if (genes){this.genes = genes}
  else
  {
    //random dna:
    this.genes = [];
    for (let i=0; i<maxSize;++i)
    {
      //let r =int(random(0,maxSize))
      this.genes.push(i);
    }
    this.genes = shuffle(this.genes);
  }

  this.crossover = function(other)
  {
    let midpoint = random(0,this.maxSize);
    let cGenes = this.genes.slice();
    for (let i=0; i<this.maxSize;  ++i)
    {
        let gene;
        if (i<midpoint)
        {
          //then swap
          //gene = this.genes[i];
          if (cGenes[i] != other.genes[i]){
            let index2 = cGenes.indexOf(other.genes[i]);
            //swap
            let temp = cGenes[i];
            cGenes[i] = cGenes[index2];
            cGenes[index2] = temp;
          }

        }

        //cGenes[i] = (gene);
    }
    let child = new DNA(this.maxSize,this.mutationRate, cGenes);
    return child;
  }

  this.mutate = function()
  {
    for (let i=0; i<this.maxSize; ++i)
    {
      if (Math.random()<this.mutationRate)
      {
        //swap 2 random points;
        while (1)
        {
            index2 =int(random(0,this.maxSize));
            if (index2 !=i)
            {
              break;
            }
        }

        //swap:
        let temp = this.genes[i];
        this.genes[i] = this.genes[index2];
        this.genes[index2] = temp;
      }
    }//for

  }

}
