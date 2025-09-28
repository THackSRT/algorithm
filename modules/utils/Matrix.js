import Table from "../views/Table.js";
import ASCCI from "./ASCCI.js";


export default class Matrix {

    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;

        this.data = this.createMatrix();

    }

    createMatrix() {
        return Array(this.rows).fill().map(() => Array(this.cols).fill(0));
    }

    getMatrix() {
        return this.data;
    }

    getRows() {
        return this.rows;
    }

    getCols() {
        return this.cols;
    }

    getType() {
        return this.type;
    }

    setMatrix(matrix) {
        this.data = matrix;
    }

    draw(canvas) {

        colsorCallback = (i, j) => {
            return this.colsorPalette[this.type][this.data[i][j]];
        }

        for (let i = 0; i < this.rows; i++) {
            const rows = this.data[i];
            for (let j = 0; j < rows.length; j++) {
                const cell = rows[j];
                if (cell === 1) {
                    canvas.drawRect(x + j * this.cellWidth, y + i * this.cellHeight, colsorCallback(i, j));
                }
            }
        }
    }

    undraw(canvas) {
        for (let i = 0; i < this.rows; i++) {
            const rows = this.data[i];
            for (let j = 0; j < rows.length; j++) {
                const cell = rows[j];
                if (cell === 1) {
                    canvas.clearRect(x + j * this.cellWidth, y + i * this.cellHeight);
                }
            }
        }
    }

    drawTable (id, size = 20) {

        let rows = []
        for (let i = 0; i < this.rows; i++)
            rows.push(i+1);
        
        const table = new Table(
            id, 
            this.rows, 
            this.cols, 
            size, 
            this.data, 
            ASCCI.getNotations(this.cols),
            rows,
        );
        return table.render();
    }

    resize(rows, cols) {
        this.rows = rows;
        this.cols = cols;

        this.data = this.createMatrix();
    }

    setCell(row, col, value) {
        this.data[row][col] = value;
    }

    getCell(row, col) {
        if (this.cols <= col || this.rows <= row) return null;
        return this.data[row][col];
    }

    clearMatrix() {
        this.data = this.createMatrix();
    }

    fillMatrix(value) {
        this.data = this.data.map(row => row.map(col => value));
    }

    fillRow(row, value) {
        this.data[row] = this.data[row].map(col => value);
    }

    fillCols(col, value) {
        this.data = this.data.map(row => row[col] = value);
    }

    applyFunc(func) {
        this.data = this.data.map(row => row.map((val, col) => func(val, row, col)));
    }

    randomize(a=-1, b=1) {
        this.data = this.data.map(row => row.map(col => Math.random() * (b - a) + a));
    }

    static addition(a, b) {
        if (a.rows !== b.rows || a.cols !== b.cols) {
            throw new Error('Cannot add matrices of different dimensions');
        }

        let result = new Matrix(a.rows, a.cols);

        for (let i = 0; i < a.rows; i++) {
            for (let j = 0; j < a.cols; j++) {
                result.setCell(i, j, a.getCell(i, j) + b.getCell(i, j));
            }
        }

        return result;
    }

    static subtract(a, b) {
        if (a.rows !== b.rows || a.cols !== b.cols) {
            throw new Error('Cannot subtract matrices of different dimensions');
        }

        let result = new Matrix(a.rows, a.cols);

        for (let i = 0; i < a.rows; i++) {
            for (let j = 0; j < a.cols; j++) {
                result.setCell(i, j, a.getCell(i, j) - b.getCell(i, j));
            }
        }

        return result;
    }

    static multiply(a, b) {
        if (a.cols !== b.rows) {
            throw new Error('Cannot multiply matrices of incompatible dimensions');
        }

        let result = new Matrix(a.rows, b.cols);
        for (let i = 0; i < result.rows; i++) {
            for (let j = 0; j < result.cols; j++) {
                let sum = 0;
                for (let k = 0; k < a.cols; k++) {
                    sum += a.getCell(i, k) * b.getCell(k, j);
                }
                result.setCell(i, j, sum);
            }
        }

        return result;
    }

    static divide(a, b) {
        if (a.rows !== b.rows || a.cols !== b.cols) {
            throw new Error('Cannot divide matrices of different dimensions');
        }

        let result = new Matrix(a.rows, a.cols);

        for (let i = 0; i < a.rows; i++) {
            for (let j = 0; j < a.cols; j++) {
                result.setCell(i, j, a.getCell(i, j) / b.getCell(i, j));
            }
        }

        return result;
    }

    static transpose(a) {
        let result = new Matrix(a.cols, a.rows);

        for (let i = 0; i < a.rows; i++) {
            for (let j = 0; j < a.cols; j++) {
                result.setCell(j, i, a.getCell(i, j));
            }
        }

        return result;
    }

    static map(a, func) {
        let result = new Matrix(a.rows, a.cols);

        for (let i = 0; i < a.rows; i++) {
            for (let j = 0; j < a.cols; j++) {
                result.setCell(i, j, func(a.getCell(i, j), i, j));
            }
        }

        return result;
    }

    static dot(a, b) {
        if (a.rows !== b.rows || a.cols !== b.cols) {
            throw new Error('Cannot dot matrices of different dimensions');
        }

        let result = new Matrix(a.rows, a.cols);

        for (let i = 0; i < a.rows; i++) {
            for (let j = 0; j < a.cols; j++) {
                result.setCell(i, j, a.getCell(i, j) * b.getCell(i, j));
            }
        }

        return result;
    }

    static randomizeMatrix (m, a = -1, b = 1) {
        return Matrix.map(m, () => Math.random() * (b - a) + a);
    }

    static scale (a, scale = 1) {
        return Matrix.map(a, (value) => value * scale);
    }

    static add(a, n) {
        return Matrix.map(a, (value) => value + n);
    }

    static fromArray (array) {
        let res = new Matrix(array.length, 1)
            res.applyFunc((e, i) => array[i]);
        return res;
    }

    static toArray (m) {
        let arr = [];
        for (let i = 0; i < m.rows; i++) {
            for (let j = 0; j < m.cols; j++) {
                arr.push(m.getCell(i, j));
            }
        }
        return arr;
    }

    static serialize (m) {
        return JSON.stringify(m);
    }

    static deserialize (data) {
        if (typeof data == 'string') {
            data = JSON.parse(data);
        }

        let m = new Matrix(data.rows, data.cols);
            m.data = data.data;
        return m;
    }

    copy() {
        let result = new Matrix(this.rows, this.cols);
        result.data = this.data.map(row => row.slice());
        return result;
    }
}