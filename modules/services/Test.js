import Canvas from '../views/Canvas.js';
import Section from '../views/Section.js';
import Cell from '../utils/Cell.js';
import Button from '../views/Button.js';
import NeuralNetwork from '../utils/NeuralNetwork.js';
import Line from '../utils/Line.js';

export default class Test {

    constructor() {
        this.cellSize = 30
        this.width = 600;
        this.height = 600;        

        this.done = false;

        this.cells = [];

        this.canvas = new Canvas('canvas1', this.width, this.height, this.cellSize, this.cellSize, '#000')

        this.canvas.onClick('click', (e) => {
            let mousePos = this.canvas.getMousePos(e);

            let row = Math.floor(mousePos.y / this.cellSize);
            let col = Math.floor(mousePos.x / this.cellSize);

            let cell = Cell.getCell(this.cells, row, col)
            if (!cell){
                cell = new Cell(
                    row, col,
                    this.cellSize, this.cellSize,
                );
                this.setCell(cell);
            }
            let predict = this.neuralNetwork.predict([cell.getX(this.width), cell.getY(this.height)]);
            console.log(predict)
        })

        this.eventHandler()
        

        this.section = new Section(
            'section1', 'Perceptron test',
            this.canvas,
            this.playButton,
            this.pauseButton,
            this.reloadButton,
            this.trainButton,
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

        this.trainButton = new Button('train', 'Train', () => {
            this.train();
        });
    }

    train() {
        this.cells.forEach(cell => {
            let cellX = cell.getX(this.width);
            let cellY = cell.getY(this.height);
            let value = this.yLine.getY(cellX) >= cellY ? 1 : 0;
            let trainingData = {
                inputs: [cellX, cellY],
                targets : value ? [1, 0] : [0, 1]
            }
            this.neuralNetwork.train(trainingData.inputs, trainingData.targets);
        });
    }

    setCell(cell) {

        let inputs = [
            (cell.getX(this.width)), 
            (cell.getY(this.height))
        ];
        let outputs = this.neuralNetwork.predict(inputs);
        let color = outputs[0] > 0.5 ? '#0f0' : '#00f';
        console.log(outputs)
        cell.setColor(color);
        cell.setValue(outputs[0] > 0.5);  
        this.cells.push(cell);
    }
    

    play() {
        if (this.isDrawing) return;
        this.isDrawing = true;
        this.draw();
    }

    pause() {
        clearInterval(this.loop);
        this.isDrawing = false;
    }

    reload() {
        this.pause();
    }

    setup() {
        /** --- Initialize --- **/
        this.fps = 280;
        let a = Math.random() * 10;
        let b = Math.random() * 10 * this.cellSize;
        this.yLine = new Line(a, b, '#f00')


        let nbInputs = 2;
        let nbHidden = 5;
        let nbOutput = 2;
        this.neuralNetwork = new NeuralNetwork(nbInputs, nbHidden, nbOutput, 0.5);

        /** --- Training --- **/
        for (let t = 0; t < 1000000; t++) {
            let randX = Math.floor(Math.random() * this.width / this.cellSize);
            let randY = Math.floor(Math.random() * this.height / this.cellSize);
            let trainingData = this.trainingFunction(randX, randY);
            this.neuralNetwork.train(trainingData.inputs, trainingData.targets);
        }
        /** ------------------- */
        console.log('Training done !')
        this.play()
    }

    tanh(x) {
        return (Math.exp(2 * x) - 1) / (Math.exp(2 * x) + 1);
    }

    dtanh(y) {
        return 1 - Math.pow(y, 2);
    }

    trainingFunction(randX, randY) {
        let cell = new Cell(
            randX, randY, 
            this.cellSize, this.cellSize, 
        );

        let cellX = cell.getX(this.width);
        let cellY = cell.getY(this.height);

        let value = this.yLine.getY(cellX) >= cellY ? 1 : 0;
        
        return {
            inputs: [(cellX) , (cellY)],
            targets : value ? [1, 0] : [0, 1]
        }
    }

    process() {
        /** --- Canvas Init --- **/
        this.canvas.clear();
        this.canvas.init();
        this.canvas.drawCartesian(0, 0, '#fff');
        this.canvas.drawGrid();

        this.yLine.draw(this.canvas);
        /** --- Canvas Init --- **/
        /** --- Work Process --- **/


        this.cells.forEach(cell => {
            // Prediction
            let data = this.trainingFunction(cell.getRow(), cell.getCol());
            let outputs = this.neuralNetwork.predict(data.inputs);

            if (outputs[0] >= 0.5) {
                cell.setColor('#0f0');
            } else {
                cell.setColor('#00f');
            }

            cell.draw(this.canvas, 'circle');

            this.neuralNetwork.train(data.inputs, data.targets);
        });
        /** --- Work Process --- **/

    }

    draw() {
        this.loop = setInterval(() => {
            this.process();
        }, 1000 / this.fps);
    }

    render () {
        this.setup();
        return this.section;
    }
}