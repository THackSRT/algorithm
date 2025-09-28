

export default class Line {

    constructor(a, b, color) {
        this.a = a;
        this.b = b;
        this.color = color;
    }

    static create(a, b, color) {
        return new Line(a, b, color);
    }

    f(x) {
        return this.a * x + this.b;
    }

    getY(x) {
        return this.f(x);
    }

    getX(y) {
        return (y - this.b) / this.a;
    }

    getPoint(x) {
        return {
            x: x,
            y: this.getY(x)
        };
    }

    getPointY(y) {
        return {
            x: this.getX(y),
            y: y
        };
    }

    getPoints(x) {
        return [this.getPoint(x), this.getPointY(x)];
    }

    getPointsY(y) {
        return [this.getPoint(this.getX(y)), this.getPointY(y)];
    }

    draw(canvas) {
        // canvas.drawLine(this.a, this.b, canvas.backgroundColor);
        let x1 = - canvas.width / 2;
        let y1 = this.getY(x1);
        let x2 = canvas.width / 2;
        let y2 = this.getY(x2);
        canvas.drawCartesianLine(x1, y1, x2, y2, this.color);
    }

}