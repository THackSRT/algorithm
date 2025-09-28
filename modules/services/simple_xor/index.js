import Main from "./main.js";
import Canvas from './../../views/Canvas.js';
import Section from './../../views/Section.js';
import Layer from "../../utils/neuralNetwork/Layer.js";
import NeuralNetwork from "../../utils/neuralNetwork/NeuralNetwork.js";
import { binaryStep, relu, sigmoid } from "../../utils/neuralNetwork/activateFunction.js";

const main = new Main();

const width = 800;
const height = 300;
const canvas = new Canvas(
    'canvasNeurone', height, width, 1, 1, '#000'
);

const section = new Section(
    'sectionNeuroevolution', 'Test Neural Network',
        canvas
);

main.append(section);


let nbInputs = 2;
let nbHidden = 2;
let nbOutputs = 1;

const nn = new NeuralNetwork(nbInputs, nbOutputs);
nn.addHiddenLayer(
    Layer.createLayer(1, "hidden", nbHidden)
)

nn.layers.forEach(layer => {
    layer.setActivateFunction(binaryStep);
})

nn.fullConnect();

let nr = nn.length;
let nc = nn.maxSize;
let cellSize = Math.min(width / nr, height / nc);
canvas.setCellSize(cellSize, cellSize);

nn.draw(canvas);

let xor = [
    {input: [0, 0], output: [0]},
    {input: [0, 1], output: [1]},
    {input: [1, 0], output: [1]},
    {input: [1, 1], output: [0]}
];


let inputs = [];




let index= 0;

function animation () {

    canvas.clear();
    canvas.init()
    nn.predict(index % 4 === 0 ? xor[0].input : xor[index % 4].input);
    nn.draw(canvas);

    index++;
}

setInterval(animation, 2500);