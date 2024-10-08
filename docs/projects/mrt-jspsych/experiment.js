let jsPsych = initJsPsych();

let timeline = [];

// Welcome
let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Welcome to the Math Response Time Task</h1>
    <p>In this experiment, you will be shown a series of math questions.</p>
    <p>Please answer as quickly and accurately as possible.</p>
    <p>Press SPACE to begin.</p>
    `,
    choices: [' ']
};
timeline.push(welcomeTrial);

// Conditions
for (let condition of conditions) {

    let trial = {
        type: jsPsychSurveyHtmlForm,
        preamble: `<p>What is ${condition.num1} + ${condition.num2}?</p>`,
        html: `<p><input name='responseInput' id='response' type='text'></p>`,
        autofocus: 'response',
        button_label: 'Submit Answer',
        data: {
            collect: true,
        },
        on_finish: function (data) {
            data.response = data.response.responseInput;
            data.correct = condition.answer == data.response;
            data.num1 = condition.num1;
            data.num2 = condition.num2;
            data.answer = condition.answer;
        }
    }
    timeline.push(trial);
}

// Debrief
let debriefTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Thank you!</h1>
    <p>You can now close this tab</p>
    `,
    choices: ['NO KEYS'],
    on_start: function () {
        let data = jsPsych.data
            .get()
            .filter({ collect: true })
            .ignore(['stimulus', 'trial_type', 'trial_index', 'plugin_version', 'collect'])
            .csv();
        console.log(data);
    }
}
timeline.push(debriefTrial);


jsPsych.run(timeline);



