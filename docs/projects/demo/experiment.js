let jsPsych = initJsPsych();

let timeline = [];

const trial = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `<div style="width: 600px">
        <div style="width: 50px; height: 50px; background-color: red; display: inline-block"></div>
        <div style="width: 50px; height: 50px; background-color: red; display: inline-block"></div>
        <div style="width: 50px; height: 50px; background-color: green; display: inline-block"></div>
        <div style="width: 50px; height: 50px; background-color: blue; display: inline-block"></div>
        <div style="width: 50px; height: 50px; background-color: red; display: inline-block"></div>
        <div style="width: 50px; height: 50px; background-color: red; display: inline-block"></div>
        <div style="width: 50px; height: 50px; background-color: green; display: inline-block"></div>
        <div style="width: 50px; height: 50px; background-color: blue; display: inline-block"></div>
        <div style="width: 50px; height: 50px; background-color: red; display: inline-block"></div>
        <div style="width: 50px; height: 50px; background-color: gray; display: inline-block"></div>
    </div>`,
    choices: ['red', 'green', 'blue'],
    prompt: "<p>What color should the gray block be?</p>",
    button_html: (choice) => `<div style="width: 80px; height: 80px; margin: 20px; background-color: ${choice}; cursor: pointer;"></div>`
};

timeline.push(trial);


let debriefTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Thank you for your participation.</h1>
    <p>You can now close this tab.</p>`,
    choices: ['NO KEY'],
    on_start: function (data) {
        console.log(data);
    }
}

timeline.push(debriefTrial);

jsPsych.run(timeline);