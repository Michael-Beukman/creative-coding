import peasy.*;

float scale = 20;
PeasyCam cam;
void setup(){
   size(1200, 1000, P3D);
   cam = new PeasyCam(this, 100);
}

void draw(){
  background(0);
  stroke(255);
  noFill();
  //translate(width/2, height/2);
  //line(0,0,100,100);
  //circleLevelCurve(1);
  stroke(255);
  //cool(0);
  //stroke(255, 0, 255);
  //cool(1);
  
  //stroke(0, 0, 255);
  //cool(2);
  cool3D();
  for (int i=-10; i< 5; ++i){
    //cool(i);
  }
} 


void circleLevelCurve(float r){
  ArrayList<PVector> points = new ArrayList<PVector>();
   for (float x=-5; x<=5; x+=0.1){
     for (float y=-5; y<=5; y+=0.1){
       if (abs(x*x + y*y - r * r) < 1) points.add(new PVector(x, y));
     }
   }
   beginShape();
   println(points.size());
   for (PVector p: points){
     vertex(p.x * scale, p.y * scale);
   }
   endShape();
}


void cool(float a){
  //f(x, y) = x + y^2 + xy = a
  beginShape();
  for (float t = -100; t<=100; t+=0.01){
       vertex( (a-t*t)/(1+t)*scale , t*scale);
  }
  endShape();
}

void cool3D(){
  for (float x=-5; x<=5; x+=0.01){
    for (float y=-5; y<=5; y+=0.01){
      point(x*scale, y*scale, scale*(x + y*y + x * y));
    }
  }
}
