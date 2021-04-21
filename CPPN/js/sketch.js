var cDiv = document.getElementById('canvasDiv');
var h = cDiv.offsetHeight;
var w = cDiv.offsetWidth;
net = new Net(w-1, h-1);

function setup() {
    let canvas = createCanvas(w, h);
    canvas.parent(cDiv);

}

function draw() {
    doPixels();
}


function doPixels() {
    let pink = color(255, 102, 204);
    loadPixels();
    let d = pixelDensity();
    let halfImage = 4 * (width * d) * (height * d);
    let mx = -1, my = -1;
    // const s = sin(millis()) * 127.5 + 127.5;
    for (let i = 0; i < halfImage; i += 4) {
        const ree = floor(i / d / d/ 4);
        const x = ree  % w
        const y = floor(ree / w);
        mx = max(mx, x); my = max(my, y)
        const [a, b, c] = net.getVal(x, y);
        pixels[i] = a;
        pixels[i + 1] = b;
        pixels[i + 2] = c;
        pixels[i + 3] = 255;
    }
    print(halfImage / d /d/ 4, w, h, w * h, d, {mx, my});
    updatePixels();
}