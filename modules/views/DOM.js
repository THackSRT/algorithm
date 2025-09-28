

export default class DOM {
    
    static get(id) {
        return document.getElementById(id);
    }
    
    static create(tag, className, innerHTML) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (innerHTML) element.innerHTML = innerHTML;
        return element;
    }

    static append(parent, ...children) {
        children.forEach(child => parent.appendChild(child));
        return parent;
    }

    static remove(element) {
        element.parentNode.removeChild(element);
    }

    static empty(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    static on(element, event, selector, handler) {
        element.addEventListener(event, e => {
            if (e.target.closest(selector)) {
                handler(e);
            }
        });
    }

    static off(element, event, handler) {
        element.removeEventListener(event, handler);
    }

    static closest(element, selector) {
        return element.closest(selector);
    }

    static getRect(element) {
        return element.getBoundingClientRect();
    }

    static getMousePos(element, event) {
        const rect = this.getRect(element);
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }

    static getScrollTop() {
        return window.scrollY || document.documentElement.scrollTop;
    }

    static getScrollBottom() {
        return document.documentElement.scrollHeight - (window.scrollY || document.documentElement.scrollTop) - window.innerHeight;
    }

    static getScrollLeft() {
        return window.scrollX || document.documentElement.scrollLeft;
    }

    static getScrollRight() {
        return document.documentElement.scrollWidth - (window.scrollX || document.documentElement.scrollLeft) - window.innerWidth;
    }

    static getOffset(element) {
        const rect = element.getBoundingClientRect();
        return {
            top: rect.top + document.body.scrollTop,
            left: rect.left + document.body.scrollLeft
        };
    }

    static getOffsetTop(element) {
        return element.getBoundingClientRect().top + document.body.scrollTop;
    }

    static getOffsetLeft(element) {
        return element.getBoundingClientRect().left + document.body.scrollLeft;
    }

    static getStyle(element, property) {
        return window.getComputedStyle(element)[property];
    }

    static setStyle(element, property, value) {
        element.style[property] = value;
    }

    static setStyles(element, styles) {
        Object.assign(element.style, styles);
    }
    
    static addId(element, id) {
        element.id = id;
    }

    static hasClass(element, className) {
        return element.classList.contains(className);
    }

    static addClass(element, className) {
        element.classList.add(className);
    }

    static removeClass(element, className) {
        element.classList.remove(className);
    }

    static toggleClass(element, className) {
        element.classList.toggle(className);
    }

    static toggleClasses(element, ...classNames) {
        classNames.forEach(className => element.classList.toggle(className));
    }

    static display(element, display) {
        element.style.display = display;
    }

    static attr(element, attr, value) {
        if (value) {
            element.setAttribute(attr, value);
        } else {
            return element.getAttribute(attr);
        }
    }

    static removeAttr(element, attr) {
        element.removeAttribute(attr);
    }

    static data(element, attr, value) {
        return this.attr(element, 'data-' + attr, value);
    }

    static removeData(element, attr) {
        this.removeAttr(element, 'data-' + attr);
    }
}