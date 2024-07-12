let jsPsych = initJsPsych();

let timeline = [];

let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Welcome to the Response Time Task!</h1> 
    <p>In this experiment, you will see a blue or orange circle on the screen</p>
    <p>If you see a blue circle, press the <strong>F</strong> key.</p>
    <p>If you see a orange circle, press the <strong>J</strong> key.</p>
    <p>Press <strong>SPACE</strong> to begin.</p>
    `,
    choices: [' '],
};

timeline.push(welcomeTrial);

conditions = jsPsych.randomization.repeat(conditions, 1);

for (let condition of conditions) {

    let conditionTrial = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `
            <img src='images/${condition}-circle.png'>
            `,
        data: {
            collect: true
        },
        choices: ['f', 'j'],
    };
    timeline.push(conditionTrial);

    let fixationTrial = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `+`,
        trial_duration: 500, // 500 milliseconds = .5 seconds
        choices: 'NO KEY'
    }

    timeline.push(fixationTrial);
}

let debriefTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Thank you for participating!</h1> 
    <p>You can close this tab.</p>
    `,
    choices: 'NO_KEYS',
    on_start: function () {
        let data = jsPsych.data
            .get()
            .filter({ collect: true })
            .ignore(['stimulus', 'trial_type', 'internal_node_id', 'trial_index'])
            .csv();
        console.log(data);
    }
};

timeline.push(debriefTrial);

jsPsych.run(timeline);