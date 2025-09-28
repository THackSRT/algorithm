import DOM from './DOM.js';

export default class Section {

    constructor (id, title, ...args) {
        this.id = id;
        this.title = title;
        this.contents = args;
    }

    add (component) {
        this.contents.push(component);
        DOM.append(this.section, component.render());
    }

    render () {
        this.section = DOM.create('section', 'section');
        const title = DOM.create('h2', 'section__title', this.title);

        DOM.append(this.section, title);

        this.contents.forEach(content => {
            DOM.append(this.section, content.render());
        });

        return this.section;
    }

    static create (id, title, ...args) {
        return new Section(id, title, ...args);
    }

}