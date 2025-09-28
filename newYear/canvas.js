
export default class Canvas {

    constructor(id, width, height, cellSize, perspective = 0) {
        this.id = id;
        this.width = width;
        this.height = height;
        this.cellSize = cellSize;
        this.perspective = perspective;

        this.centered = false;
        this.bg = null;

        this.canvas = this.createCanvas();
    }

    createCanvas() {
        const canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        return canvas;
    }   

    init2d () {
        this.ctx = this.canvas.getContext('2d');
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.width, this.height);

        if (this.bg)
            this.setBackgroundImage(this.bg);
    }

    initCenteringRepere () {
        this.centered = true;
        this.ctx.translate(this.width / 2, this.height / 2);
        this.ctx.scale(1, -1);
    }

    init3d () {
        this.ctx = this.canvas.getContext('webgl');
        this.ctx.clearColor(0.0, 0.0, 0.0, 1.0);
        this.ctx.clear(this.ctx.COLOR_BUFFER_BIT);
    }

    setBackgroundImage (image) {
        if (this.centered) {
            this.ctx.scale(1, -1);
            this.ctx.translate(-this.width / 2, -this.height / 2);
        }
        
        this.bg = image;
        this.ctx.drawImage(this.bg, 0, 0, image.width, image.height, 0, 0, this.width, this.height);
        
        if (this.centered)
            this.initCenteringRepere();
    }

    resize (width, height) {
        this.width = width;
        this.height = height;
        this.canvas.width = width;
        this.canvas.height = height;
    }

    render(element) {
        element.appendChild(this.canvas);
    }

    clear () {
        if (this.centered) {
            this.ctx.translate(-this.width / 2, -this.height / 2);
            this.ctx.scale(-1, 1);
        }
        this.ctx.clearRect(0, 0, this.width, this.height);

        if (this.centered) {
            this.ctx.translate(this.width / 2, this.height / 2);
            this.ctx.scale(1, -1);
        }
    }

    translate (x, y, z) {
        this.ctx.translate(x, y);
    }

    rotate (angle) {
        this.ctx.rotate(angle);
    }

    drawPoint (x, y, size, color) {
        this.drawCircle(x, y, size, color);
    }


    draw3dLine (x1, y1, z1, x2, y2, z2, witdh = 0.25, color) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = witdh;
        this.ctx.moveTo(x1 , y1 );
        this.ctx.lineTo(x2 , y2 );
        this.ctx.stroke();
    }

    drawLine (x1, y1, x2, y2, witdh = 0.25, color) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = witdh;
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
    }

    drawRepere () {
        this.drawLine(-this.width / 2, 0, this.width / 2, 0, 0.25, 'white');
        this.drawLine(0, -this.height / 2, 0, this.height / 2, 0.25, 'white');

    }

    draw3DRepere () {
        this.drawLine(-this.width / 2, 0, this.width / 2, 0, 0.25, 'white');
        this.drawLine(0, -this.height / 2, 0, this.height / 2, 0.25, 'white');
        this.drawLine(0, 0, 0, 0, 0.25, 'white');
    }

    drawCircle (x, y, radius, color) {
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
        this.ctx.fill();
    }

    drawCircleWith2Points (x1, y1, x2, y2, color) {
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.arc(x1, y1, Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)), 0, 2 * Math.PI);
        this.ctx.fill();
    }

    drawEmptyCircleWith2Points (x1, y1, x2, y2, color) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = color;
        this.ctx.ellipse(x1, y1, Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)), Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)), 0, 0, 2 * Math.PI);
        this.ctx.stroke();
    }

    drawEmptyCircle (x, y, radius, color) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = color;
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
        this.ctx.stroke();
    }

    drawEmptyElipse (x, y, xRadius, yRadius, color) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = color;
        this.ctx.ellipse(x, y, xRadius, yRadius, 0, 0, 2 * Math.PI);
        this.ctx.stroke();
    }
    

    drawRect (x, y, width, height, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);
    }

    drawEmptyRect (x, y, width, height, color) {
        this.ctx.strokeStyle = color;
        this.ctx.strokeRect(x, y, width, height);
    }

    drawText (text, x, y, color, font) {
        this.ctx.fillStyle = color;
        this.ctx.font = font;
        this.ctx.fillText(text, x, y);
    }

    

}