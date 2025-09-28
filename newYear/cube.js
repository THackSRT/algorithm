import Point from "./point.js";

export default class Cube {

    constructor (x, y, z, size, color) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.size = size;
        this.color = color;

        this.rX = 0;
        this.rY = 0;
        this.rZ = 0;

        this.points = [];
        this.faces = [];
        this.edges = [];
        this.center = new Point(this.x, this.y, this.z, this.color);
    }

    createSquarePoint (point, size, color) {
        return [
            new Point(point.x - (size), point.y - (size), point.z - (size), color),
            new Point(point.x + (size), point.y - (size), point.z - (size), color),
            new Point(point.x + (size), point.y + (size), point.z - (size), color),
            new Point(point.x - (size), point.y + (size), point.z - (size), color),
        ];
    }

    init () {
        this.points = [
            ...this.createSquarePoint(this.center, this.size, 1, this.color),
            ...this.createSquarePoint(this.center, -this.size, 1, this.color),
        ];

        this.faces = [
            [this.points[0], this.points[1], this.points[2], this.points[3]],
            [this.points[0], this.points[1], this.points[7], this.points[6]],
            [this.points[0], this.points[6], this.points[5], this.points[3]],
            [this.points[4], this.points[2], this.points[3], this.points[5]],
            [this.points[4], this.points[2], this.points[1], this.points[7]],
            [this.points[4], this.points[5], this.points[6], this.points[7]],
        ];

        this.edges = [
            [this.points[0], this.points[1]], [this.points[1], this.points[2]], [this.points[2], this.points[3]], [this.points[3], this.points[0]],
            [this.points[4], this.points[5]], [this.points[5], this.points[6]], [this.points[6], this.points[7]], [this.points[7], this.points[4]],
            [this.points[0], this.points[6]], [this.points[1], this.points[7]], [this.points[2], this.points[4]], [this.points[3], this.points[5]],
        ];
        this.opposite = [
            [0, 4], [1, 5], [2, 6], [3, 7],
        ]
        this.rotate(this.rX, this.rY, this.rZ);
    }

    reDraw () {

    }

    rotateX(angle) {
        this.points.forEach(point => point.rotateX(angle));
        this.rX += angle;
        if (this.rX >= 1) this.rX = 0;
    }

    rotateY(angle) {
        this.points.forEach(point => point.rotateY(angle));
        this.rY += angle;
        if (this.rY >= 1) this.rY = 0;
    }

    rotateZ(angle) {
        this.points.forEach(point => point.rotateZ(angle));
        this.rZ += angle;
        if (this.rZ >= 1) this.rZ = 0;
    }

    rotate(ax, ay, az) {
        this.rotateX(ax);
        this.rotateY(ay);
        this.rotateZ(az);
    }

    rotate3D(ax, ay, az) {
        this.points.forEach(point => point.setPosition(point.rotate3D(point.position, ax, ay, az)));
    }

    moveTo (dxyz, dx = 1, dy = 1, dz = 1) {
        this.x = dxyz * dx;
        this.y = dxyz * dy;
        this.z = dxyz * dz;
        this.center.moveTo(dxyz, dx, dy, dz);
        this.points.forEach(point => point.moveTo(dxyz * dx, dxyz * dy, dxyz * dz));
    }

    map (callback, params) {
        this.points.forEach(point => point.setPosition(callback(point.position, ...params)));
    }


    goTo ({x, y, z}) {
        this.x = x;
        this.y = y;
        this.z = z;
        let center = new Point(this.x, this.y, this.z, 'red');
        
        let xdiff = this.center.x - center.x
        let ydiff = this.center.y - center.y
        let zdiff = this.center.z - center.z

        this.center = center;
        this.points.forEach(point => point.moveTo(-xdiff, -ydiff, -zdiff));
    }

    draw (canvas) {
        this.center.draw(canvas);
        
        this.points.forEach(point => point.draw(canvas));

        this.edges.forEach(edge => {
            canvas.drawLine(edge[0].x, edge[0].y, edge[1].x, edge[1].y, 0.25, 'white');
        });

        this.opposite.forEach(opposite => {
            canvas.drawLine(this.points[opposite[0]].x, this.points[opposite[0]].y, this.points[opposite[1]].x, this.points[opposite[1]].y, 0.25, 'white');
        });
    }


    drawFace(n, canvas) {
        this.faces[n].forEach((point, index) => {
            if (index === this.faces[n].length - 1) 
                index = -1;
            let nextPoint = this.faces[n][index + 1];
            canvas.draw3dLine(point.x, point.y, point.z, nextPoint.x, nextPoint.y, nextPoint.z, 0.25, 'white');
        });
    }
}