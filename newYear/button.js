

export default class Button {

    constructor (id, label, callback, px, py) {
        this.id = id;
        this.callback = callback;
        this.label = label;
        this.px = px;
        this.py = py;

        this.button = null;
        this.init();
    }

    init () {
        this.button = document.createElement('button');
        this.button.id = this.id;
        this.button.innerText = this.label;

        this.button.style.position = 'absolute';
        this.button.style.left = this.px + 'px';
        this.button.style.top = this.py + 'px';

        this.button.addEventListener('click', this.callback);
    }

    render (element) {
        element.appendChild(this.button);
    }

}