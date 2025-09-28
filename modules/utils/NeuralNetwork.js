import Matrix from './Matrix.js';


export default class NeuralNetwork {
    constructor (inputNodes, hiddenNodes, outputNodes, learningRate = 0.1) {
        this.inputNodes = inputNodes;
        this.hiddenNodes = hiddenNodes;
        this.outputNodes = outputNodes;

        this.weights_ih = new Matrix(this.hiddenNodes, this.inputNodes);
        this.weights_ho = new Matrix(this.outputNodes, this.hiddenNodes);
        this.weights_ih.randomize();
        this.weights_ho.randomize();


        this.bias_h = new Matrix(this.hiddenNodes, 1);
        this.bias_o = new Matrix(this.outputNodes, 1);
        this.bias_h.randomize();
        this.bias_o.randomize();

        this.learningRate = learningRate;
        this.setActivationFunc();
        this.setDesactivationFunc();
    }



    predict(inputs) {
        let inputLayer = Matrix.fromArray(inputs);

        let hiddenLayer = Matrix.addition(
            Matrix.multiply(this.weights_ih, inputLayer), 
            this.bias_h
        );
        hiddenLayer.applyFunc(this.activationFunc);

        let outputLayer = Matrix.addition(
            Matrix.multiply(this.weights_ho, hiddenLayer), 
            this.bias_o
        );
        outputLayer.applyFunc(this.activationFunc);

        return Matrix.toArray(outputLayer);
    }

    train(inputs, targets) {

        // convert array to matrix object
        let targetsMatrix = Matrix.fromArray(targets);
        let inputLayer = Matrix.fromArray(inputs);
        
        // Generate hidden layer
        let hiddenLayer = Matrix.addition(
            Matrix.multiply(this.weights_ih, inputLayer),
            this.bias_h
        );
        hiddenLayer.applyFunc(this.activationFunc);

        // Generate output layer
        let outputLayer = Matrix.addition(
            Matrix.multiply(this.weights_ho, hiddenLayer),
            this.bias_o
        );
        outputLayer.applyFunc(this.activationFunc);

        // Calculate the output errors
        let outputErrors = Matrix.subtract(targetsMatrix, outputLayer);

        // Calculate gradient
        let outputGradient = Matrix.scale(
            Matrix.dot(
                Matrix.map(
                    outputLayer,
                    this.desactivationFunc
                ), 
                outputErrors
            ), 
            this.learningRate
        );

        // Calculate deltas
        let weights_ho_deltas = Matrix.multiply(
            outputGradient, 
            Matrix.transpose(hiddenLayer)
        );

        // Update the weights and bias
        this.weights_ho = Matrix.addition(this.weights_ho, weights_ho_deltas);
        this.bias_o = Matrix.addition(this.bias_o, outputGradient);

        // Calculate the hidden layer errors
        let hiddenErrors = Matrix.multiply(
            Matrix.transpose(this.weights_ho), 
            outputErrors
        );

        // Calculate the hidden gradient
        let hiddenGradient = Matrix.scale(
            Matrix.dot(
                Matrix.map(
                    hiddenLayer,
                    this.desactivationFunc
                ), 
                hiddenErrors
            ), 
            this.learningRate
        );

        // Calculate the input -> hidden deltas
        let weights_ih_deltas = Matrix.multiply(
            hiddenGradient, 
            Matrix.transpose(inputLayer)
        );

        // Update the weights and the bias
        this.weights_ih = Matrix.addition(this.weights_ih, weights_ih_deltas);
        this.bias_h = Matrix.addition(this.bias_h, hiddenGradient);
    }

    activation(inputs) {
        return this.activationFunc(inputs);
    }

    setActivationFunc(activationFunc = this.sigmoid) {
        this.activationFunc = activationFunc;
    }

    desactivation(inputs) {
        return this.desactivationFunc(inputs);
    }

    setDesactivationFunc(desactivationFunc = this.dsigmoid) {
        this.desactivationFunc = desactivationFunc;
    }

    sigmoid(inputs) {
        return 1 / (1 + Math.exp(-inputs));
    }

    dsigmoid(inputs) {
        return inputs * (1 - inputs);
    }

    static serialize(nn) {
        return JSON.stringify(nn);
    }

    static deserialize(data) {
        if (typeof data == 'string') {
            data = JSON.parse(data);
        }

        let nn = new NeuralNetwork(data.inputNodes, data.hiddenNodes, data.outputNodes, data.learningRate);
            nn.weights_ih = Matrix.deserialize(data.weights_ih);
            nn.weights_ho = Matrix.deserialize(data.weights_ho);
            nn.bias_h = Matrix.deserialize(data.bias_h);
            nn.bias_o = Matrix.deserialize(data.bias_o);
        return nn;
    }


    copy() {
        let nn = new NeuralNetwork(this.inputNodes, this.hiddenNodes, this.outputNodes, this.learningRate);
            nn.weights_ih = this.weights_ih.copy();
            nn.weights_ho = this.weights_ho.copy();
            nn.bias_h = this.bias_h.copy();
            nn.bias_o = this.bias_o.copy();
        return nn;
    }

    mutate(rate) {
        function mutate(val) {
            if (Math.random() < rate) {
                return val + Math.random() * 0.1 - 0.05;
            } else {
                return val;
            }
        }

        this.weights_ih.applyFunc(mutate);
        this.weights_ho.applyFunc(mutate);
        this.bias_h.applyFunc(mutate);
        this.bias_o.applyFunc(mutate);
    }
}