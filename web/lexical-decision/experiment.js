let jsPsych = initJsPsych({
    show_progress_bar: true
});

let timeline = [];


// Retrieve the query string from the URL
let queryString = new URLSearchParams(window.location.search);

// Extract the value for qualtricsId from the query string
let qualtricsId = queryString.get('qualtricsId');

// Persist the value for qualtricsId to your experiment data
jsPsych.data.addProperties({ qualtricsId: qualtricsId });



// Welcome
let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Welcome to the Lexical Decision Task...</h1> 
    <p>In this experiment, you will be shown a series of characters and asked to categorize whether the characters make up a word or not.</p>
    <p>There are three parts to this experiment.</p>
    <p>Press <span class='key'>SPACE</span> to begin the first part.</p>
    `,
    choices: [' '],
};
timeline.push(welcomeTrial);


let primeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <p>You were randomly chosen to see this trial.</p> 
        <p>Press the <span class='key'>SPACE</span> key to continue.</p>
        `,
    choices: [' '],
    data: {
        collect: true,
        trialType: 'prime',
    },
    on_load: function () {
        if (getRandomNumber(0, 1) == 0) {
            jsPsych.data.addProperties({ sawPrime: false });
            jsPsych.finishTrial();
        } else {
            jsPsych.data.addProperties({ sawPrime: true });
        }
    }
}
timeline.push(primeTrial);


// Conditions
for (let block of conditions) {

    let blockConditions = jsPsych.randomization.repeat(block.conditions, 1);

    let blockIntroTrial = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `
            <h1>${block.title}</h1>
            <p>You are about to see a series of ${block.count} characters.</p>
            <p>If the characters make up a word, press the <span class='key'>F</span> key.</p>
            <p>If the characters do not make up a word, press the <span class='key'>J</span> key.</p>
            <p>Press <span class='key'>SPACE</span> to begin.</p>
            `,
        choices: [' '],
    };

    timeline.push(blockIntroTrial);

    for (let condition of blockConditions) {
        let conditionTrial = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: `<h1>${condition.characters}</h1>`,
            choices: ['f', 'j'],
            data: {
                trialType: 'mainTrials',
                collect: true,
                characters: condition.characters,
                blockId: block.title,
            },
            on_finish: function (data) {
                if (data.response == 'f' && condition.isWord) {
                    data.correct = true;
                } else if (data.response == 'j' && condition.isWord == false) {
                    data.correct = true;
                } else {
                    data.correct = false;
                }
            }
        }
        timeline.push(conditionTrial);


        let feedbackTrial = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: `<h1 class='incorrectFeedback'>Incorrect</h1>`,
            trial_duration: 2000,
            choices: ['NO KEY'],
            on_load: function () {
                let lastTrialData = jsPsych.data.getLastTrialData().values()[0];
                if (lastTrialData.correct) {
                    // Force skip this feedback trial if they got the previous trial correct
                    jsPsych.finishTrial();
                }
            },
        }
        timeline.push(feedbackTrial);
    }
}

let resultsTrial = {
    type: jsPsychHtmlKeyboardResponse,
    choices: ['NO KEYS'],
    async: false,
    stimulus: `
        <h1>Please wait...</h1>
        <span class='loader'></span>
        <p>We are saving the results of your inputs.</p>
        `,
    on_start: function () {
        //  ⭐ Update the following three values as appropriate ⭐
        let prefix = 'lexical-decision';
        let dataPipeExperimentId = 'um0slxQiDwlS';
        let forceOSFSave = false;

        // Filter and retrieve results as CSV data
        let results = jsPsych.data
            .get()
            .filter({ collect: true })
            .ignore(['stimulus', 'trial_type', 'plugin_version', 'collect'])
            .csv();

        console.log(results);

        // Generate a participant ID based on the current timestamp
        let participantId = new Date().toISOString().replace(/T/, '-').replace(/\..+/, '').replace(/:/g, '-');

        // Dynamically determine if the experiment is currently running locally or on production
        let isLocalHost = window.location.href.includes('localhost');

        let destination = '/save';
        if (!isLocalHost || forceOSFSave) {
            destination = 'https://pipe.jspsych.org/api/data/';
        }

        // Send the results to our saving end point
        fetch(destination, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
            },
            body: JSON.stringify({
                experimentID: dataPipeExperimentId,
                filename: prefix + '-' + participantId + '.csv',
                data: results,
            }),
        }).then(data => {
            console.log(data);
            jsPsych.finishTrial();
        })
    }
}
timeline.push(resultsTrial);


let debriefTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<h1>Thank you!</h1>
    <p>You can now close this tab</p>`,
    choices: ['NO KEYS'],
    on_start: function () {
        jsPsych.progressBar.progress = 1;
    }
}

timeline.push(debriefTrial);

jsPsych.run(timeline);


function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}