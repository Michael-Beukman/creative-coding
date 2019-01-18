class Particle {
  PVector pos;
  float r;
  Particle(float x, float y) {
    pos= new PVector(x,y);
    r = 3;
  }
  
  void update(){
    this.pos.x -=1;
    this.pos.y += random(-3,3);
    
    float angle = pos.heading();
    angle= constrain(angle, 0, PI/6);
    float mag = pos.mag();
    pos.x = mag * cos(angle);
    pos.y = mag * sin(angle);
  }
  
  void show(){
     ellipse(this.pos.x, this.pos.y, r*2, r*2); 
  }
}
