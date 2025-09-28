
import Layer from '../../utils/neuralNetwork/Layer.js';
import NEAT from '../../utils/neuralNetwork/NEAT.js';
import NeuralNetwork from '../../utils/neuralNetwork/NeuralNetwork.js';

export default class Bird {

    constructor(x = 65, y, width, height, lift = -10, color = '#fff', icon = null) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.lift = lift;

        this.gravity = 0.6;
        this.velocity = 0;

        this.w = 15;

        // this.icon = birdSprite;
        this.icon = icon;
        this.color = color;

        this.score = 0;
        this.fitness = 0;

        this.brain = new NeuralNetwork(5,2);
        this.brain.fullConnect();
    }

    show(canvas) {
        canvas.drawCircle(this.x, this.y, this.w, this.color);
    }

    predict(pipe) {
        let inputs = [];
        inputs[0] = this.y / this.height;
        inputs[1] = pipe.x / this.width;
        inputs[2] = pipe.top / this.height;
        inputs[3] = (this.height - pipe.bottom) / this.height;
        inputs[4] = pipe.w / this.width;


        let outputs = this.brain.predict(inputs);
        if (outputs[0] > outputs[1]) {
            this.jump();
        }
    }

    update() {
        this.velocity += this.gravity;
        this.y += this.velocity;
        this.score+= 1 + Math.floor(Math.random() * 10) / 10;
    
        if (this.y > this.height) {
            this.y = this.height;
            this.velocity = 0;
        }

        if (this.y < 0) {
            this.y = 0;
            this.velocity = 0;
        }
    }

    jump() {
        this.velocity = this.lift;
    }

    isOut(canvas) {
        return this.y + this.height > canvas.height || this.y < 0;
    }

    isCollide(obj) {
        return (
            obj.x < this.x + this.width &&
            obj.x + obj.width > this.x &&
            obj.y < this.y + this.height &&
            obj.y + obj.height > this.y
        );
    }

    static crossover(bird1, bird2) {
        let child = new Bird(65, bird1.height / 2, bird1.width, bird1.height);
            child.brain = NEAT.crossoverNetwork(bird1.brain, bird2.brain);
        return child;
    }

    mutate(rate) {
        this.brain.mutate(rate);
    }
}