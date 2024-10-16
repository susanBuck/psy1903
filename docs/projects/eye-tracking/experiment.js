// https://onlinelibrary.wiley.com/doi/full/10.1111/infa.12564


// reconstruction https://www.jspsych.org/latest/plugins/reconstruction/
// dynamic stimuli https://www.jspsych.org/latest/plugins/canvas-button-response/
// Virtual chinrest https://www.jspsych.org/latest/demos/jspsych-virtual-chinrest-demo3.html

let jsPsych = initJsPsych({
    extensions: [
        { type: jsPsychExtensionWebgazer }
    ]
});

let preload = {
    type: jsPsychPreload,
    images: ['img/blue.png']
}

let camera_instructions = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
          <p>In order to participate you must allow the experiment to use your camera.</p>
          <p>You will be prompted to do this on the next screen.</p>
          <p>If you do not wish to allow use of your camera, you cannot participate in this experiment.<p>
          <p>It may take up to 30 seconds for the camera to initialize after you give permission.</p>
        `,
    choices: ['Got it'],
}

let init_camera = {
    type: jsPsychWebgazerInitCamera
}

let calibration_instructions = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
          <p>Now you'll calibrate the eye tracking, so that the software can use the image of your eyes to predict where you are looking.</p>
          <p>You'll see a series of dots appear on the screen. Look at each dot and click on it.</p>
        `,
    choices: ['Got it'],
}

let calibration = {
    type: jsPsychWebgazerCalibrate,
    calibration_points: [
        [25, 25], [75, 25], [50, 50], [25, 75], [75, 75]
    ],
    repetitions_per_point: 2,
    randomize_calibration_order: true
}

let validation_instructions = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
          <p>Now we'll measure the accuracy of the calibration.</p>
          <p>Look at each dot as it appears on the screen.</p>
          <p style="font-weight: bold;">You do not need to click on the dots this time.</p>
        `,
    choices: ['Got it'],
    post_trial_gap: 1000
}

let validation = {
    type: jsPsychWebgazerValidate,
    validation_points: [
        [25, 25], [75, 25], [50, 50], [25, 75], [75, 75]
    ],
    roi_radius: 200,
    time_to_saccade: 1000,
    validation_duration: 2000,
    data: {
        task: 'validate'
    }
}

let recalibrate_instructions = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
          <p>The accuracy of the calibration is a little lower than we'd like.</p>
          <p>Let's try calibrating one more time.</p>
          <p>On the next screen, look at the dots and click on them.<p>
        `,
    choices: ['OK'],
}

let recalibrate = {
    timeline: [recalibrate_instructions, calibration, validation_instructions, validation],
    conditional_function: function () {
        let validation_data = jsPsych.data.get().filter({ task: 'validate' }).values()[0];
        return validation_data.percent_in_roi.some(function (x) {
            let minimum_percent_acceptable = 50;
            return x < minimum_percent_acceptable;
        });
    },
    data: {
        phase: 'recalibration'
    }
}

let calibration_done = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
          <p>Great, we're done with calibration!</p>
        `,
    choices: ['OK']
}

let begin = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<p>The next screen will show an image to demonstrate adding the webgazer extension to a trial.</p>
          <p>Just look at the image while eye tracking data is collected. The trial will end automatically.</p>
          <p>Press any key to start.</p>
        `
}

// let trial = {
//     type: jsPsychImageKeyboardResponse,
//     stimulus: 'img/blue.png',
//     choices: "NO_KEYS",
//     trial_duration: 2000,

//     extensions: [
//         {
//             type: jsPsychExtensionWebgazer,
//             params: { targets: ['#jspsych-image-keyboard-response-stimulus'] }
//         }
//     ]
// }

let trial = {
    type: jsPsychHtmlKeyboardResponse,
    trial_duration: 2000,
    stimulus: function () {
        return `
           <img src='img/blue.png' id='image1'>
           <img src='img/blue.png' id='image2'>
           <img src='img/blue.png' id='image3'>
        `;
    },
    choices: "NO_KEYS",
    extensions: [
        {
            type: jsPsychExtensionWebgazer,
            params: { targets: ['#image1', '#image2', '#image3'] }
        }
    ]
};

let show_data = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function () {
        let trial_data = jsPsych.data.getLastTrialData().values();
        let trial_json = JSON.stringify(trial_data, null, 2);
        return `
            <p style="margin-bottom:0px;"><strong>Trial data:</strong></p>
            <pre style="margin-top:0px;text-align:left;">${trial_json}</pre>
        `;
    },
    choices: "NO_KEYS"
};

jsPsych.run([
    preload,
    camera_instructions,
    init_camera,
    calibration_instructions,
    calibration,
    //validation_instructions,
    //validation,
    //recalibrate,
    calibration_done,
    begin,
    trial,
    show_data
]);