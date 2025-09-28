import DOM from './DOM.js';

export default class Row {

    constructor(id, children, items = "center", content = "space-between", wrap = "wrap") {
        this.id = id;
        this.items = items;
        this.content = content;
        this.wrap = wrap;
        this.children = children;
    }

    addChild(child) {
        this.children.push(child);
        DOM.append(this.row, child.render());
    }

    init() {
        this.row = DOM.create('div', 'row');
        this.row.id = this.id;
        
        this.children.forEach(child => {
            DOM.append(this.row, child.render());
        });

        DOM.setStyles(this.row, {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: this.wrap,
            justifyContent: this.content,
            alignItems: this.items,
            width: '100%',
            height: '100%',
            paddingBottom: '40px',
        });
    }

    render() {
        this.init();
        return this.row;
    }
    
}