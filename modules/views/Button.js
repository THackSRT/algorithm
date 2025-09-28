import DOM from './DOM.js';

export default class Button {

    constructor (id, content, callback) {
        this.id = id;
        this.content = content;

        this.callback = callback;

        this.init();
    }

    init() {
        this.button = DOM.create('button', 'button', this.content);
        this.button.id = this.id;
    }

    onClick () {
        this.button.addEventListener('click', this.callback, false);
    }

    offClick () {
        this.button.removeEventListener('click', this.callback, false);
    }

    render () {
        this.onClick();

        return this.button;
    }

    static create (id, content) {
        return new Button(id, content);
    }
}