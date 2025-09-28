

export default class Stack  {

    constructor() {
        this.elements = [];
    }

    add(element) {
        this.elements.push(element);
    }

    pop() {
        if (this.isEmpty()) {
            return "Empty stack";
        }
        return this.elements.pop();
    }

    top() {
        return this.elements[this.elements.length - 1];
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