'use_strict';

let $;

const app = new Application();

app.addEventListener(Application.events.built, () => {
    $ = new Selector();

    SurveyReducer.init();
    (new SurveyManager()).init();
});

app.register(scripts);

app.build();