import NeuralNetwork from "./NeuralNetwork.js";
import Layer from "./Layer.js";
import Node from "./Node.js";
import Link from "./Link.js";


export default class NEAT {

    constructor() {
        
    }

    static crossoverLayer(layer1, layer2) {
        let child = new Layer(layer1.id, layer1.type);
        let nodes = [];
        for (let i = 0; i < layer1.nodes.length; i++) {
            let node1 = layer1.nodes[i];
            let node2 = layer2.nodes[i];
            let node = Node.crossover(node1, node2);
            nodes.push(node);
        }
        child.nodes = nodes;
        return child;
    }

    static crossoverNetwork(network1, network2) {
        let child = new NeuralNetwork(network1.inputLayer.size, network1.outputLayer.size);
        for (let i = 0; i < network1.hiddenLayers.length; i++) {
            let layer1 = network1.hiddenLayers[i];
            let layer2 = network2.hiddenLayers[i];
            let layer = NEAT.crossoverLayer(layer1, layer2);
            child.addHiddenLayer(layer);
        }
        child.fullConnect();
        return child;
    }

    static mutateNetwork(network) {
        let neat = network.copy();
        // choose two layers
        let indexOfLayer = Math.floor(Math.random() * (neat.layers.length - 1));
        let layer1 = neat.layers[indexOfLayer];
        let layer2 = neat.layers[indexOfLayer + 1];
        NEAT.mutateLayer(layer1, layer2, network);
        return neat;
    }

    static mutateLayer(layer, nextLayer, nn) {
        // for (let node of layer.nodes) {
        //     NEAT.mutateNode(node);
        // }
        // mutate on layer link
        for (let link of nextLayer.links) {
            NEAT.mutateLink(link);
        }
        
        NEAT.mutateConnection(layer, nextLayer, nn);
    }

    static mutateNode(node) {
        let random = Math.random();
        if (random < 0.1) {
            // change node type
            node.type = node.type === "input" ? "hidden" : "input";
        }
    }

    static mutateLink(link) {
        let random = Math.random();
        if (random < 0.1) {
            // change weight
            link.weight = Math.random() * 2 - 1;
        }
    }

    static mutateConnection(layer, nextLayer, nn) {
        // remove or add new connections
        let random = Math.random();
        if (random < 0.1) {
        
            
        } else if (random < 0.2) {
            // add new connection
            // chose random node in layer
            let node = nextLayer.nodes[Math.floor(Math.random() * nextLayer.nodes.length)];
            // chose random node in next layer
            let exclude = layer.nodes[Math.floor(Math.random() * layer.nodes.length)];
            let excludes = layer.nodes.filter(n => n.id !== exclude.id);
            layer.connectToNode(node, excludes);
            
        } else if (random < 0.225) {
            // add new hidden layer
            let layer = Layer.createLayer(nn.hiddenLayers.length - 1, "hidden", 1);
            nn.addHiddenLayer(layer);



            
        } else if (random < 0.75) {
            // remove connection
            // chose random node in layer
            let node = nextLayer.nodes[Math.floor(Math.random() * nextLayer.nodes.length)];
            // chose random node in next layer
            let exclude = layer.nodes[Math.floor(Math.random() * layer.nodes.length)];
            let excludes = layer.nodes.filter(n => n.id !== exclude.id);
            layer.deconnectToNode(node, excludes);
        }
    }

}