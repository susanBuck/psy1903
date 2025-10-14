let jsPsych = initJsPsych();
let timeline = [];



// Welcome
let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1 class='welcomeHeader'>Welcome to the Math Response Time Task!</h1> 
    <p>In this experiment, you will be shown a series of math questions.</p>
    <p>Please answer as quickly and accurately as possible.</p>
    <p>Press <span class='key'>SPACE</span> to begin.</p>
    `,
    choices: [' '],
};
timeline.push(welcomeTrial);



// Likert Survey
let labels = [
    "Strongly Disagree",
    "Disagree",
    "Neutral",
    "Agree",
    "Strongly Agree"
];

var surveyTrial = {
    type: jsPsychSurveyLikert,
    data: {
        collect: true,
    },
    questions: [
        {
            prompt: "I enjoy solving math problems.",
            labels: labels,
        },
        {
            prompt: "I find math easy.",
            labels: labels,
        }
    ]
};
timeline.push(surveyTrial);

for (let condition of conditions) {

    let trial = {
        type: jsPsychSurveyHtmlForm,
        preamble: `<p class='equation'>What is <span class='num'>${condition.num1}</span> + <span class='num'>${condition.num2}</span>?</p>`,
        html: `<p><input type='text' name='answer' id='answer'></p>`,
        autofocus: 'answer', // id of the field we want to auto-focus on when the trial starts
        button_label: 'Submit Answer',
        data: {
            collect: true,
        },
        on_finish: function (data) {
            data.num1 = condition.num1;
            data.num2 = condition.num2;
            data.correctAnswer = condition.correctAnswer;
            data.answer = data.response.answer;
            data.correct = condition.correctAnswer == data.response.answer;
        }
    }
    timeline.push(trial);
}



// Save Results
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
        let prefix = 'mrt';
        let dataPipeExperimentId = 'um0slxQiDwlS';
        let forceOSFSave = true;

        // Filter and retrieve results as CSV data
        let results = jsPsych.data
            .get()
            .filter({ collect: true })
            .ignore(['stimulus', 'trial_type', 'plugin_version', 'collect'])
            .csv();

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



// Debrief
let debriefTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Thank you!</h1>
    <p>You can now close this tab.</p>
    `,
    choices: ['NO KEYS'],
}
timeline.push(debriefTrial);

jsPsych.run(timeline);