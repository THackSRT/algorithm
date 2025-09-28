import Canvas from '../views/Canvas.js';
import Section from '../views/Section.js';
import Cell from '../utils/Cell.js';
import Perceptron from '../utils/Perceptron.js';
import Line from '../utils/Line.js';
import Button from '../views/Button.js';

export default class SimpleClassification {

    constructor() {

        this.cellSize = 30
        this.width = 600;
        this.height = 600;        

        this.isDrawing = false;

        this.cells = [];

        this.canvas = new Canvas('canvas1', this.width, this.height, this.cellSize, this.cellSize, '#000')

        this.canvas.onClick('click', (e) => {
            let mousePos = this.canvas.getMousePos(e);

            let row = Math.floor(mousePos.y / this.cellSize);
            let col = Math.floor(mousePos.x / this.cellSize);

            let cell = Cell.getCell(this.cells, row, col)

            console.log({
                x: mousePos.x,
                y: mousePos.y,
                row: row,
                col: col,
                cellX: cell.getX(this.width),
                cellY: cell.getY(this.height),
            });
        })

        this.eventHandler()
        

        this.section = new Section(
            'section1', 'Perceptron test',
            this.canvas,
            this.playButton,
            this.pauseButton,
            this.reloadButton,
        );
    }

    eventHandler () {
        this.playButton = new Button('play', 'Play', () => {
            this.play();
        });

        this.pauseButton = new Button('pause', 'Pause', () => {
            this.pause();
        });

        this.reloadButton = new Button('reload', 'Reload', () => {
            this.reload();
        });
    }


    onTraining(cell) {
        let inputs = [
            cell.getX(),
            cell.getY(),
            this.bias
        ];  
        let target = cell.value;
        this.perceptron.train(inputs, target);
    }

    onGuessing (count) {
        for(let i = 0; i < count; i++) {
            let cell = this.cells[i];
            let inputs = [
                cell.getX(),
                cell.getY(),
                this.bias
            ];
            let guess = this.perceptron.guess(inputs);
            cell.setColor(guess === 1 ? '#0f0' : '#00f');
        }
    }


    setup() {
        this.fps = 250;
        this.training = 0;
        this.bias = 1;
        this.learningRate = 0.1;
        this.MAX_POINT = 100;

        let a = Math.random() * 10;
        let b = Math.random() * 10 * this.cellSize;
        this.yLine = new Line(a, b, '#f00')

        this.perceptron = new Perceptron(3, this.learningRate);

        for (let i = 0; i < this.MAX_POINT; i++) {

            let randX = Math.floor(Math.random() * this.width / this.cellSize);
            let randY = Math.floor(Math.random() * this.height / this.cellSize);
            
            this.cells[i] = new Cell(
                randX, randY, 
                this.cellSize, this.cellSize, 
                {width: this.width, height: this.height}
            );

            let cellX = this.cells[i].getX(this.width);
            let cellY = this.cells[i].getY(this.height);

            let guess = this.yLine.getY(cellX) >= cellY ? 1 : -1;
            this.cells[i].setValue(guess);
            this.cells[i].setColor(guess === 1 ? '#0f0' : '#00f');
        }

        this.canvas.clear();
        this.canvas.init();

        this.canvas.drawCartesian(0, 0, '#fff');
        this.canvas.drawGrid();

        this.cells.forEach(cell => {
            cell.draw(this.canvas, 'circle');
        });
        this.yLine.draw(this.canvas);
    }

    process() {
        this.canvas.clear();
        this.canvas.init();

        this.canvas.drawCartesian(0, 0, '#fff');
        this.canvas.drawGrid();

        this.cells.forEach(cell => {
            cell.draw(this.canvas, 'circle');
        });

        this.onTraining(this.cells[this.training]);

        this.training = (this.training + 1) % this.MAX_POINT;
        this.yLine.draw(this.canvas);

        let weights = this.perceptron.getWeights();
        let trainingLine = new Line( (weights[0] / weights[1]), - (weights[2] / weights[1]), '#f00');
        trainingLine.draw(this.canvas);

        this.onGuessing(this.training);
    }


    draw () {
        this.loop = setInterval(() => {

            this.process();

        }, 1000 / this.fps);
    }

    play() {
        if (this.isDrawing) return
        this.isDrawing = true;
        this.draw();
    }

    pause() {
        clearInterval(this.loop);
        this.isDrawing = false;
    }

    reload () {
        this.pause();
        this.setup();
    }

    render () {
        this.setup();
        // this.draw();
        return this.section;
    }
}