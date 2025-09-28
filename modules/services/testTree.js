let nbInputs = 2;
let inputs = Array(nbInputs).fill().map(() => Math.random());
let nbHidden = 3;
let nbOutput = 1;

let root = new TreeNode(inputs);
let tree = new Tree();
tree.setRoot(root);

let hiddenNodes = Array(nbHidden).fill().map(
    () => new TreeNode(new Perceptron(nbInputs, 0.1))
);
hiddenNodes.forEach(node => {
    root.addChild(node);
});

let outputNodes = Array(nbOutput).fill().map(
    () => new TreeNode(new Perceptron(nbHidden, 0.1))
);
outputNodes.forEach(node => {
    hiddenNodes.forEach(hiddenNode => {
        hiddenNode.addChild(node);
    });
});


tree.traverseDepthFirst(node => {
    console.log(node.toString());
});