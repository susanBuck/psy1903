// WELCOME
alert('In this experiment we will measure your response time. You will be shown a series of simple math equations. Answer these equations as quickly and accurately as you can.');

// TRIAL 1
let num1 = Math.floor(Math.random() * 10) + 1;
let num2 = Math.floor(Math.random() * 10) + 1;
let start = Date.now();
let response = prompt('What is ' + num1 + '+' + num2 + '?');
let end = Date.now();
let time = (end - start) / 1000; // Calculate response time in seconds
if (response == num1 + num2) {
    feedback = 'correct';
} else {
    feedback = 'incorrect';
}
alert('You answered ' + response + ' (' + feedback + ')' + ' in ' + time + ' seconds.');

// TRIAL 2
num1 = Math.floor(Math.random() * 10) + 1;
num2 = Math.floor(Math.random() * 10) + 1;
start = Date.now();
response = prompt('What is ' + num1 + '+' + num2 + '?');
end = Date.now();
time = (end - start) / 1000; // Calculate response time in seconds
if (response == num1 + num2) {
    feedback = 'correct';
} else {
    feedback = 'incorrect';
}
alert('You answered ' + response + ' (' + feedback + ')' + ' in ' + time + ' seconds.');


// TRIAL 3
num1 = Math.floor(Math.random() * 10) + 1;
num2 = Math.floor(Math.random() * 10) + 1;
start = Date.now();
response = prompt('What is ' + num1 + '+' + num2 + '?');
end = Date.now();
time = (end - start) / 1000; // Calculate response time in seconds
if (response == num1 + num2) {
    feedback = 'correct';
} else {
    feedback = 'incorrect';
}
alert('You answered ' + response + ' (' + feedback + ')' + ' in ' + time + ' seconds.');


// END
alert('Thank you for your participation!');