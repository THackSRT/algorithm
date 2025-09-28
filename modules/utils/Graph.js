export default class Graph {

    constructor() {
        this.vertices = [];
    }

    addVertex(vertex) {
        this.vertices.push(vertex);
    }

    getVertices() {
        return this.vertices;
    }

    getLength() {
        return this.vertices.length;
    }

    getVertex(index) {
        return this.vertices[index];
    }

    addEdge (vertex1, vertex2) {
        vertex1.addNeighbor(vertex2);
        vertex2.addNeighbor(vertex1);
    }

    removeEdge (vertex1, vertex2) {
        vertex1.removeNeighbor(vertex2);
        vertex2.removeNeighbor(vertex1);
    }

    isEmpty() {
        return this.vertices.length === 0;
    }

    clear() {
        this.vertices = [];
    }

    toString() {
        return this.vertices.toString();
    }
}