

export default class Vertex {
    constructor(data) {
        this.data = data;
        this.neighbors = [];
    }

    addNeighbor(node) {
        this.neighbors.push(node);
    }

    removeNeighbor(node) {
        const index = this.neighbors.indexOf(node);
        if (index > -1) {
            this.neighbors.splice(index, 1);
        }
    }

    getNeighbors() {
        return this.neighbors;
    }

    isNeighbor(node) {
        return this.neighbors.indexOf(node) > -1;
    }

    toString() {
        return this.data.toString();
    }
}