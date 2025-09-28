import DOM from './views/DOM.js';

export default class Main {

    constructor () {
        this.sections = [];
        this.main = DOM.create('main', 'main');

        this.init();
    }

    init () {
        this.render();
    }

    append (section) {
        this.sections.push(section);
        DOM.append(this.main, section.render());
    }


    render () {

        this.sections.forEach(section => {
            DOM.append(this.main, section.render());
        });

        DOM.append(document.body, this.main);
    }
}