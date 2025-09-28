import Layer from "./Layer.js";


export default class NeuralNetwork {

    constructor(nbInputs, nbOutputs) {

        this.hiddenLayers = [];
        this.layers = [];

        this.inputLayer = Layer.createLayer(0, "input", nbInputs);
        this.outputLayer = Layer.createLayer(1, "output", nbOutputs);
        this.layers.push(this.inputLayer);
        this.layers.push(this.outputLayer);
    }

    addHiddenLayer(layer) {
        this.hiddenLayers.push(layer);
        this.outputLayer.setId(this.hiddenLayers.length + 1);
        this.layers = [this.inputLayer, ...this.hiddenLayers, this.outputLayer];
    }


    removeHiddenLayer(layer) {
        let index = this.hiddenLayers.indexOf(layer);
        if (index > -1) {
            this.hiddenLayers.splice(index, 1);
        }
        if (this.hiddenLayers.length > 0)
            this.layers = [inputLayer, ...this.hiddenLayers, outputLayer];
        else
            this.layers = [inputLayer, outputLayer];
    }

    fullConnect() {
        for (let i = 0; i < this.layers.length - 1; i++) {
            this.layers[i].connect(this.layers[i + 1]);
        }
    }


    predict(inputs) {
        if (inputs.length !== this.inputLayer.size) {
            console.log("Wrong number of inputs");
            return;
        }

        this.inputLayer.setValues(inputs);

        for (let layer of this.layers) {
            if (layer.type === "input") continue;
            layer.calculateValues();
        }

        let outputs = [];
        for (let node of this.outputLayer.nodes) {
            outputs.push(node.value);
        }
        return outputs;
    }

    train(inputs, targets) {
        if (inputs.length !== this.inputLayer.size) {
            console.log("Wrong number of inputs");
            return;
        }

        if (targets.length !== this.outputLayer.size) {
            console.log("Wrong number of targets");
            return;
        }

        let output = this.predict(inputs);
        let errors = [];
        for (let i = 0; i < output.length; i++) {
            errors.push(targets[i] - output[i]);
        }
        this.outputLayer.setErrors(errors);

        for (let i = this.layers.length - 1; i > 0; i--) {
            if (this.layers[i].type === "output") continue;

            this.layers[i].calculateErrors();
        }

        for (let layer of this.layers) {
            if (layer.type === "input") continue;
            layer.correctWeights();
        }
    }


    /** ---------- MUTATOR ---------- **/

    copy(){
        let nn = new NeuralNetwork(this.inputSize, this.outputSize);
            nn.hiddenLayers = this.hiddenLayers.map(layer => layer.copy());
            nn.inputLayer = this.inputLayer.copy();
            nn.outputLayer = this.outputLayer.copy();
            nn.layers = this.layers.map(layer => layer.copy());
        return nn;
    }

    mutate(rate) {
        // chose hidden layer
        let index = Math.floor(Math.random() * (this.layers.length - 1));
        this.layers[index].mutate(rate);

        // add new layer with 1 node
        // if (Math.random() < rate) {
        //     let layer = Layer.createLayer(index + 1, "hidden", 1);
        //     this.addHiddenLayer(layer);
        // }

        // // connect to new layer
        // if (Math.random() < rate) {
        //     this.layers[index].connect(this.layers[index + 1]);
        // }
    }

    serialize() {
        return {
            inputLayer: this.inputLayer.serialize(),
            hiddenLayers: this.hiddenLayers.map(layer => layer.serialize()),
            outputLayer: this.outputLayer.serialize()
        };
    }

    save() {
        console.log(this.serialize());
    }

    static deserialize(json) {
        let nn = new NeuralNetwork(json.inputLayer.size, json.outputLayer.size);
            nn.inputLayer = Layer.deserialize(json.inputLayer);
            nn.hiddenLayers = json.hiddenLayers.map(layer => Layer.deserialize(layer));
            nn.outputLayer = Layer.deserialize(json.outputLayer);
        return nn;
    }

    /** ---------- GETTOR ---------- **/

    get length() {
        return this.hiddenLayers.length + 2;
    }

    get inputSize() {
        return this.inputLayer.size;
    }

    get outputSize() {
        return this.outputLayer.size;
    }

    get hiddenSize() {
        let size = 0;
        for (let layer of this.hiddenLayers) {
            size += layer.size;
        }
        return size;
    }

    get maxSize() {
        let size = 0;
        for (let layer of this.layers) {
            size = Math.max(size, layer.size);
        }
        return size;
    }

    get size() {
        return this.inputSize + this.outputSize + this.hiddenSize;
    }


    print() {
        console.log("----- NeuralNetwork -----");
        console.log("----- input layer -----");
        this.inputLayer.print();
        console.log("----- hidden layers -----");
        for (let layer of this.hiddenLayers) {
            layer.print();
        }
        console.log("----- output layer -----");
        this.outputLayer.print();
    }

    draw(canvas) {
        let count = 0;
        for (let layer of this.layers) {
            let prev = count > 0 ? this.layers[count - 1].size : null;
            layer.draw(canvas, this.maxSize, prev);
            count ++;
        }
    }
}