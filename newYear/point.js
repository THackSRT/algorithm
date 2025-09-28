import Scene from "./scene.js";


export default class Point {

    static gravity = 0.01;
    static pAngle = 180;

    constructor(x, y, z, color) {
        this.position = {x, y, z}
        this.color = color;

        this.velocity = {x: 0, y: 0, z: 0};
        this.acceleration = {x: 0, y: 0, z: 0};

        this.radius = 1;
    }

    randomPosition() {
        this.position.x = Math.random() * 1000 - 500;
        this.position.y = Math.random() * 1000 - 500;
        this.position.z = Math.random() * 1000 - 500;
    }

    randomVelocity() {
        this.setVelocity({
            x: (Math.random() - 0.5) * 4,
            y: (Math.random() - 0.5) * 4,
            z: (Math.random() - 0.5) * 4
        });
    }

    randomAcceleration() {
        this.acceleration = {
            x: (Math.random() - 0.5) * 0.01,
            y: (Math.random() - 0.5) * 0.01,
            z: (Math.random() - 0.5) * 0.01
        };
    }

    map (callback, params) {
        this.position =  callback(this.position, ...params);
    }

    rotateX (angle) {
        this.position.y = Point.getRotation(this.position.y, this.position.z, angle).a;
        this.position.z = Point.getRotation(this.position.y, this.position.z, angle).b;
    }

    rotateY (angle) {
        this.position.z = Point.getRotation(this.position.z, this.position.x, angle).a;
        this.position.x = Point.getRotation(this.position.z, this.position.x, angle).b;
    }

    rotateZ (angle) {
        this.position.x = Point.getRotation(this.position.x, this.position.y, angle).a;
        this.position.y = Point.getRotation(this.position.x, this.position.y, angle).b
    }

    static getRotation (ia, ib, angle) {
        const radian = angle * Math.PI / 180;
        const cos = Math.cos(radian);
        const sin = Math.sin(radian);

        const a = ia * cos - ib * sin;
        const b = ia * sin + ib * cos;

        return {a, b};
    }

    rotate(ax, ay, az) {
        this.rotateX(ax);
        this.rotateY(ay);
        this.rotateZ(az);
    }


    moveTo (dx, dy, dz) {
        this.position.x += dx;
        this.position.y += dy;
        this.position.z += dz;
    }

    get x () { return this.position.x; }
    get y () { return this.position.y; }
    get z () { return this.position.z; }

    get xp () { return Scene.transform3D(this.position.x, this.position.z);}
    get yp () { return Scene.transform3D(this.position.y, this.position.z);}

    setRadius(radius) { this.radius = radius; }
    setGravity(g) { Point.gravity = g; }
    setVelocity(v) { this.velocity = v; }
    setPosition(p) { this.position = p; }
    setAcceleration(a) { this.acceleration = a; }

    update () {
        this.velocity.x += this.acceleration.x;
        this.velocity.y += this.acceleration.y;
        this.velocity.z += this.acceleration.z;

        this.position.x += this.velocity.x;
        this.position.z += this.velocity.z;

        if (this.position.y >= 0) {
            this.position.y += this.velocity.y;
        }

        this.velocity.y -= Point.gravity;
    }

    draw (canvas) {
        // canvas.drawCircle(this.position.x, this.position.y, this.radius, this.color);
        canvas.drawCircle(this.xp, this.yp, this.radius, this.color);
    }
}