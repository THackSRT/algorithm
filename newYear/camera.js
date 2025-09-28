


export default class Camera {
    
    constructor (color = 'white') {
        this.color = color;
        this.x = 0;
        this.y = 0;
        this.z = 0;

        this.size = 10;
    }

    init (canvas) {
        this.canvas = canvas;
    }

    setSize (size) {
        this.size = size;
    }

    moveX (dx) {
        this.x += dx;
        this.canvas.translate(this.x, 0);
    }

    moveY (dy) {
        this.y += dy;
        this.canvas.translate(0, this.y);
    }

    moveZ (dz) {
        this.z += dz;
        this.canvas.translate(0, 0, this.z);
    }

    rotateX (angle) {
        this.canvas.rotate(angle);
    }

}