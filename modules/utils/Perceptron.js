

export default class Perceptron {

    constructor(length, learningRate) {
        this.length = length;

        this.inputs = [];
        this.weights = [];

        //random weights between -1 and 1
        for(let i = 0; i < this.length; i++) {
            this.weights[i] = Math.random() * 2 - 1;
        }

        this.output = null;
        this.answer = null;

        this.learningRate = learningRate;
    }

    sign(n) {
        return n >= 0 ? 1 : -1;
    }

    activation(sum) {
        return this.sign(sum);
    }

    guess(inputs) {
        let sum = 0;
        for(let i = 0; i < this.length; i++) {
            sum += inputs[i] * this.weights[i];
        }
        return this.activation(sum);
    }

    train(inputs, target) {
        let guess = this.guess(inputs);
        let error = target - guess;

        for(let i = 0; i < this.length; i++) {
            this.weights[i] += error * inputs[i] * this.learningRate;
        }
    }

    getWeights() {
        return this.weights;
    }
}