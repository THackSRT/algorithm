import Node from "./Node.js";
import Link from "./Link.js";
import { ActivateFunction, sigmoid } from "./activateFunction.js";

export default class Layer {

    constructor(id, type) {
        this.id = id;
        this.type = type;

        this.nodes = [];
        this.links = [];

        this.bias = 1;
        
        this.activateFunction = sigmoid;
    }

    static createLayer(id, type, nbNodes) {
        let layer = new Layer(id, type);
        for (let i = 0; i < nbNodes; i++) {
            layer.addNode(new Node(
                layer.id + "-" +  i,
                type
            ));
        }
        return layer;
    }

    setId(id) {
        this.id = id;
        for (let i = 0; i < this.nodes.length; i++) {
            this.nodes[i].setId(id + "-" + i);
        }
    }

    setActivateFunction(activateFunction) {
        this.activateFunction = activateFunction;
        this.nodes.forEach(node => node.setActivateFunction(activateFunction));
    }

    addNode(node) {
        if (this.type !== node.type){
            console.log("Can't add node to layer with different type");
            return;
        }
        this.nodes.push(node);
    }

    removeNode(node) {
        let index = this.nodes.indexOf(node);
        if (index > -1) {
            this.nodes.splice(index, 1);
        }
    }

    removeLink(link) {
        let index = this.links.indexOf(link);
        if (index > -1) {
            this.links.splice(index, 1);
            // remove link from nodes
            link.from.removeOutputLink(link);
            link.to.removeInputLink(link);
        }
    }

    connect(layer) {
        if (this.type === "output") {
            console.log("output layer can't connect to another layer");
            return;
        }

        for (let node of this.nodes) {
            for (let node2 of layer.nodes) {
                let link = new Link(this.links.length, node, node2);
                node.addOutputLink(link);
                node2.addInputLink(link);
                this.links.push(link);
            }
        }
    }

    connectToNode(node, excludes = []) {
        if (this.type === "output") {
            console.log("output layer can't connect to another layer");
            return;
        }

        for (let node2 of this.nodes) {
            if (excludes.includes(node2)) continue;

            // link exists
            if (Link.getLink(this.links, node2, node) !== null) continue;

            let link = new Link(this.links.length, node2, node);
            node.addInputLink(link);
            node2.addOutputLink(link);
            this.links.push(link);
        }
    }

    deconnectToNode(node, excludes = []) {
        if (this.type === "output") {
            console.log("output layer can't connect to another layer");
            return;
        }


        for (let node2 of this.nodes) {
            if (excludes.includes(node2)) continue;

            let link = Link.getLink(this.links, node2, node);
            console.log(link)

            node.removeInputLink(link);
            node2.removeOutputLink(link);

            this.links.splice(this.links.indexOf(link), 1);
        }
    }

    connectFromNode(node, excludes = []) {
        if (this.type === "input") {
            console.log("input layer can't connect to another layer");
            return;
        }

        for (let node2 of this.nodes) {
            if (excludes.includes(node2)) continue;

            let link = new Link(this.links.length, node, node2);
            node.addOutputLink(link);
            node2.addInputLink(link);
            this.links.push(link);
        }
    }

    deconnectFromNode(node, excludes = []) {
        if (this.type === "input") {
            console.log("input layer can't connect to another layer");
            return;
        }

        for (let node2 of this.nodes) {
            if (excludes.includes(node2)) continue;

            let link = Link.getLink(this.links, node, node2);

            node.removeOutputLink(link);
            node2.removeInputLink(link);

            this.links.splice(this.links.indexOf(link), 1);
        }
    }


    get size() {
        return this.nodes.length;
    }

    setValues(values) {
        if (values.length !== this.size) {
            console.log("Wrong number of values");
            return;
        }

        for (let i = 0; i < values.length; i++) {
            this.nodes[i].setValue(values[i])
        }
    }

    setErrors(targets) {
        if (targets.length !== this.size) {
            console.log("Wrong number of errors");
            return;
        }

        for (let i = 0; i < targets.length; i++) {
            this.nodes[i].setError(targets[i])
        }
    }

    calculateValues() {
        if (this.type === "input") {
            console.log("input layer can't calculate values");
            return;
        }

        for (let node of this.nodes) {
            node.calculateValue(this.bias);
        }
    }

    calculateErrors() {
        if (this.type === "output") {
            console.log("output layer can't calculate errors");
            return;
        }
        for (let node of this.nodes) {
            node.calculateError();
        }
    }

    correctWeights() {
        if (this.type === "input") {
            console.log("input layer can't correct weights");
            return;
        }

        for (let node of this.nodes) {
            for (let link of node.inputLinks) {
                link.correctWeight();
            }
        }
    }


    copy() {
        let layer = new Layer(this.id, this.type);
            layer.nodes = this.nodes.map(node => node.copy());
            layer.links = this.links.map(link => link.copy());
            layer.bias = this.bias;
        return layer;
    }

    mutate(rate) {
        // chose randomly a link from list of links
        let index = Math.floor(Math.random() * this.links.length);
        this.links[index].mutate(rate);
    }

    reset() {
        for (let node of this.nodes) {
            node.reset();
        }
    }

    serialize() {
        return {
            id: this.id,
            type: this.type,
            nodes: this.nodes.map(node => node.serialize())
        };
    }

    static deserialize(json) {
        let layer = new Layer(json.id, json.type);
        layer.nodes = json.nodes.map(node => Node.deserialize(node));
        return layer;
    }

    print() {
        console.log("----> Layer " + this.id + " :");
        for (let node of this.nodes) {
            node.print();
        }
    }

    draw(canvas, height, prevCount = 1) {
        for (let node of this.nodes) {
            node.draw(canvas, height, this.nodes.length);
            if (node.type === "input") continue;
            for (let link of node.inputLinks) {
                link.draw(canvas, height, prevCount, this.nodes.length);
            }
        }
    }
}