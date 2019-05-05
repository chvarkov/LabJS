/**
 *
 */
class SurveyManager {

    /**
     * Actions
     */

    init() {
        this.renew();
        this.showQuestionList();

        // Set actions

        $.get('#btn-next').event('click', () => this.next());
        $.get('#btn-prev').event('click', () => this.prev());
        $.get('#btn-end').event('click', () => this.end());
    }

    /**
     * @param {number} index
     */
    select(index) {
        app.mutate(SurveyReducer.mutations.select, index)
            .then((state) => {
                this.showQuestion(state.current);
                this.markSelected(state.current);
            })
            .catch((state) => {
                console.log(state);
                console.log('Internal error. Mutation `select` is not committed.');
            });
    }

    /**
     *
     * @param {string|number} answerKey
     */
    answer(answerKey) {
        app.mutate(SurveyReducer.mutations.answer, answerKey)
            .then((state) => {
                this.markAnswered(state.current);
                this.next();
            })
            .catch((state) => {
                console.log(state);
                console.log('Internal error. Mutation `answer` is not committed.');
            });
    }

    next() {
        app.mutate(SurveyReducer.mutations.next)
            .then((state) => {
                this.showQuestion(state.current);
            })
            .catch((state) => {
                console.log(state);
                console.log('Internal error. Mutation `next` is not committed.');
            });
    }

    prev() {
        app.mutate(SurveyReducer.mutations.prev)
            .then((state) => {
                this.showQuestion(state.current);
            })
            .catch((state) => {
                console.log(state);
                console.log('Internal error. Mutation `prev` is not committed.');
            });
    }

    renew() {
        app.mutate(SurveyReducer.mutations.renew)
            .then((state) => {
                this.destroySurvey();
                this.showQuestion(state.current);
            })
            .catch((state) => {
                console.log(state);
                console.log('Internal error. Mutation `start` is not committed.');
            });
    }

    end() {
        const allQuestions = app.state.countQuestions;
        const allPoints = app.state.allWeight;

        let rightQuestions = 0;
        let currentPoints = 0;

        app.state.answers.forEach((answer, index) => {
            if (app.state.questions[index].required === answer) {
                rightQuestions++;
                currentPoints += app.state.questions[index].weight;
            }
        });

        alert(`The end. \n All ${allQuestions} questions and ${allPoints} points. \n You answered right on ${rightQuestions} and collect ${currentPoints} points.`);

        this.renew();
    }

    /**
     * Render methods
     */

    /**
     * @param {number} index
     */
    showQuestion(index) {

        const question = app.state.questions[index];

        $.get('#question .text').first().text(question.text);

        const context = $.get('#question').first();

        context.get('button.choice').clear();

        Object.keys(question.choices).forEach((key) => {
            context
                .create('button')
                .attr('class', 'choice')
                .attr('data', key)
                .text(question.choices[key])
                .event('click', (event) => {
                    this.answer((new Element(event.target)).attr('data'));
                });
        });

        if (undefined !== app.state.answers[index]) {
            context.get('.choice').prop('disabled', true);
        }

        this.markSelected(index);
    }

    showQuestionList() {
        const questions = app.state.questions;

        const context = $.get('.questions-wrapper').first();

        questions.forEach((question, index) => {
            context.render('question-item');

            const item = context.get('.question-item').last();
            const text = question.text.length > 25 ? `${question.text.slice(0, 22)}...` : question.text;

            item.get('span').first()
                .text(`${index + 1}. ${text}`)
                .attr('data', index);

            item
                .attr('data', index)
                .event('click', (event) => {
                    this.select(+(new Element(event.target)).attr('data'));
                });

            context.get('.question-status').addClass('not-answered')
        });
    }

    /**
     * @param {number} index
     */
    markAnswered(index) {
        $.get('.question-item')
            .where(e => +e.attr('data') === index).first()
            .get('.question-status')
            .removeClass('not-answered')
            .addClass('answered');
    }

    /**
     * @param {number} index
     */
    markSelected(index) {
        $.get('.question-item')
            .removeClass('question-selected')
            .where(e => +e.attr('data') === index)
            .addClass('question-selected');
    }

    destroySurvey() {
        $.get('.question-item .answered')
            .removeClass('answered')
            .addClass('not-answered');

        $.get('.question-item .question-selected')
            .removeClass('question-selected');
    }
}