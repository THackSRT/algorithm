export class Node {
    constructor(data, next = null) {
      this.data = data;
      this.next = next;
    }
  }

export class List {

    constructor() {
        this.head = null;
        this.size = 0;
    }

    add(data) {
        const node = new Node(data);
        if (this.head === null) {
            this.head = node;
        } else {
            let current = this.head;
            while(current.next) {
                current = current.next;
            }
            current.next = node;
        }
        this.size++;
    }

    insertFirst(data) {
        const node = new Node(data);
        node.next = this.head;
        this.head = node;
        this.size++;
    }

    insertLast(data) {
        const node = new Node(data);
        let current = this.head;
        while(current.next) {
            current = current.next;
        }
        current.next = node;
        this.size++;
    }

    insertAt(data, index) {
        if (index < 0 || index > this.size) {
            return null;
        }
        const node = new Node(data);
        let current = this.head;
        let previous;
        if (index === 0) {
            node.next = current;
            this.head = node;
        } else {
            for (let i = 0; i < index; i++) {
                previous = current;
                current = current.next;
            }
            node.next = current;
            previous.next = node;
        }
        this.size++;
    }

    removeFirst() {
        if (this.isEmpty()) {
            return null;
        }
        const data = this.head.data;
        this.head = this.head.next;
        this.size--;
        return data;
    }

    removeLast() {
        if (this.isEmpty()) {
            return null;
        }
        let current = this.head;
        let previous;
        while(current.next) {
            previous = current;
            current = current.next;
        }
        previous.next = null;
        this.size--;
        return current.data;
    }

    removeFrom(index) {
        if (index < 0 || index > this.size) {
            return null;
        }
        let current = this.head;
        let previous;
        if (index === 0) {
            this.head = current.next;
        } else {
            for (let i = 0; i < index; i++) {
                previous = current;
                current = current.next;
            }
            previous.next = current.next;
        }
        this.size--;
        return current.data;
    }

    removeElement(data) {
        let current = this.head;
        let previous;
        while(current !== null) {
            if (current.data === data) {
                if (!previous) {
                    this.head = current.next;
                } else {
                    previous.next = current.next;
                }
                this.size--;
                return current.data;
            }
            previous = current;
            current = current.next;
        }
        return null;
    }

    indexOf(data) {
        let current = this.head;
        let index = 0;
        while(current !== null) {
            if (current.data === data) {
                return index;
            }
            index++;
            current = current.next;
        }
        return -1;
    }

    isEmpty() {
        return this.size === 0;
    }

    getSize() {
        return this.size;
    }

    getHead() {
        return this.head;
    }

    getFirst() {
        return this.head.data;
    }

    getLast() {
        let current = this.head;
        while(current.next) {
            current = current.next;
        }
        return current.data;
    }

    clear() {
        this.head = null;
        this.size = 0;
    }

    toString() {
        let current = this.head;
        let string = '';
        while(current !== null) {
            string += current.data + (current.next ? ' -> ' : '');
            current = current.next;
        }
        return string;
    }
}
