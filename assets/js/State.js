/**
 * Entity of state application.
 * Contains data and methods for manipulation it's.
 */
class State {

    /**
     * @constructor
     */
    constructor() {
        this.current = 0;
        this.questions = [];
        this.answers = [];
    }

    /**
     * @return {number}
     */
    get allWeight() {
        let weight = 0;

        this.questions.forEach(question => weight += question.weight);

        return weight;
    }

    /**
     * @return {number}
     */
    get countQuestions() {
        return this.questions.length;
    }

    /**
     * @param {Array} questions
     * @return {State}
     */
    setQuestions(questions) {
        this.questions = questions;

        return this;
    }
}