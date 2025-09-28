import Main from "./main.js";
import Canvas from './../../views/Canvas.js';
import Section from './../../views/Section.js';
import NEAT from "../../utils/neuralNetwork/NEAT.js";
import Layer from "../../utils/neuralNetwork/Layer.js";
import Game from "../FlappyBird/Game.js";
import NeuralNetwork from "../../utils/neuralNetwork/NeuralNetwork.js";
import Row from './../../views/Row.js';
import Text from './../../views/Text.js';

const main = new Main();
const game = new Game();

const width = 300;
const height = 300;
const canvas1 = new Canvas(
    'canvasNeurone', height, width, 1, 1, '#000'
);
const canvas2 = new Canvas(
    'canvasNeurone2', height, width, 1, 1, '#000'
);
const canvas3 = new Canvas(
    'canvasNeurone3', height, width, 1, 1, '#000'
);
const canvas4 = new Canvas(
    'canvasNeurone4', height, width, 1, 1, '#000'
);
const canvas5 = new Canvas(
    'canvasNeurone5', height, width, 1, 1, '#000'
);
const canvas6 = new Canvas(
    'canvasNeurone6', height, width, 1, 1, '#000'
);

const text1 = new Text('text1', 'Test crossover');
const htmlRow = new Row('row1', [
    canvas1,
    canvas2,
    canvas3
])

const text2 = new Text('text2', 'Test mutation');
const htmlRow2 = new Row('row2', [
    canvas4,
    canvas5,
    canvas6
])

canvas1.init();
canvas2.init();
canvas3.init();
canvas4.init();
canvas5.init();
canvas6.init();

let nbInputs = 4;
let nbOutputs = 2;


const neat1 = new NeuralNetwork(nbInputs, nbOutputs);
const neat2 = new NeuralNetwork(nbInputs, nbOutputs);
// let hidden1 = Layer.createLayer(neat1.length - 1, "hidden", 1);
// neat1.addHiddenLayer(hidden1)
// let hidden2 = Layer.createLayer(neat1.length - 1, "hidden", 1);
// neat1.addHiddenLayer(hidden2)
// let hidden3 = Layer.createLayer(neat1.length - 1, "hidden", 1);
// neat1.addHiddenLayer(hidden3)

let row1 = neat1.length;
let col1 = neat1.maxSize;

let row2 = neat2.length;
let col2 = neat2.maxSize;

neat1.fullConnect();
neat2.fullConnect();

const neat3 = NEAT.crossoverNetwork(neat1, neat2);


let row3 = neat3.length;
let col3 = neat3.maxSize;

canvas1.setCellSize(width / row1, (height / col1));
canvas2.setCellSize(width / row2, (height / col2));
canvas3.setCellSize(width / row3, (height / col3));



neat1.predict([1, 2, 3, 4]);
neat2.predict([1, 2, 3, 4]);
neat3.predict([1, 2, 3, 4]);



neat1.draw(canvas1);
neat2.draw(canvas2);
neat3.draw(canvas3);

const neat4 = NEAT.mutateNetwork(neat1);
const neat5 = NEAT.mutateNetwork(neat2);
const neat6 = NEAT.mutateNetwork(neat3);

let row4 = neat4.length;
let col4 = neat4.maxSize;

let row5 = neat5.length;
let col5 = neat5.maxSize;

let row6 = neat6.length;
let col6 = neat6.maxSize;

canvas4.setCellSize(width / row4, (height / col4));
canvas5.setCellSize(width / row5, (height / col5));
canvas6.setCellSize(width / row6, (height / col6));

neat4.predict([1, 2, 3, 4]);
neat5.predict([1, 2, 3, 4]);
neat6.predict([1, 2, 3, 4]);



neat4.draw(canvas4);
neat5.draw(canvas5);
neat6.draw(canvas6);

const canvas7 = new Canvas(
    'canvasNeurone7', height, width, 1, 1, '#000'
);


const section = new Section(
    'sectionNeuroevolution', 'Test NEAT',
    text1,
    htmlRow,
    text2,
    htmlRow2
);

main.append(section);
main.append(game.render());



