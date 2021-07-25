function Pendulum(l, r, a=PI/4, oX=0, oY=0, num=0){
  // this.oX=0;
  // this.oY = 0;
  this.origin = createVector(oX,oY);
  this.l = l;
  this.r= r;
  this.pos = createVector(this.origin.x,this.origin.y+this.l);
  this.num=num;
  this.vel=0; // angular vel
  this.a =a; //angle
  this.acc=0
  this.pos.x = this.l*sin(this.a) + this.origin.x;
  this.pos.y = this.l*cos(this.a) + this.origin.y;

/*
let num1 = -g * (2 * m1 + m2) * sin(a1);
let num2 = -m2 * g * sin(a1 - 2 * a2);
let num3 = -2 * sin(a1 - a2) * m2;
let num4 = a2_v * a2_v * r2 + a1_v * a1_v * r1 * cos(a1 - a2);
let den = r1 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
let a1_a = (num1 + num2 + num3 * num4) / den;

num1 = 2 * sin(a1 - a2);
num2 = (a1_v * a1_v * r1 * (m1 + m2));
num3 = g * (m1 + m2) * cos(a1);
num4 = a2_v * a2_v * r2 * m2 * cos(a1 - a2);
den = r2 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
let a2_a = (num1 * (num2 + num3 + num4)) / den;

*/
  this.update = function(){
    this.pos.x = this.l*sin(this.a) + this.origin.x;
    this.pos.y = this.l*cos(this.a) + this.origin.y;
    this.acc = gravity*sin(this.a/-l);
    //
      //Double Pend acc
      let g=gravity;
      if (num==0){
        // this.acc = -gravity*
        // (  (2*m1 + m2)*sin(a1) - m2*gravity*sin(a1-2*a2) - 2*sin(a1-a2)*m2*
        //     (a_v2*a_v2 * l2 + a_v1*a_v1*l1*cos(a1-a2) )  );
        // this.acc = this.acc/
        // ( l1*(2*m1 + m2 - m2*cos(2*a1 - 2*a2) ) );
        //
        // let num1, num2, num3, den;
        // num1 = -gravity*(2*m1+m2)*sin(a1);
        // num2 = -m2*gravity*sin(a1-2*a2);
        // num3 = -2*sin(a1-a2)*m2*(a_v2*a_v2*l2 + a_v1*a_v1*l1*cos(a1-a2));
        // den = l1*(2*m1 +m2 - m2*cos(2*a1-2*a2));
        // this.acc = (num1+num2+num3)/den;

        let num1 = -g * (2 * m1 + m2) * sin(a1);
        let num2 = -m2 * g * sin(a1 - 2 * a2);
        let num3 = -2 * sin(a1 - a2) * m2;
        let num4 = a2_v * a2_v * l2 + a1_v * a1_v * l1 * cos(a1 - a2);
        let den = l1 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
        this.acc = (num1 + num2 + num3 * num4) / den;
      }
      else{
        // this.acc = (2*sin(a1-a2)*(a_v1*a_v1 * l1*(m1+m2) + gravity*(m1+m2)*cos(a1) + a_v2*a_v2*l2*m2*cos(a1-a2)) );
        // this.acc = this.acc/
        // (l2*(2*m1 + m2 -m2*cos(2*a1 - 2*a2) ));

        // let num1, num2, num3, den;
        // num1 = 2*sin(a1-a2)*(a_v1*a_v1 * l1*(m1+m2) + gravity*(m1+m2)*cos(a1));
        // num2 =a_v2*a_v2*l2*m2*cos(a1-a2);
        // den = l2*(2*m1+m2 - m2*cos(2*a1-2*a2));
        // this.acc = (num1+num2)/den;

        let num1 = 2 * sin(a1 - a2);
        let num2 = (a1_v * a1_v * l1 * (m1 + m2));
        let num3 = g * (m1 + m2) * cos(a1);
        let num4 = a2_v * a2_v * l2 * m2 * cos(a1 - a2);
        let den = l2 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
        // console.log(den);
        this.acc = (num1 * (num2 + num3 + num4)) / den;
      }
    //
    this.vel +=this.acc
    this.a+= this.vel;
  }

  this.show = function(){
    fill(255);
    stroke(255);
    line(this.origin.x, this.origin.y, this.pos.x, this.pos.y);
    ellipse(this.origin.x, this.origin.y,5,5);
    ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
  }
}
