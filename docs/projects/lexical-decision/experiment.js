let jsPsych = initJsPsych();

let timeline = [];

// Welcome
let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Welcome to the Lexical Decision Task</h1>
    <p>You are about to see a series of characters.</p>
    <p>Press F if the characters make up a word.</p>
    <p>Press J if the characters do not make up a word.</p>
    <p>Press SPACE to begin</p>
    `,
    choices: [' ']
};
timeline.push(welcomeTrial);

// Show word or pseudo word (on repeat)
// Create an array of conditions
let conditions = [
    { characters: 'cat', isWord: true },
    { characters: 'pin', isWord: true },
    { characters: 'jgb', isWord: false },
    { characters: 'mub', isWord: false },
];

// Shuffle the conditions
conditions = jsPsych.randomization.repeat(conditions, 1);
//console.log(conditions);

for (let condition of conditions) {
    let conditionTrial = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `<h1>${condition.characters}</h1>`,
        choices: ['f', 'j'],
        data: {
            collect: true,
            characters: condition.characters,
        },
        on_finish: function (data) {
            if (data.response == 'f' && condition.isWord == true) {
                data.correct = true;
            } else if (data.response == 'j' && condition.isWord == false) {
                data.correct = true;
            } else {
                data.correct = false;
            }
        }
    }
    timeline.push(conditionTrial);
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
