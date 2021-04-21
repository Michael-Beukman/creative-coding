  //Making Mathematical Art
  //Polar Grapher
  //Original Desmos sketch:
  //code adopted from Dan Anderson



  //virtual window settings
  var xmin = -5;
  var xmax = 5;
  var ymin = -5;
  var ymax = 5;
  var s;
  let tmp = 0;
  function setup() {
    //This sets the window to 800 by 800 pixels
    const x = createCanvas(1600, 1600)
    x.parent( document.getElementById("canvasDiv"))
    // x.parent((document.getElementsByTagName("canvas")[0]))
    colorMode(HSB,100);
    //For PDF output, comment out the above line, uncomment out the following line, 
    //and uncomment out the last line in draw
    //size(800,800,PDF,"Polar Grapher output.pdf");
  }

  function draw() {
    background(0);
    //this loop goes through and creates the 21 different graphs as shown in the original sketch
    //for (var d = 1; d < 3; d += 0.1){
        // print(frameRate())
    s = map(mouseY, 0, height, 0, 200);
    s=tmp;
      for (var T=0; T < (PI/2 - PI/56); T += PI/s){
      beginShape();
      noFill();
      const xxxx = map(T,0,(PI/2 - PI/56),50,100)
    //   console.log(xxxx);
      stroke(xxxx,100,100);

      //this loop samples 1000 points for theta, and then converts it
      //to rectangular using x = r*cos(theta) and y = r*sin(theta)
        // var num = floor(map(mouseX, 0, width, 0,15))
        // var num = floor(map(mouseX, 0, width, 0,15))
        var num=tmp;
        tmp +=0.1;
        if (tmp > 200) tmp-=200;
        num=4;
        for (var theta = 0; theta < TWO_PI; theta += TWO_PI/1000){
        var r,xp,yp;
        // print(num)
        // r = 2.5*T + cos(num*(theta-T));
        // let num=2;
        r = 2.5*T + cos(num*(theta-T));
        xp = r*cos(theta);
        yp = r*sin(theta);

        //x and y are the locations for the virtual pixels to the actual Processing window
        var x, y;
        x = map(xp, xmin, xmax, 0, width);
        y = map(yp, ymin, ymax, height, 0);

        //only graph the point if it's insid ethe window
        if (x > 0 && x < width && y > 0 && y < height) {
            // print(x,y)
          vertex(x, y);
        } else {
          endShape();
          beginShape();
        }
      }
      endShape();
        // break;
    }
    //exit();
  }