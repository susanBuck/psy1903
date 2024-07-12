let jsPsych = initJsPsych();

let timeline = [];

let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Welcome to the Lexical Decision Task!</h1> 

    <p>In this experiment, you will be shown a series of characters and asked to categorize whether the characters make up a word or not.</p>
    <p>There are three parts to this experiment.</p>
    <p>Press <strong>SPACE</strong> to begin the first part.</p>
    `,
    choices: [' '],
};

timeline.push(welcomeTrial);

for (let block of conditions) {

    let blockIntroTrial = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `
            <h1>${block.title}</h1>
            <p>You are about to see a series of ${block.count} characters.</p>
            <p> If the characters make up a word, press the <strong>F</strong> key.</p>
            <p>If the characters do not make up a word, press the <strong>J</strong> key.</p>
            <p>Press <strong>SPACE</strong> to begin.</p>
            `,
        choices: [' '],
    };

    timeline.push(blockIntroTrial);

    // Randomize the conditions in this block
    conditions = jsPsych.randomization.repeat(block.conditions, 1);

    for (let condition of conditions) {
        let conditionTrial = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: condition.characters,
            data: {
                collect: true,
            },
            keys: ['f', 'j'],
            on_finish: function (data) {
                if (data.response == 'f' && condition.isWord) {
                    data.correct = true;
                    // The following line uses the ! operator which can be used to determine if a value evaluates to false
                } else if (data.response == 'j' && !condition.isWord) {
                    data.correct = true;
                } else {
                    data.correct = false;
                }
            }
        }
        timeline.push(conditionTrial);
    }
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