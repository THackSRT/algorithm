

export default class Queue {

    constructor() {
        this.elements = [];
    }

    add(element) {
        this.elements.push(element);
    }

    remove() {
        if (this.isEmpty()) {
            return "Empty queue";
        }
        return this.elements.shift();
    }

    front() {
        if (this.isEmpty()) {
            return "Empty queue";
        }
        return this.elements[0];
    }

    getElements() {
        return this.elements;
    }

    getLength() {
        return this.elements.length;
    }

    isEmpty() {
        return this.elements.length === 0;
    }

    clear() {
        this.elements = [];
    }

    toString() {
        return this.elements.toString();
    }
}