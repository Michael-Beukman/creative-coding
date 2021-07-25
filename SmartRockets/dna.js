  function DNA(genes)
{
    this.numThrusters = lifespan;
  if (genes){
    this.genes = genes}
  else{
    this.genes = [];
    for (var i=0; i<this.numThrusters; ++i)
  {
     this.genes.push(p5.Vector.random2D());
     this.genes[i].setMag(forceMag)
  }
}
//console.log(this.genes.length);


  this.mutateRate = mutationRate;

  this.mutate = function()
  {
    for (var i=0; i<this.genes.length; ++i)
    {
      if (Math.random()<this.mutateRate)
      {
        let temp = p5.Vector.random2D();
        temp.setMag(forceMag);
        this.genes[i] = temp;
        //a.setMag(0.1);
      }
    }//for i
  }


  this.crossover = function(other)
  {

    let child = [];
    for (var i=0; i<this.genes.length; ++i)
    {
      let bottom = this.genes.length/4;
      let midpoint = random(bottom,bottom*3);
      if (i>midpoint)
      {
        child[i] = this.genes[i];
      }
      else
      {
        child[i] = other.genes[i];
      }

    }//for
    return child;
  }
}//dna
