// Part 0. Demonstrate string interpolation technique with backticks
/*
let feedback = 'correct';
let responseTime = 2.4;
let answer = 25;

alert('You are ' + feedback + '. Answer: ' + answer + '. Response time: ' + responseTime);
alert(`You are ${feedback}. Answer: ${answer}. Response time: ${responseTime}`);
 */

// Part 1. Functions
/*
let num1 = getRandomNumber(1, 10);
let num2 = getRandomNumber(0, 100);

displayRandomNumber();

function getRandomNumber(min, max) {
    let randomNumber = Math.floor(Math.random() * max) + min;
    return randomNumber;
}

function displayRandomNumber() {
    alert(getRandomNumber(1, 10));
}
*/

// Part 2. Arrays
/*
// Scalar data types:
let name = 'James'; // String
let age = 15; // Number
let adult = false; // Boolean

// Arrays

// An Array of Numbers
let ages = [45, 23, 28, 35, 35];

// An Array of Strings
//              0        1       2       3
let names = ['Alice', 'Jamal', 'Avi', 'Kyle'];

names[1] = 'Bob';
names.unshift('Sara');
console.log(names);
console.log(names[4]); // Kyle

// An Array can contain other Arrays
let numbers = [1, 2, 3, [8, 9, 10]];

// An Array of mixed data types (Strings, Numbers, Array)
let mixed = ['a', 'b', 1, 2, [true, 'bar']];
*/


// Part 3. Loops & Arrays
/*
let names = ['Alice', 'Jamal', 'Avi', 'Kyle'];

let namesThatStartWithA = [];

for (let name of names) {
    if (name.charAt(0) == 'A') {
        namesThatStartWithA.push(name);
    }
}
console.log(namesThatStartWithA);
*/

// Part 4. Numerical for loops, accumulating results
/*
let results = [];

for (let i = 0; i < 3; i++) {
    let num1 = getRandomNumber(1, 10);
    let num2 = getRandomNumber(1, 10);
    let start = Date.now();
    let response = prompt(`What is ${num1} + ${num2} ?`);
    let end = Date.now();
    let time = (end - start) / 1000; // Calculate response time in seconds
    if (response == num1 + num2) {
        feedback = 'correct';
    } else {
        feedback = 'incorrect';
    }

    results.push([feedback, time]);

    alert(`You answered ${response} (${feedback}) in ${time} seconds.`);
}

console.log(results);
 */


// Part 5. Objects
/*
// Array
let participantA = ['Alice', 21, true];

// Object
let participantB = {
    name: 'Alice',
    age: 21,
    consent: true
}
participantB.consent = false;
participantB.startTime = '2:00pm';
delete participantB.age;
console.log(participantB);

if (participantA[2]) {
    // ...
}

if (participantB.consent) {
    // ...
}
*/



// Part 6. 
/*
let results = [];

for (let i = 0; i < 3; i++) {
    let num1 = getRandomNumber(1, 10);
    let num2 = getRandomNumber(1, 10);
    let start = Date.now();
    let response = prompt(`What is ${num1} + ${num2} ?`);
    let end = Date.now();
    let time = (end - start) / 1000; // Calculate response time in seconds
    let answer = num1 + num2;
    if (response == answer) {
        feedback = 'correct';
    } else {
        feedback = 'incorrect';
    }

    results.push({
        response: response,
        answer: answer,
        feedback: feedback,
        time: time
    });

    alert(`You answered ${response} (${feedback}) in ${time} seconds.`);
}

console.log(results);
 */


function getRandomNumber(min, max) {
    let randomNumber = Math.floor(Math.random() * max) + min;
    return randomNumber;
}