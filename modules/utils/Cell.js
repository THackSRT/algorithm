

export default class Cell {

    constructor(row, col, width, height) {
        this.row = row;
        this.col = col;

        this.width = width;
        this.height = height;
    }

    draw(canvas, type, color) {
        if (type === 'circle') {
            canvas.drawCircle(
                this.col * this.height + this.height / 2, 
                this.row * this.width + this.width / 2,
                this.width / 4, 
                color ? color : (this.color ? this.color : "#c3c3c3")
            );
            return;
        }
        canvas.drawCell(this.row, this.col, (this.color ? this.color : "#c3c3c3"));
    }

    undraw(canvas) {
        canvas.drawCell(this.row, this.col, canvas.backgroundColor);
    }

    resize(width, height) {
        this.width = width;
        this.height = height;
    }

    static getCell (cells, row, col) {
        return cells.filter(cell => cell.getRow() === row && cell.getCol() === col)[0];
    }

    getRow() {
        return this.row;
    }

    getCol() {
        return this.col;
    }

    getX(width) {
        if (width) {
            return this.col * this.width - width / 2 + this.width / 2;
        }

        return this.col;
    }

    getY(height) {
        if (height) {
            return -(this.row * this.height - height / 2 + this.height / 2);
        }
        return this.row;
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    setColor (color) {
        this.color = color;
    }

    setValue (value) {
        this.value = value;
    }
}