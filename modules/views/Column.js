import DOM from "./DOM.js";


export default class Column {

    constructor(id, children, items = "flex-start", content = "space-between", wrap = "wrap") {
        this.id = id;
        this.items = items;
        this.content = content;
        this.wrap = wrap;
        this.children = children;
    }

    addChild(child) {
        this.children.push(child);
        DOM.append(this.column, child.render());
    }

    init() {
        this.column = DOM.create('div', 'column');
        this.column.id = this.id;

        this.children.forEach(child => {
            DOM.append(this.column, child.render());
        });

        DOM.setStyles(this.column, {
            display: 'flex',
            flexDirection: 'column',
            flexWrap: this.wrap,
            justifyContent: this.content,
            alignItems: this.items,
            width: '100%',
            height: '100%',
        });
    }

    render() {
        this.init();
        return this.column;
    }
    
}