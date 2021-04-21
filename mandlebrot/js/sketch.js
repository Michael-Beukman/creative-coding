var cDiv = document.getElementById('canvasDiv');
var h = cDiv.offsetHeight;
var w = cDiv.offsetWidth;


function setup() {
    let canvas = createCanvas(w, h);
    canvas.parent(cDiv);
    pixelDensity(1);
}

function draw() {
    let numIters=256;
    // return;
    background(0);
    const AA=0.1;
    let topLeft=-2;
    let bottomRight=2;
    loadPixels();
    colorMode(HSB)
    // loadP
    const numPixels = pixels.length / 4;
    console.log(numPixels);
    for (let y=0; y<height; ++y){
        for (let x=0; x < width; ++x){
            // now scale
            const xWorld = x/width * (bottomRight-topLeft) + topLeft;
            const yWorld = y/height * (bottomRight-topLeft) + topLeft;
            let a = 0, b= 0;
            let n=0;
            while (n < numIters && a*a + b*b <4){
                const newA = a*a - b*b + xWorld;
                const newB = 2*a*b + yWorld;
                a = newA; b = newB;
                n++;
            }   
            // console.log(n)
            if (n<=numIters){
                const i = (y*width + x)*4;
                // const col = 255; //*(sin(n/numIters*2*PI) + cos(n/numIters*2*PI))
                
                const col = color(n+1 - log(log(sqrt(a*a+b*b))), 255,255)//color(0.5 * sin(a * n) + 0.5, 0.5 * sin(a * n + 2.094) + 0.5,  0.5 * sin(a * n + 4.188) + 0.5);
                pixels[i]= 255*red(col)
                pixels[i+1]=255*green(col)
                pixels[i+2]=255*blue(col)
                // pixels[y*width + x + 3]=0
            }
        }
    }
    updatePixels()

}
