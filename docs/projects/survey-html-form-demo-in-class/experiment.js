let jsPsych = initJsPsych();

let timeline = [];

let ageTrial = {
    type: jsPsychSurveyHtmlForm,
    preamble: 'Please enter your age:',
    html: `
    <input type='text' name='age' id='age'>
    `,
    autofocus: 'age',
    button_label: 'Submit',
    data: {
        collect: true,
    },
    on_finish: function (data) {
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