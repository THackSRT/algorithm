import Point from "./point.js";


export default class Sphere {

    constructor (x, y, z, radius, perspective = 0, color) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.radius = radius;
        this.perspective = perspective;
        this.color = color;

        this.points = [];
        this.numberOfPoints = 0;
        this.center = new Point(this.x, this.y, this.z,  this.perspective, this.color);
    }

    createPoint () {
        for (let alpha = 0; alpha <= 6.28; alpha += 0.17) {
            this.points[this.numberOfPoints++] = new Point(
                Math.cos(alpha) * this.radius,
                0,
                Math.sin(alpha) * this.radius,
                this.perspective,
                this.color
            );
        }

        for(let direction = 1; direction >= -1; direction -= 2) {
            for(let beta = 0.17; beta < 1.445; beta += 0.17) {
                
              let radius = Math.cos(beta) * this.radius;
              let fixedY = Math.sin(beta) * this.radius * direction;
              
              for(let alpha = 0; alpha < 6.28; alpha += 0.17) {
                this.points[this.numberOfPoints  ++] = new Point(
                    Math.cos(alpha) * radius,
                    fixedY,
                    Math.sin(alpha) * radius,
                    this.perspective,
                    this.color
                );
              }
            }
          }
    }

    init () {
        this.createPoint();
    }

    rotateX (angle) {
        this.points.forEach(point => {
            point.rotateX(angle);
        });
    }

    rotateY (angle) {
        this.points.forEach(point => {
            point.rotateY(angle);
        });
    }

    rotateZ (angle) {
        this.points.forEach(point => {
            point.rotateZ(angle);
        });
    }

    rotate (ax, ay, az) {
        this.rotateX(ax);
        this.rotateY(ay);
        this.rotateZ(az);
    }

    goTo (x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        let center = new Point(this.x, this.y, this.z,  this.perspective, this.color);
        
        let xdiff = this.center.x - center.x
        let ydiff = this.center.y - center.y
        let zdiff = this.center.z - center.z

        this.center = center;
        this.points.forEach(point => point.moveTo(-xdiff, -ydiff, -zdiff));
    }


    draw (canvas) {
        this.points.forEach(point => {
            point.draw(canvas);
        });
    }
}
