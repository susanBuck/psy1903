let jsPsych = initJsPsych();

let timeline = [];

let ageTrial = {
    type: jsPsychSurveyHtmlForm,
    preamble: '<p>How old are you?</p>',
    html: `<p><input type='text' name='age' id='age'></p>`,
    autofocus: 'age', // id of the field we want to auto-focus on when the trial starts
    button_label: 'Submit Answer',
    data: {
        collect: true,
    },
    on_finish: function (data) {
        console.log(data);
        // data.response contains an object of data for any/all inputs on our form
        // Because we only care about the response for a single form input, we narrow
        // this down to a simple data property we call "age"
        data.age = data.response.age;
    }
}
timeline.push(ageTrial);

// Debrief
let debriefTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Thank you!</h1>
    <p>You can now close this tab.</p>
    `,
    choices: ['NO KEYS'],
    on_start: function () {
        let data = jsPsych.data
            .get()
            .filter({ collect: true })
            .ignore(['response', 'stimulus', 'trial_type', 'trial_index', 'plugin_version', 'collect'])
            .csv();
        console.log(data);
    }
}
timeline.push(debriefTrial);

jsPsych.run(timeline);