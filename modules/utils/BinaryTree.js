import TreeNode from "./TreeNode.js";


class BinaryTreeNode extends TreeNode {
    constructor(data) {
        super(data);
        this.children = [];
    }

    addChild(child) {
        if (this.children.length === 2) {
            throw new Error('Binary Tree Node can have only two children');
        }
        super.addChild(child);
    }

    removeChild(child) {
        if (this.children.length === 0) {
            throw new Error('Binary Tree Node has no children');
        }
        super.removeChild(child);
    }

    getLeft() {
        return this.getChildren()[0];
    }

    getRight() {
        return this.getChildren()[1];
    }

    getData() {
        return this.data;
    }

    prefixTraverse(callback, array) {
        let newArray = array || [];
        newArray.push(this.data);

        if (callback) callback(newArray);

        if (this.getLeft()) {
            this.getLeft().prefixTraverse(callback, newArray);
        }

        if (this.getRight()) {
            this.getRight().prefixTraverse(callback, newArray);
        }
    }

    infixTraverse(callback, array) {
        let newArray = array || [];

        if (this.getLeft()) {
            this.getLeft().infixTraverse(callback, newArray);
        }
        
        newArray.push(this.data);
        if (callback) callback(newArray);

        if (this.getRight()) {
            this.getRight().infixTraverse(callback, newArray);
        }
    }

    postfixTraverse(callback, array) {
        let newArray = array || [];

        if (this.getLeft()) {
            this.getLeft().postfixTraverse(callback, newArray);
        }

        if (this.getRight()) {
            this.getRight().postfixTraverse(callback, newArray);
        }
        
        newArray.push(this.data);
        if (callback) callback(newArray);
    }
}

export default class BinaryTree {

    constructor(data) {
        this.root = new BinaryTreeNode(data);
    }

    insert(data) {
        const newNode = new BinaryTreeNode(data);
        if (!this.root.getData()) {
            this.root = newNode;
            return;
        }
        let currentNode = this.root;
        while (currentNode) {
            if (data < currentNode.getData()) {
                if (!currentNode.getLeft()) {
                    currentNode.addChild(newNode);
                    return;
                }
                currentNode = currentNode.getLeft();
            } else {
                if (!currentNode.getRight()) {
                    currentNode.addChild(newNode);
                    return;
                }
                currentNode = currentNode.getRight();
            }
        }
    }

    addChild(child) {
        this.root.addChild(child);
    }

    getRoot() {
        return this.root;
    }

    setRoot(root) {
        this.root = root;
    }

    prefixTraverse(callback) {
        this.root.prefixTraverse(callback);
    }

    infixTraverse(callback) {
        this.root.infixTraverse(callback);
    }

    postfixTraverse(callback) {
        this.root.postfixTraverse(callback);
    }

    traverse() {
        console.log('Prefix Traverse');
        this.prefixTraverse((array) => {
            console.log(array[array.length - 1]);
        });
        console.log('Infix Traverse');
        this.infixTraverse((array) => {
            console.log(array[array.length - 1]);
        });
        console.log('Postfix Traverse');
        this.postfixTraverse((array) => {
            console.log(array[array.length - 1]);
        });
    }

}