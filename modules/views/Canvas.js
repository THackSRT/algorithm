import DOM from "./DOM.js";


export default class Canvas {

    constructor(id, height, width, cellWidth, cellHeight, backgroundColor) {
        this.canvas = DOM.create('canvas', 'canvas');
        this.canvas.id = id;

        this.canvas.width = width;
        this.canvas.height = height;

        this.ctx = this.canvas.getContext('2d');

        this.cellWidth = cellWidth;
        this.cellHeight = cellHeight;
        this.width = width;
        this.height = height;

        this.backgroundColor = backgroundColor;

        this.init();
    }

    static getCanvas(id) {
        return DOM.get(id);
    }

    init() {
        this.ctx.font = "12px Arial";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";

        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    drawGrid() {
        // set stroke width
        this.ctx.lineWidth = 0.5;
        for (let x = 0; x <= this.width; x += this.cellWidth) {
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.height);
        }

        for (let y = 0; y <= this.height; y += this.cellHeight) {
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.width, y);
        }

        this.ctx.strokeStyle = "#ddd";
        this.ctx.stroke();
    }

    resize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;

        this.ctx = this.canvas.getContext('2d');
        this.width = width;
        this.height = height;

        this.init();
    }

    setCellSize(cellWidth, cellHeight) {
        this.cellWidth = cellWidth;
        this.cellHeight = cellHeight;
    }

    drawCell(x, y, color) {
        this.drawRect(x * this.cellWidth, y * this.cellHeight, color);
    }

    drawValue(x, y, value, margin = 0) {
        // draw circular stroke
        this.drawCircularStroke(x * this.cellWidth + this.cellWidth / 2, y * this.cellHeight  + this.cellHeight * ( margin + 1 / 2), this.cellWidth / 4, "#fff");
        this.drawText(value, x * this.cellWidth + this.cellWidth / 2, y * this.cellHeight + this.cellHeight * ( margin + 1 / 2), "#fff");
    }

    drawWeight(x, y, value, margin = 0) {
        // draw circular stroke
        this.drawText(value, x * this.cellWidth + this.cellWidth / 2, y * this.cellHeight + this.cellHeight * ( margin + 1 / 2), "#fff");
    }

    drawMatrix(matrix, x, y, colorCallback) {
        for (let i = 0; i < matrix.length; i++) {
            const row = matrix[i];
            for (let j = 0; j < row.length; j++) {
                const cell = row[j];
                if (cell === 1) {
                    this.drawRect(x + j * this.cellWidth, y + i * this.cellHeight, colorCallback(i, j));
                }
            }
        }
    }

    drawRect(x, y, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, this.cellWidth, this.cellHeight);
    }

    drawLongRect(x, y, width, height, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);
    }

    clearRect(x, y) {
        this.ctx.clearRect(x, y, this.cellWidth, this.cellHeight);
    }

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    drawText(text, x, y, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillText(text, x, y);
    }

    drawImage(image, x, y) {
        this.ctx.drawImage(image, x, y);
    }

    drawLine(x1, y1, x2, y2, color) {
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.strokeStyle = color;
        this.ctx.stroke();
    }

    drawRegularLine(x1, y1, x2, y2, color) {
        this.ctx.beginPath();
        this.ctx.moveTo(x2 * this.cellWidth + this.cellWidth * 1 / 4, y2 * this.cellHeight + this.cellHeight / 2);
        this.ctx.lineTo(x1 * this.cellWidth + this.cellWidth * 3 / 4, y1 * this.cellHeight + this.cellHeight / 2 );
        this.ctx.strokeStyle = color;
        this.ctx.stroke();
    }

    drawHighlights(x, y, color) {
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x + this.cellWidth, y);
        this.ctx.lineTo(x + this.cellWidth, y + this.cellHeight);
        this.ctx.lineTo(x, y + this.cellHeight);
        this.ctx.lineTo(x, y);
        this.ctx.strokeStyle = color;
        this.ctx.stroke();
    }

    drawCartesian(x, y, color) {
        this.ctx.beginPath();
        this.ctx.moveTo(x + this.width / 2, 0);
        this.ctx.lineTo(x + this.width / 2, this.height);
        this.ctx.moveTo(0, y + this.height / 2);
        this.ctx.lineTo(this.width, y + this.height / 2);
        this.ctx.strokeStyle = color;
        this.ctx.stroke();
    }

    drawCartesianLine(x1, y1, x2, y2, color) {  
        this.ctx.beginPath();
        this.ctx.moveTo(x1 + this.width / 2, -y1 + this.height / 2);
        this.ctx.lineTo(x2 + this.width / 2, -y2 + this.height / 2);
        this.ctx.strokeStyle = color;
        this.ctx.stroke();
    }

    

    drawCircle(x, y, radius, color) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
        this.ctx.fillStyle = color;
        this.ctx.fill();
    }

    drawCircularStroke(x, y, radius, color) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
        this.ctx.strokeStyle = color;
        this.ctx.stroke();
    }

    drawTriangle(x1, y1, x2, y2, x3, y3, color) {
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.lineTo(x3, y3);

        this.ctx.fillStyle = color;
        this.ctx.fill();
    }

    drawPolygon(points, color) {
        this.ctx.beginPath();
        this.ctx.moveTo(points[0].x, points[0].y);

        for (let i = 1; i < points.length; i++) {
            this.ctx.lineTo(points[i].x, points[i].y);
        }

        this.ctx.closePath();
        this.ctx.fillStyle = color;
        this.ctx.fill();
    }

    onDrag(event, callback) {
        this.canvas.addEventListener(event, callback);
    }

    offDrag(event, callback) {
        this.canvas.removeEventListener(event, callback);
    }

    getMousePos(event) {
        return DOM.getMousePos(this.canvas, event);
    }

    getMouseGridPos(event) {
        const pos = this.getMousePos(event);
        return {
            x: Math.floor(pos.x / this.cellWidth),
            y: Math.floor(pos.y / this.cellHeight)
        };
    }

    onClick(event, callback) {
        this.canvas.addEventListener(event, callback);
    }

    render() {
        return this.canvas;
    }

}
