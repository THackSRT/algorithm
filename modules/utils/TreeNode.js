
export default class TreeNode {

    constructor(data) {
        this.data = data;
        this.children = [];
    }

    addChild(node) {
        this.children.push(node);
    }

    removeChild(node) {
        const index = this.children.indexOf(node);
        if (index > -1) {
            this.children.splice(index, 1);
        }
    }

    getChildren() {
        return this.children;
    }

    getData() {
        return this.data;
    }

    isChild(node) {
        return this.children.indexOf(node) > -1;
    }

    toString() {
        return this.data.toString();
    }
}