import TreeNode from "./TreeNode";
import Perceptron from './Perceptron';



export default class NeuralNode extends Perceptron {

    constructor(length, learningRate) {
        super(length, learningRate);
        this.children = [];
    }

    addChild(node) {
        this.children.push(node);
    }

    removeChild(node) {
        let index = this.children.indexOf(node);
        if(index > -1) {
            this.children.splice(index, 1);
        }
    }eeZ

    getChildren() {
        return this.children;
    }

    getLength() {
        return this.length;
    }

    getLearningRate() {
        return this.learningRate;
    }

    getWeights() {
        return this.weights;
    }

}