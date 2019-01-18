color c = color(0);
float x = 0;
float y = 100;
float speed = 1;
Particle curr;
ArrayList<Particle> snowflake;
void setup() {
  size(800,800);
  curr = new Particle(width/2, 0);
  snowflake = new ArrayList<Particle>();
}

void draw() {
  translate(width/2, height/2);
  background(0);
  curr.update();
  curr.show();
  //move();
  //display();
}

void move() {
  x = x + speed;
  if (x > width) {
    x = 0;
  }
}

void display() {
  fill(c);
  rect(x,y,30,10);
}
