/**
 * Selector.js - helper for selection and manipulation
 * of DOM-elements.
 *
 * Principle of operation as in jQuery.
 */

class Selector {

    /**
     * @param {HTMLElement|Document} context
     */
    constructor(context = document) {
        this.context = context;
    }

    /**
     * @param {string} selector
     * @return {ElementCollection}
     */
    get(selector) {
        const elements = this.context.querySelectorAll(selector);
        const collection = [];

        if (elements instanceof HTMLElement) {
            collection.push(new Element(elements));
        }

        if (elements instanceof NodeList) {
            elements.forEach(e => collection.push(new Element(e)));
        }

        return new ElementCollection(collection);
    }

    /**
     * @param {string} tagName
     * @return {Element}
     */
    create(tagName) {
        const element = document.createElement(tagName);
        document.body.appendChild(element);

        return new Element(element);
    }

    /**
     * @param {string} name
     * @return {Selector}
     */
    render(name) {
        const template = document.querySelector(`template#${name}`);
        const clonedNode = template.content.cloneNode(true);

        this.context.appendChild(clonedNode);

        return this;
    }
}
