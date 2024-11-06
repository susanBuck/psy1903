let jsPsych = initJsPsych({
    show_progress_bar: true
});

let timeline = [];

// Generate a participant ID based on the current timestamp
let participantId = getCurrentTimestamp();

let queryString = new URLSearchParams(window.location.search);
let qualtricsId = queryString.get('qualtricsId');
console.log(qualtricsId);
jsPsych.data.addProperties({ qualtricsId: qualtricsId });


let ageCheckTrial = {
    type: jsPsychSurveyHtmlForm,
    html: `
    <h1>Welcome!</h1> 
    Please enter your age to continue: <input type='text' name='age' id='age'>
    `,
    on_finish: function (data) {
        if (data.response.age < 18) {
            jsPsych.abortExperiment('You must be 18 years or older to complete this experiment.');
        }
    }
}
timeline.push(ageCheckTrial);


/**
 * Welcome
 */
let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1 class='instructions'>Welcome to the Lexical Decision Task</h1>
    <p>In this experiment, you will be shown a series of characters and asked to categorize whether the characters make up a word or not.</p>
    <p>There are three parts to this experiment.</p>
    <p class='instructions'>Press <span class='key'>SPACE</span> to begin the first part.</p>
    `,
    choices: [' ']
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


/**
 * Condition trials
 */
for (let block of conditions) {

    let blockConditions = jsPsych.randomization.repeat(block.conditions, 1);

    let blockIntroTrial = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `
            <h1>${block.title}</h1>
            <p>You are about to see a series of ${block.count} characters.</p>
            <p>If the characters make up a word, press the <span class='key'>F</span> key.</p>
            <p>If the characters do not make up a word, press the <span class='key'>J</span> key.</p>
            <p>Press the <span class='key'>SPACE</span> key to begin.</p>
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
                collect: true,
                characters: condition.characters,
                blockId: block.title
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

        let feedbackTrial = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: `<h1>Incorrect</h1>`,
            trial_duration: 1000,
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



/**
 * Results
 */
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
        let dataPipeExperimentId = 'xGrIMXyGYhic';
        let forceOSFSave = false;

        // Filter and retrieve results as CSV data
        let results = jsPsych.data
            .get()
            .filter({ collect: true })
            .ignore(['stimulus', 'trial_type', 'plugin_version', 'collect'])
            .csv();

        console.log(results);

        let fileName = prefix + '-' + participantId + '.csv';

        saveResults(fileName, results, dataPipeExperimentId, forceOSFSave).then(response => {
            jsPsych.finishTrial();
        })


    }
}
timeline.push(resultsTrial);

/**
 * Debrief
 */
let debriefTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Thank you!
    <a href='https://harvard.az1.qualtrics.com/jfe/form/SV_ekV0pVH9xqAoOb4?experimentParticipantId=${participantId}'>Please follow this link and complete the survey...</a>
    </h1>
    `,
    choices: ['NO KEYS'],
    on_start: function () {
        jsPsych.progressBar.progress = 1;
    }
}
timeline.push(debriefTrial);




jsPsych.run(timeline);