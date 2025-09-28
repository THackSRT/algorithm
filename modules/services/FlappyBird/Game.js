import Canvas from '../../views/Canvas.js';
import Section from '../../views/Section.js';
import Button from '../../views/Button.js';
import Pipe from './Pipe.js';
import Bird from './Bird.js';
import NEAT from '../../utils/neuralNetwork/NEAT.js';
import Column from '../../views/Column.js';
import Row from '../../views/Row.js';
import DOM from '../../views/DOM.js';

export default class Game {

    constructor() {

        this.width = 700;
        this.height = 500;
        this.cellSize = 30;

        this.MAX_BIRDS = 250;

        this.eventHandler();

        this.canvas = new Canvas('canvasFlappy', this.height, this.width, this.cellSize, this.cellSize, '#000')
        this.canvasBrain = new Canvas('canvasFlappyBrain', 500, 400, this.cellSize, this.cellSize, '#000')
        
        this.section = new Section(
            'sectionFlappy', 'Flappy Bird',
            new Column('columnFlappy', [
                new Row('rowFlappy', [
                    this.canvas,
                    this.canvasBrain,
                ], "center", "space-evenly"),
                new Row('rowFlappy2', [
                    this.startButton,
                    this.stopButton,
                    this.restartButton,
                ], "center", "space-evenly")
            ], "center")
        );

        

        this.birds = [];
        this.pipes = [];
        this.parallax = 0.8;
        this.score = 0;
        this.maxScore = 0;
        this.bestBrain = null;
        this.gameoverFrame = 0;
        this.isOver = false;
    }

    eventHandler() {
        // start button
        this.startButton = new Button('Start', 'Start', () => {
            this.start();
        });
        
        // stop button
        this.stopButton = new Button('Stop', 'Stop', () => {
            this.stop();
        });

        // restart button
        this.restartButton = new Button('Restart', 'Restart', () => {
            this.restart();
        });


        // jump
        // document.addEventListener('keydown', (e) => {
        //     if (e.key === ' ') {
        //         this.bird.jump(this.fps);
        //     }
        // });

    }


    setup() {
        this.fps = 120;
        this.canvas.init();
        this.reset();
    }


    update() {

        if (this.frameCount >= 1 && (this.frameCount) % 175 === 0) {
            this.pipes.push(new Pipe(this.width, this.height));
        }


        for (let i = this.pipes.length - 1; i >= 0; i--) {
            this.pipes[i].update();
            this.pipes[i].show(this.canvas);
            if (this.pipes[i].offscreen()) {
                this.pipes.splice(i, 1);
            }
        }
        
        for(let bird of this.birds) {
            if (this.pipes[0].pass(bird)) {
                this.score++;
            }
        
            if (this.pipes[0].hits(bird)) {
                this.gameover(bird);
            }

            bird.predict(this.pipes[0]);
            bird.update();
            bird.show(this.canvas);
        }
        
        if (this.birds.length > 0) {
            let row = this.birds[0].brain.length;
            let col = this.birds[0].brain.maxSize;
            this.canvasBrain.setCellSize(this.canvasBrain.width / row, (this.canvasBrain.height / col));
            this.bestBrain = this.birds[0].brain;
            this.canvasBrain.clear();
            this.canvasBrain.init();
            this.bestBrain.draw(this.canvasBrain);
        }
    }

    reset() {
        this.isOver = false;
        this.score = 0;
        this.pipes = [];
        this.pipes.push(new Pipe(this.width, this.height));
        this.pipes[0].show(this.canvas);
        this.birds = [];
        this.savedBirds = [];

        for (let i = 0; i < this.MAX_BIRDS; i++) {
            this.birds[i] = new Bird(65, this.height / 2, this.width, this.height);
        }
        this.frameCount = 0;

        for(let bird of this.birds) 
            bird.show(this.canvas);

        this.bestBrain = this.birds[0].brain;
    }

    async draw() {
        this.loop = setInterval(() => {

            // // clear canvas
            this.canvas.clear();
            this.canvas.init();

            this.update();
            
            this.showScores();


            this.frameCount++;
        }, 1000 / this.fps);
    }

    stop() {
        this.looping = false;
        clearInterval(this.loop);
    }

    async start() {
        if (this.looping) return;
        this.looping = true;
        await this.draw();
    }


    showScores() {
    }
      
    gameover(bird) {
        this.savedBirds.push(bird);
        this.birds.splice(this.birds.indexOf(bird), 1);

        
        if (bird.score > this.maxScore) {
            this.maxScore = bird.score;
            console.log("max score : ", this.maxScore);
            bird.brain.save();
            
        }
        if (this.birds.length === 0) {
            // best score
            
            this.nextGeneration();
        }
    }

    nextGeneration() {
        this.stop();
        this.normalizeFitness();
        this.restart();
        this.birds = this.generate();
        this.pipes.push(new Pipe(this.width, this.height));
        this.pipes[0].show(this.canvas);
        this.start();
    }

    restart() {
        this.pipes = [];
        this.score = 0;
        this.frameCount = 0;
    }

    generate() {
        let newBirds = [];
        for (let i = 0; i < this.MAX_BIRDS; i++) {
            let bird1 = this.pickOne();
            let bird2 = this.pickOne();
            newBirds[i] = Bird.crossover(bird1, bird2);
        }
        return newBirds;
    }

    pickOne() {
        // take the best bird with the max fitness
        let index = 0;
        let r = Math.random();
        while (r > 0) {
            r -= this.savedBirds[index].fitness;
            index++;
        }
        index--;
        let bird = this.savedBirds[index];
        let child = new Bird(65, this.height / 2, this.width, this.height);
            child.brain = bird.brain.copy();
            child.brain.mutate(0.1);
        return child;
    }

    normalizeFitness() {
        for (let bird of this.savedBirds) {
            bird.score = Math.pow(bird.score, 2);
        }

        let sum = 0;
        for (let bird of this.savedBirds) {
            sum += bird.score;
        }
        for (let bird of this.savedBirds) {
            bird.fitness = bird.score / sum;
        }
    }


    render() {
        this.setup();
        return this.section;
    }
}