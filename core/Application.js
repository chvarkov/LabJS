/**
 * Class for manage of application.
 */
class Application {

    /**
     * @return {{built: number, stated: number}}
     */
    static get events() {
        return {
            built: 0,
            stated: 1,
        }
    }

    /**
     * Gets current state of application.
     */
    get state() {
        return Object.create(this._state);
    }

    /**
     * Sets initialized state.
     *
     * @param {State|{}} state
     */
    constructor(state = {}) {
        this._state = state || {};
        this._mutations = {};
        this._listeners = [];
        this._scripts = [];
    }

    /**
     * Sets array of paths to scripts that need load.
     *
     * @param {Array<String>} sources
     * @return {Application}
     */
    register(sources) {
        if (Array.isArray(sources)) {
            this._scripts = this._scripts.concat(sources)
        }

        return this;
    }

    /**
     * Adds event listener.
     *
     * @param {number} event
     * @param {function} handler
     * @return {Application}
     */
    addEventListener(event, handler) {
        if (undefined === this._listeners[event]) {
            this._listeners[event] = [];
        }

        this._listeners[event].push(handler);

        return this;
    }

    /**
     * Calls event.
     * @see Application.events
     *
     * @param {number} event
     * @return {Application}
     */
    dispatch(event) {
        if (undefined === this._listeners[event]) {
            return this;
        }

        this._listeners[event].forEach(handler => handler());

        return this;
    }

    /**
     * Loads script.
     *
     * @param {string} src
     * @return {Promise<null>}
     */
    require(src) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = src;

        return new Promise((resolve) => {
            script.onload = () => {
                resolve();
            };

            document.head.appendChild(script);
        });
    }

    /**
     * Loads all registered scripts.
     *
     * @return {Application}
     */
    build() {
        if (this._scripts.length === 0) {
            return this;
        }

        const resolver = () => {
            const src = this._scripts.shift();
            if (src === undefined) {
                this.dispatch(Application.events.built);

                return;
            }

            this.require(src)
                .then(resolver)
                .catch(error => console.log(error));
        };

        resolver();

        return this;
    }

    /**
     * Sets state of application.
     *
     * @param state
     * @return {Application}
     */
    setState(state) {
        this._state = state;

        return this;
    }

    /**
     * Adds handler of mutation.
     * Required argument must me type of @see Mutation.
     *
     * @param name
     * @param handler
     * @return {Application}
     */
    addMutation(name, handler) {
        this._mutations[name] = handler;

        return this;
    }

    /**
     * Call mutation.
     *
     * @param name
     * @return {Promise<State>}
     */
    mutate(name) {
        const args = Array.prototype.slice.call(arguments, 1);

        return new Promise((commit, rollback) => {
            const callback = this._mutations[name];
            const mutation = new Mutation(this._state);

            callback.apply(null, [mutation].concat(args));

            this._state = mutation.state;

            mutation.committed ? commit(this.state) : rollback(this.state);
        });
    }
}
