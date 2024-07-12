function output(content) {
    document.getElementById('output').innerHTML += content + '<br>';
}

let response = prompt('What is 4 + 6?');

if (response == 10) {
    output('Correct! The answer is 10.');
} else if (response == 9 || response == 11) {
    output('Very close! The answer is 10.');
} else if (response => 8 && response <= 12) {
    output('Close! The answer is 10.');
} else {
    output('Incorrect. The answer is 10.');
}