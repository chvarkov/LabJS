/**
 * This class of base element of DOM for selection.
 *
 * @see ElementCollection
 * @see Selector
 */
class Element {

    /**
     * @constructor
     * @param {HTMLElement|Node} element
     */
    constructor(element) {
        this.element = element;
        this.selector = new Selector(this.element);
    }

    /**
     * Gets collection of elements by given
     * selector in context this element.
     *
     * @param {string} selector
     * @return {ElementCollection}
     */
    get(selector) {
        return this.selector.get(selector);
    }

    /**
     * Gets html that contains element.
     *
     * @return {string}
     */
    get html() {
        return this.element.innerHTML;
    }

    /**
     * Gets text that contains element.
     *
     * @return {string|Element}
     */
    text(text = undefined) {
        if (undefined === text) {
            return this.element.innerText;
        }

        this.element.innerText = text;

        return this;
    }

    /**
     * Gets attribute of element by name.
     * If given argument of value then sets
     * this value into attribute and returns
     * itself.
     *
     * @param {string} name
     * @param {string|number|boolean|undefined} value
     * @return {string|Element}
     */
    attr(name, value = undefined) {

        if (undefined === value) {
            return this.element.getAttribute(name);
        }

        this.element.setAttribute(name, value);

        return this;
    }

    /**
     * Gets value of property CSS.
     * If given argument of value then sets
     * this value into CSS property and
     * returns itself.
     *
     * @param {string} property
     * @param {string} value
     * @return {string|Element}
     */
    css(property, value = undefined) {
        if (undefined === value) {
            return this.element.style[property];
        }

        this.element.style[property] = value;

        return this;
    }

    /**
     * Gets property of element.
     * If given argument of value then sets
     * this value into property and returns
     * itself.
     *
     * @param {string} property
     * @param {string} value
     * @return {string|Element}
     */
    prop(property, value = undefined) {
        if (undefined === value) {
            return this.element.style[property];
        }

        this.element[property] = value;

        return this;
    }

    /**
     * Add CSS class to element.
     *
     * @param {string} name
     */
    addClass(name) {
        this.element.classList.add(name);
    }

    /**
     * Remove CSS class to element.
     *
     * @param {string} name
     */
    removeClass(name) {
        this.element.classList.remove(name);
    }

    /**
     * Compare element.
     * Returns true if elements is equals.
     *
     * @param {Element} element
     * @return {boolean}
     */
    compare(element) {
        return this.element.isEqualNode(element.element);
    }

    /**
     * Removes this element from DOM.
     *
     * @return {Element}
     */
    remove() {
        this.element.parentElement.removeChild(this.element);

        return this;
    }

    /**
     * Creates new element tag of argument and
     * sets it as child element for this.
     *
     * @param {string} tagName
     * @return {Element}
     */
    create(tagName) {
        const element = document.createElement(tagName);
        this.element.appendChild(element);

        return new Element(element);
    }

    /**
     * Renders template with given name.
     *
     * @param {string} name
     * @return {Element}
     */
    render(name) {
        this.selector.render(name);

        return this;
    }

    /**
     * Append element to child elements.
     *
     * @param {Element} element
     * @return {Element}
     */
    append(element) {
        this.element.appendChild(element.element);

        return this;
    }

    /**
     * Clone. Return duplicate.
     *
     * @return {Element}
     */
    clone() {
        return new Element(this.element.cloneNode(true));
    }

    /**
     * Adds event listener by event name.
     *
     * @param {string} name
     * @param {function} handler
     * @return {Element}
     */
    event(name, handler) {
        this.element.addEventListener(name, handler);

        return this;
    }
}
