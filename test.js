import Scene from "./newYear/scene.js";
import Cursor from './newYear/cursor.js';
import Cube from "./newYear/cube.js";
import Point from "./newYear/point.js";
import Line from './newYear/line.js';
import Camera from "./newYear/camera.js";

const main = document.getElementById('main');
const scene = new Scene();
scene.render(main);


// const cursor = new Cursor('white');
// const cube = new Cube(0, 0, 0, 200, 10, 'white');
const camera = new Camera('white');


scene.addCamera(camera);
// scene.addObject(cursor);
// scene.addObject(cube);

// cursor.setSize(2);
// cursor.init(scene.getCanvas());
// cube.init();

const p1 = new Point(scene.WIDTH / 2, scene.HEIGHT / 2, 0, 'red');
p1.setRadius(4);
const p2 = new Point(scene.WIDTH / 2, -scene.HEIGHT / 2, 0, 'red');
p2.setRadius(4);
const p3 = new Point(-scene.WIDTH / 2, scene.HEIGHT / 2, 0, 'red');
p3.setRadius(4);
const p4 = new Point(-scene.WIDTH / 2, -scene.HEIGHT / 2, 0, 'red');
p4.setRadius(4);



let z = 20
for(let i = 0; i < z; i+= 0.4) {
    
    let nP1 = new Point(scene.WIDTH, scene.HEIGHT, i, 'red');
    nP1.setRadius(4 * ( 1 - i / z));
    let nP2 = new Point(scene.WIDTH, -scene.HEIGHT, i, 'red');
    nP2.setRadius(4 * ( 1 - i / z));
    let nP3 = new Point(-scene.WIDTH, scene.HEIGHT, i, 'red');
    nP3.setRadius(4 * ( 1 - i / z));
    let nP4 = new Point(-scene.WIDTH, -scene.HEIGHT, i, 'red');
    nP4.setRadius(4 * ( 1 - i / z));

    scene.addObject(nP1);
    scene.addObject(nP2);
    scene.addObject(nP3);
    scene.addObject(nP4);
}

function startAnimation () {


    requestAnimationFrame(function animate() {
        scene.clearCanvas();
        // const mouseXratio = (cursor.x / scene.WIDTH) * Math.PI / 1000;
        // const mouseYratio = (cursor.y / scene.HEIGHT) * Math.PI / 1000;

        
        scene.draw();
        // scene.objects.forEach((object, index) => {
        //     if (object.position.z > 0) {
        //         object.moveTo(0, 0, -0.005)
        //         object.setRadius(4 * ( 1 - object.z / z))
        //     } else {
        //         scene.objects.splice(index, 1);
        //     }
        //     // console.log(object.position.z)
        // })

        // scene.camera.moveY(0.5);
        // scene.camera.rotateX(0.01);

        requestAnimationFrame(animate);
    });
}

startAnimation();