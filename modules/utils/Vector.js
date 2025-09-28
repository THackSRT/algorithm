

export default class Vector {

    constructor (dimensions) {
        this.dimensions = dimensions;
        this.values = new Array(dimensions);
    }

    set (index, value) {
        this.values[index] = value;
    }

    get (index) {
        return this.values[index];
    }

    get length () {
        return this.dimensions;
    }

    static add (a, b) {
        if (a.length !== b.length) {
            throw new Error('Cannot add vectors of different lengths');
        }

        let result = new Vector(a.length);

        for (let i = 0; i < a.length; i++) {
            result.set(i, a.get(i) + b.get(i));
        }

        return result;
    }

    static subtract (a, b) {
        if (a.length !== b.length) {
            throw new Error('Cannot subtract vectors of different lengths');
        }

        let result = new Vector(a.length);

        for (let i = 0; i < a.length; i++) {
            result.set(i, a.get(i) - b.get(i));
        }

        return result;
    }

    static multiply (a, b) {
        if (a.length !== b.length) {
            throw new Error('Cannot multiply vectors of different lengths');
        }

        let result = new Vector(a.length);

        for (let i = 0; i < a.length; i++) {
            result.set(i, a.get(i) * b.get(i));
        }

        return result;
    }

    static divide (a, b) {
        if (a.length !== b.length) {
            throw new Error('Cannot divide vectors of different lengths');
        }

        let result = new Vector(a.length);

        for (let i = 0; i < a.length; i++) {
            result.set(i, a.get(i) / b.get(i));
        }

        return result;
    }

    static scale (a, scalar) {
        let result = new Vector(a.length);

        for (let i = 0; i < a.length; i++) {
            result.set(i, a.get(i) * scalar);
        }

        return result;
    }

    static dot (a, b) {
        if (a.length !== b.length) {
            throw new Error('Cannot dot vectors of different lengths');
        }

        let result = 0;

        for (let i = 0; i < a.length; i++) {
            result += a.get(i) * b.get(i);
        }

        return result;
    }

    static cross (a, b) {
        if (a.length !== b.length) {
            throw new Error('Cannot cross vectors of different lengths');
        }

        if (a.length !== 3) {
            throw new Error('Cannot cross vectors that are not 3-dimensional');
        }

        let result = new Vector(3);

        result.set(0, a.get(1) * b.get(2) - a.get(2) * b.get(1));
        result.set(1, a.get(2) * b.get(0) - a.get(0) * b.get(2));
        result.set(2, a.get(0) * b.get(1) - a.get(1) * b.get(0));

        return result;
    }

    static angleBetween (a, b) {
        return Math.acos(Vector.dot(a, b) / (a.length * b.length));
    }

    static distanceBetween (a, b) {
        if (a.length !== b.length) {
            throw new Error('Cannot find distance between vectors of different lengths');
        }

        let result = 0;

        for (let i = 0; i < a.length; i++) {
            result += Math.pow(a.get(i) - b.get(i), 2);
        }

        return Math.sqrt(result);
    }

    static normalize (a) {
        let result = new Vector(a.length);

        let length = 0;

        for (let i = 0; i < a.length; i++) {
            length += Math.pow(a.get(i), 2);
        }

        length = Math.sqrt(length);

        for (let i = 0; i < a.length; i++) {
            result.set(i, a.get(i) / length);
        }

        return result;
    }

    static zero (dimensions) {
        let result = new Vector(dimensions);

        for (let i = 0; i < dimensions; i++) {
            result.set(i, 0);
        }

        return result;
    }

    static one (dimensions) {
        let result = new Vector(dimensions);

        for (let i = 0; i < dimensions; i++) {
            result.set(i, 1);
        }

        return result;
    }

}