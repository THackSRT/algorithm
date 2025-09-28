import DOM from './DOM.js';

export default class Text {

    constructor (id, content) {
        this.id = id;
        this.content = content;
    }

    render () {
        const text = DOM.create('p', 'text', this.content);

        return text;
    }

    static create (id, content) {
        return new Text(id, content);
    }
}