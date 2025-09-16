let response = prompt('What is 4 + 6?');

let feedback = '';

if (response == 10) {
    feedback = 'You got it correct!';
} else if (response == 9 || response == 11) {
    feedback = 'You almost got it correct!';
} else {
    feedback = 'You got it incorrect. ';
}

alert(feedback + ' The expected answer is 10!');