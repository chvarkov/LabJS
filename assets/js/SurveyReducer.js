class SurveyReducer {

    /**
     * @return {{
     *      next: number,
     *      select: number,
     *      answer: number,
     *      prev: number,
     *      renew: number
     * }}
     */
    static get mutations() {
        return {
            select: 0,
            answer: 1,
            next: 2,
            prev: 3,
            renew: 4
        };
    }

    /**
     * Set initial state and add mutations.
     */
    static init() {
        app
            .setState((new State()).setQuestions(questions))
            .addMutation(SurveyReducer.mutations.select, SurveyReducer.mutateSelect)
            .addMutation(SurveyReducer.mutations.answer, SurveyReducer.mutateAnswer)
            .addMutation(SurveyReducer.mutations.next, SurveyReducer.mutateNext)
            .addMutation(SurveyReducer.mutations.prev, SurveyReducer.mutatePrev)
            .addMutation(SurveyReducer.mutations.renew, SurveyReducer.mutateRenew);
    }

    /**
     * Mutations
     */

    /**
     * @param {Mutation} mutation
     * @param {number} answerKey
     */
    static mutateAnswer(mutation, answerKey) {
        mutation.state.answers[mutation.state.current] = answerKey;

        mutation.commit();
    }

    /**
     * @param {Mutation} mutation
     * @param {number} index
     */
    static mutateSelect(mutation, index) {
        index = +index;
        if (index < 0 || index > mutation.state.countQuestions - 1 ) {
            mutation.rollback();
        }

        mutation.state.current = index;

        mutation.commit();
    }

    /**
     * @param {Mutation} mutation
     */
    static mutateNext(mutation) {
        if (mutation.state.current < mutation.state.countQuestions - 1) {
            mutation.state.current++;
        }

        mutation.commit();
    }

    /**
     * @param {Mutation} mutation
     */
    static mutatePrev(mutation) {
        if (mutation.state.current > 0) {
            mutation.state.current--;
        }

        mutation.commit();
    }

    /**
     * @param {Mutation} mutation
     */
    static mutateRenew(mutation) {
        mutation.state.questions = questions;
        mutation.state.answers = [];
        mutation.state.current = 0;

        mutation.commit();
    }
}