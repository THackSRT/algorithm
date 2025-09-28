import Point from './point.js';


export default class Line {

    constructor(start, end, color) {
        this.start = new Point(start.x, start.y, start.z, 0, color);
        this.end = new Point(end.x, end.y, end.z, 0, color);
        this.points = [this.start, this.end];
        this.color = color;

        this.a = null;
        this.b = null;
    }

    init () {
        // y = ax + b
        this.a = (this.end.position.y - this.start.position.y) / (this.end.position.x - this.start.position.x);
        this.b = this.start.position.y - this.a * this.start.position.x;
    }

    
    getY (x) {
        return this.a * x + this.b;
    }

    getX (y) {
        return (y - this.b) / this.a;
    }

    update () {
        this.start.update();
        this.end.update();
    }

    setPoint(p, position) {
        this.points[p].position = position;
    }

    draw (canvas) {
        this.start.draw(canvas);
        this.end.draw(canvas);
        canvas.drawLine(this.start.position.x, this.start.position.y, this.end.position.x, this.end.position.y, 0.25, this.color);
    }
}