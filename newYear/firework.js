import Point from "./point.js";


export default class Firework {

    constructor(x, y, z, radius, color) {
        this.firework = new Point(x, y, z, 0, color, radius);
        this.color = color;
    }



    update () {
        this.firework.update();
    }

    setRadius (radius) { this.firework.setRadius(radius); }
    setVelocity (velocity) { this.firework.setVelocity(velocity); }
    get radius () { return this.firework.radius; }


    draw (canvas) {
        this.firework.draw(canvas);
    }
}