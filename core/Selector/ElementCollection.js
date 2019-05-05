/**
 * Collection class for grouping selected items
 * type of Element.
 */
class ElementCollection {

    /**
     * @constructor
     * @param {Array} elements
     */
    constructor(elements) {
        this.elements = [];

        if (Array.isArray(elements)) {
            elements.forEach(e => this.elements.push(e));
        }
    }

    /**
     * Gets as array of elements.
     *
     * @return {Array}
     */
    toArray() {
        return this.elements;
    }

    /**
     * Gets first element of collection.
     *
     * @return {Element|null}
     */
    first() {
        return this.count() ? this.elements[0] : null;
    }

    /**
     * Gets last element of collection.
     *
     * @return {Element|null}
     */
    last() {
        return this.count() ? this.elements[this.count() - 1] : null;
    }

    /**
     * Return count elements of collection.
     *
     * @return {number}
     */
    count() {
        return this.elements.length;
    }

    /**
     * Returns only those if callback return true
     * when iterable elements for this selection.
     *
     * @param {function} callback
     * @return {ElementCollection}
     */
    where(callback) {

        const selection = new ElementCollection([]);

        this.elements.forEach((e) => {
            if (callback(e)) {
                selection.add(e);
            }
        });

        return selection;
    }

    /**
     * @param element
     * @return {ElementCollection}
     */
    add(element) {
        if (element instanceof Element) {
            this.elements.push(element);
        }

        return this;
    }

    /**
     * @param element
     * @return {ElementCollection}
     */
    remove(element) {
        this.elements.forEach((e) => {
            if (e.compare(element)) {
                e.remove();
            }
        });

        return this;
    }

    /**
     * Hides all elements of collection.
     *
     * @return {ElementCollection}
     */
    hide() {
        this.elements.forEach(e => e.hide());

        return this;
    }

    /**
     * Shows all elements of collection.
     *
     * @return {ElementCollection}
     */
    show() {
        this.elements.forEach(e => e.show());

        return this;
    }

    /**
     * Sets attribute for all elements of collection.
     *
     * @param {string} name
     * @param {string|number|boolean} value
     * @return {ElementCollection}
     */
    attr(name, value) {
        this.elements.forEach(e => e.attr(name, value));

        return this;
    }

    /**
     * Sets CSS property for all elements of collection.
     *
     * @param {string} property
     * @param {string|number|boolean} value
     * @return {ElementCollection}
     */
    css(property, value) {
        this.elements.forEach(e => e.css(property, value));

        return this;
    }

    /**
     * Sets property for all elements of collection.
     *
     * @param property
     * @param value
     * @return {ElementCollection}
     */
    prop(property, value) {
        this.elements.forEach(e => e.prop(property, value));

        return this;
    }

    /**
     * Add class for all elements of collection.
     *
     * @param {string} name
     * @return {ElementCollection}
     */
    addClass(name) {
        this.elements.forEach(e => e.addClass(name));

        return this;
    }

    /**
     * Add class for all elements of collection.
     *
     * @param {string} name
     * @return {ElementCollection}
     */
    removeClass(name) {
        this.elements.forEach(e => e.removeClass(name));

        return this;
    }

    /**
     * Set event listener for all elements of collection.
     *
     * @param name
     * @param handler
     * @return {ElementCollection}
     */
    event(name, handler) {
        this.elements.forEach(e => e.event(name, handler));

        return this;
    }

    /**
     * Drops all elements of collection from DOM.
     */
    clear() {
        this.elements.forEach(e => e.remove());
    }
}
