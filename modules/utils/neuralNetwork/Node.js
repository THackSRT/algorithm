import { sigmoid } from "./activateFunction.js";
import Link from "./Link.js";

export default class Node {

    constructor(id, type = "hidden") {
        this.id = id;
        this.type = type;

        this.value = 0;
        this.error = 0;

        this.inputLinks = [];
        this.outputLinks = [];

        this.func = sigmoid;
        this.learingRate = 0.1;
    }

    setId(id) {
        this.id = id;
    }

    setActivateFunction(func) {
        this.func = func;
    }

    addInputLink(link) {
        if (this.type === "input") {
            console.log("input node can't have input link")
            return;
        }
        this.inputLinks.push(link);
    }

    addOutputLink(link) {
        if (this.type === "output") {
            console.log("output node can't have output link")
            return;
        }
        this.outputLinks.push(link);
    }

    removeInputLink(link) {
        if (this.type === "input") {
            console.log("input node can't have input link")
            return;
        }
        let index = -1;
        for (let i = 0; i < this.inputLinks.length; i++) {
            if (this.inputLinks[i].id === link.id) {
                index = i;
                break;
            }
        }
        console.log(index)
        if (index > -1 && this.inputLinks.length > 1) {
            this.inputLinks.splice(index, 1);
        }
    }

    removeOutputLink(link) {
        if (this.type === "output") {
            console.log("output node can't have output link")
            return;
        }


        let index = -1;
        for (let i = 0; i < this.outputLinks.length; i++) {
            if (this.outputLinks[i].id === link.id) {
                index = i;
                break;
            }
        }
        if (index > -1 && this.outputLinks.length > 1) {
            this.outputLinks.splice(index, 1);
        }
    }

    calculateValue(bias) {
        if (this.type === "input") {
            console.log("input node can't calculate value")
            return;
        }

        this.value = 0;
        for (let link of this.inputLinks) {
            this.value += link.from.value * link.weight;
        }

        this.value = this.activeFunc(this.value + bias);
    }

    calculateError() {
        if (this.type === "output") {
            console.log("output node can't calculate error")
            return;
        }

        this.error = 0;
        for (let link of this.outputLinks) {
            this.error += link.to.error * link.weight;
        }

        this.error *= this.dactiveFunc(this.value);
    }

    setValue(value) {
        this.value = value;
    }

    setError(target) {
        this.error = target - this.value;
    }

    copy() {
        let node = new Node(this.id, this.type);
            node.value = this.value;
            node.error = this.error;
            node.inputLinks = this.inputLinks.map(link => link.copy());
            node.outputLinks = this.outputLinks.map(link => link.copy());
        return node;
    }

    mutate(rate) {
        if (this.type === "input") {
            console.log("input node can't mutate")
            return;
        }

        for (let link of this.inputLinks) {
            link.mutate(rate);
        }
    }

    static crossover(node1, node2) {
        let node = new Node(node1.id, node1.type);
            node.value = Math.random() < 0.5 ? node1.value : node2.value;
            node.error = Math.random() < 0.5 ? node1.error : node2.error;
            node.inputLinks = Link.crossover(node1.inputLinks, node2.inputLinks);
            node.outputLinks = Link.crossover(node1.outputLinks, node2.outputLinks);
        return node;
    }

    reset() {
        this.value = 0;
    }

    activeFunc(alpha) {
        return this.func.afunc(alpha);
    }

    dactiveFunc(alpha) {
        return this.func.dfunc(alpha);
    }

    setActiveFunc(func) {
        this.func = func;
    }

    serialize() {
        return {
            id: this.id,
            value: this.value,
            inputLinks: this.inputLinks.map(link => link.serialize()),
            outputLinks: this.outputLinks.map(link => link.serialize())
        };
    }

    static deserialize(json) {
        let node = new Node(json.id);
        node.value = json.value;
        node.inputLinks = json.inputLinks.map(link => Link.deserialize(link));
        node.outputLinks = json.outputLinks.map(link => Link.deserialize(link));
        return node;
    }

    print() {
        console.log("Node " + this.id + " :");
        console.log("value : " + this.value);
        console.log("error : " + this.error);
        console.log("inputLinks :");
        for (let link of this.inputLinks) {
            link.print();
        }
        console.log("outputLinks :");
        for (let link of this.outputLinks) {
            link.print();
        }
    }

    getRow() {
        return this.id.split("-")[0];
    }

    getCol() {
        return this.id.split("-")[1];
    }

    draw(canvas, height, count) {
        let row = this.getRow();
        let r = height / count;

        let col = this.getCol();
        col = col * r + (height - count) / (2 * count);

        let value = Math.round(this.value * 1000) / 1000;
        canvas.drawValue(row, col, value);
    }
}