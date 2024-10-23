/**
 * 
 */
async function saveResults(fileName, data, dataPipeExperimentId = '', forceOSFSave = false) {

    // Dynamically determine if the experiment is currently running locally or on production
    let isLocalHost = window.location.href.includes('localhost');

    let destination = '/save';
    if (!isLocalHost || forceOSFSave) {
        destination = 'https://pipe.jspsych.org/api/data/';
    }

    // Send the results to our saving end point
    let response = await fetch(destination, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
        },
        body: JSON.stringify({
            experimentID: dataPipeExperimentId,
            filename: fileName,
            data: data,
        }),
    }).then(response => {
        // Parse the response body text as JSON
        return response.json();
    }).then(responseBodyAsJson => {
        return responseBodyAsJson;
    });

    return response;
}

/**
 * 
 */
function getCurrentTimestamp() {
    return new Date().toISOString().replace(/T/, '-').replace(/\..+/, '').replace(/:/g, '-');
}

/**
 * 
 */
function objectArrayToCSV(data) {
    let headers = Object.keys(data[0]);
    let rows = data.map(obj => headers.map(header => obj[header]).join(","));
    return [headers.join(","), ...rows].join("\n");
}

/**
 * 
 */
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}