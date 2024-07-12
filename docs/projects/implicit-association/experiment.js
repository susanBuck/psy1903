// Initialize jsPsych 
let jsPsych = initJsPsych();
let timeline = [];

// Introduction
timeline.push({
    type: jsPsychHtmlKeyboardResponse,
    choices: [' '], // Listen for space key
    stimulus: `
        <h1>Welcome to the <strong>Implicit Association Task</strong></h1>
        <p>This task measures the strength of associations between concepts in your mind.</p>
        <p>Please follow the instructions carefully and try to respond as quickly and accurately as possible.</p>
        <p>You will see a series of words in the center of the screen. Your task is to sort these words into categories as quickly and accurately as you can.</p>
        <p>There will be two sets of categories, one on the left side of the screen and one on the right side.</p>
        <p>Use the <strong>F</strong> key to select the left category.</p>
        <p>Use the <strong>J</strong> key to select the right category.</p>
        <p>Press <strong>SPACE</strong> to continue...</p>
        `,
});

let counter = 1;

// Loop through the condition blocks
for (let block of conditions) {

    // Introduce the block
    timeline.push({
        type: jsPsychHtmlKeyboardResponse,
        choices: [' '], // Listen for space key
        stimulus: function () {
            return `
                <h1>Part ${counter++}</h1>
                <p>In this part the two categories will be: <strong>${block.category1}</strong> and <strong>${block.category2}</strong></p>
                <p>If the word you see in the middle of the screen should be sorted into the <strong>${block.category1}</strong> category press <strong>F</strong></p>
                <p>If the word should should be sorted into the <strong>${block.category2}</strong> category, press <strong>J</strong></p>
                <p>Press <strong>SPACE</strong> to begin...</p>
            `},
    });

    // Loop through each trial in the block
    for (let trial of block.trial) {
        timeline.push({
            type: jsPsychHtmlKeyboardResponse,
            choices: ['f', 'j'],
            stimulus: function () {
                return `
                    <div style='width:900px; padding-bottom:100px;'>
                        <div style='float:left'><strong>${block.category1} </strong> (press F)</div>
                        <div style='float:right'><strong>${block.category2} </strong> (press J)</div>
                    </div>
                    <div style="font-size:60px;">${trial.word}</div>
                    `
            },
            data: {
                collect: true,
                word: trial.word,
                category: trial.category
            },
            on_finish: function (data) {
                data.correct = (data.response == 'f' && trial.category == block.category1) || (data.response == 'j' && trial.category == block.category2)
            }
        });
    }
}

let saveTrial = {
    type: jsPsychHtmlKeyboardResponse,
    choices: ['NO KEYS'],
    async: false,
    stimulus: function () {
        return `
                <h1>Please wait...</h1>
                <span class="loader"></span>
                <p>We are saving the results of your inputs.</p>
            `;
    },
    on_start: function () {
        // Filter and retrieve results as CSV data
        let results = jsPsych.data
            .get()
            .filter({ collect: true })
            .ignore(['stimulus', 'trial_type', 'internal_node_id', 'trial_index'])
            .csv();

        let timestamp = new Date().toISOString().replace(/T/, '-').replace(/\..+/, '').replace(/:/g, '-');

        let isLocalHost = window.location.href.includes('localhost');
        isLocalHost = false;

        let destination = 'https://pipe.jspsych.org/api/data/';
        if (isLocalHost) {
            destination = '/save';
        }

        fetch(destination, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
            },
            body: JSON.stringify({
                experimentID: 'xKhpxM57Hpvh',
                filename: 'iat-' + timestamp + '.csv',
                data: results,
            }),
        }).then(data => {
            console.log(data);
            jsPsych.finishTrial();
        })
    }
}
timeline.push(saveTrial);


let debriefTrial = {
    type: jsPsychHtmlKeyboardResponse,
    choices: ['NO KEYS'],
    stimulus: function () {
        return `
                <h1>Thank You!</h1>
                <p>The experiment is now can complete; you can close this tab</p>
            `;
    }
}

timeline.push(debriefTrial);

jsPsych.run(timeline);