import Canvas from "./newYear/canvas.js";
import Cube from "./newYear/cube.js";
import Cursor from "./newYear/cursor.js";
import Sphere from "./newYear/sphere.js";
import Firework from "./newYear/firework.js";
import Line from "./newYear/line.js";


// constant
let WiDTH = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
let HEIGHT = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
const main = document.getElementById('main');


const canvas = new Canvas('canvas', WiDTH, HEIGHT, 40);
const cursor = new Cursor(canvas, 'white');
const cube = new Cube(0, 0, 0, 200, 10, 'white');
const sphere = new Sphere(0, 0, 0, cube.size, 10, 'red');
const firework = new Firework(0, 0, 0, 10, 'red');



const line1 = new Line({
    x: 0, 
    y: 0, 
    z: 0
}, {
    x: - WiDTH / 2, 
    y: - HEIGHT / 3,
    z: 0, 
}, 'white');

const line2 = new Line({
    x: 0, 
    y: 0, 
    z: 0
}, {
    x: WiDTH / 2, 
    y: - HEIGHT / 3,
    z: 0, 
}, 'white');

const line3 = new Line({
    x: 0, 
    y: 0,
    z: 0, 
}, {
    x: 0, 
    y: HEIGHT / 2, 
    z: 0
}, 'white');


function init () {
    canvas.render(main);

    canvas.init2d();
    canvas.initCenteringRepere();
    // canvas.drawRepere();

    window.addEventListener('resize', () => {
        WiDTH = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        HEIGHT = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        canvas.resize(WiDTH, HEIGHT);
        canvas.init2d();
        canvas.initCenteringRepere();
        // canvas.drawRepere();
    }, false);

    cube.init();
    sphere.init();
    line1.init();
    line2.init();
    line3.init();
}


function reset () {
    canvas.clear();
}


function update () {
    // cursor.draw();
    line1.draw(canvas);
    line2.draw(canvas);
    line3.draw(canvas);

    canvas.drawLine(cursor.x, cursor.y, line1.getX(cursor.y + 100), cursor.y + 100, 0.25, 'white');
}


function startAnimation () {
    firework.setRadius(4);  
    requestAnimationFrame(function animate() {
        
        reset();
        update();

        requestAnimationFrame(animate);
    });
}

init();
startAnimation();


