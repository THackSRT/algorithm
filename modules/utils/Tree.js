

export default class Tree {

    constructor() {
        this.root = null;
    }

    isEmpty() {
        return this.root === null;
    }

    clear() {
        this.root = null;
    }

    setRoot(node) {
        this.root === node;
    }

    getRoot() {
        return this.root;
    }

    isRoot(root) {
        return this.root == root;
    }

    insert(node) {
        if (this.isEmpty()) {
            this.root = node;
        } else {
            this.insertNode(this.root, node);
        }
    }

    insertNode(node, newNode) {
        if (node.isChild(newNode)) {
            return;
        }
        if (node.isNeighbor(newNode)) {
            return;
        }
        if (node.getChildren().length === 0) {
            node.addChild(newNode);
        } else {
            node.getChildren().forEach(child => {
                this.insertNode(child, newNode);
            });
        }
    }

    remove(node) {
        if (this.isEmpty()) {
            return;
        }
        if (this.root === node) {
            this.root = null;
        } else {
            this.removeNode(this.root, node);
        }
    }

    removeNode(node, nodeToRemove) {
        if (node.isChild(nodeToRemove)) {
            node.removeChild(nodeToRemove);
        } else {
            node.getChildren().forEach(child => {
                this.removeNode(child, nodeToRemove);
            });
        }
    }

    contains(node) {
        if (this.isEmpty()) {
            return false;
        }
        if (this.root === node) {
            return true;
        } else {
            return this.containsNode(this.root, node);
        }
    }

    containsNode(node, nodeToFind) {
        if (node.isChild(nodeToFind)) {
            return true;
        } else {
            let result = false;
            node.getChildren().forEach(child => {
                result = result || this.containsNode(child, nodeToFind);
            });
            return result;
        }
    }

    traverse(node, callback) {
        if (node === null) {
            return;
        }
        callback(node);
        node.getChildren().forEach(child => {
            this.traverse(child, callback);
        });
    }

    traverseBreadthFirst(callback) {
        if (this.isEmpty()) {
            return;
        }
        const queue = [this.root];
        while (queue.length > 0) {
            const node = queue.shift();
            callback(node);
            node.getChildren().forEach(child => {
                queue.push(child);
            });
        }
    }

    traverseDepthFirst(callback) {
        if (this.isEmpty()) {
            return;
        }
        const stack = [this.root];
        while (stack.length > 0) {
            const node = stack.pop();
            callback(node);
            node.getChildren().forEach(child => {
                stack.push(child);
            });
        }
    }

    toString() {
        return this.root.toString();
    }

    print() {
        console.log(this.toString());
    }
}