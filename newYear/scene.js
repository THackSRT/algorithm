
import Canvas from './canvas.js';

export default class Scene {

    static GRAVITY = 0.1;
    static FRICTION = 0.9;
    static BOUNCE = 0.9;
    static FOV_ANGLE = 120;

    constructor() {
        this.WIDTH = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        this.HEIGHT = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        this.MAX_Z = 1000

        this.objects = [];
        this.canvas = new Canvas('canvas', this.WIDTH, this.HEIGHT, 40);
        this.resetCanvas();
        this.init();
    }

    clearCanvas () {
        this.canvas.clear();
    }

    resetCanvas () {
        this.canvas.resize(this.WIDTH, this.HEIGHT);
        this.canvas.init2d();
        this.canvas.initCenteringRepere();
    }

    init() {
        window.addEventListener('resize', () => {
            this.WIDTH = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            this.HEIGHT = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            this.resetCanvas();
        }, false);
    }

    getCanvas() {
        return this.canvas;
    }

    addObject (object) {
        this.objects.push(object);
    }

    addCamera (camera) {
        this.camera = camera;
        this.camera.init(this.canvas)
    }

    draw () {
        // this.clearCanvas();
        this.objects.forEach(object => {
            object.draw(this.canvas);
        });
    }

    render (element) {
        this.canvas.render(element);
    }

    // STATIC FUNCTIONS

    static transform3D (xy, z) {
        const FOV_RAD = (Scene.FOV_ANGLE * Math.PI) / 180 ;
        return xy / (z * Math.tan(FOV_RAD / 2));
    }
}