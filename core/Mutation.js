/**
 * Entity for manage states that used only with execute mutations.
 * For return changed state need call method @see Mutation.commit.
 * For revert changes need call @see Mutation.rollback.
 * If mutation not committed then  mutation changes will reject.
 */
class Mutation {

    /**
     * Return true if mutation is committed.
     *
     * @return {boolean}
     */
    get committed() {
        return this._commited;
    }

    /**
     * Returns current state of application or changed committed.
     *
     * @return {State}
     */
    get state() {
        return this._commited ? this._finalState : this._currentState;
    }

    /**
     * @param {State} state
     */
    constructor(state) {
        this._previousState = Object.assign(new State(), state);
        this._currentState = Object.assign(new State(), state);
        this._finalState = Object.assign(new State(), state);
        this._commited = false;
    }

    /**
     * Commit changes of mutation. Expected call resolve.
     */
    commit() {
        this._commited = true;
        this._finalState = Object.assign(new State(), this._currentState);
    }

    /**
     * Rollback changes of mutation. Expected call reject.
     */
    rollback() {
        this._commited = false;
        this._currentState = Object.assign(new State(), this._previousState);
        this._finalState = Object.assign(new State(), this._previousState);
    }
}