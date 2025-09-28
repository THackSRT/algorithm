

import BinaryTree from "./modules/utils/BinaryTree.js";

let tree = new BinaryTree(10);

const node = new BinaryTree(11);
const node2 = new BinaryTree(2);
const node3 = new BinaryTree(32);
const node4 = new BinaryTree(14);
const node5 = new BinaryTree(25);
const node6 = new BinaryTree(67);
const node7 = new BinaryTree(17);


tree.root.addChild(node);
tree.root.addChild(node2);
node.addChild(node3);
node.addChild(node4);
node2.addChild(node5);
node2.addChild(node6);
node3.addChild(node7);

tree.traverse();

console.log('count elements in tree');
let res = 0;

tree.prefixTraverse((array) => {
    res += array.length;
});
console.log(res);

console.log('max element in tree');
let max = 0;

tree.prefixTraverse((array) => {
    if (array[array.length - 1] > max) {
        max = array[array.length - 1];
    }
});
console.log(max);

console.log('min element in tree');
let min = 0;

tree.prefixTraverse((array) => {
    if (array[array.length - 1] < min) {
        min = array[array.length - 1];
    }
});
console.log(min);