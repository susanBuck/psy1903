let conditions = [];

for (let i = 0; i < 3; i++) {

    let num1 = getRandomNumber(1, 10);
    let num2 = getRandomNumber(1, 10);
    let correctAnswer = num1 + num2;

    // Generate a random alternative answer
    let altAnswer = getRandomNumber(1, 10) + getRandomNumber(1, 10);

    // Option A to make sure correctAnswer and altAnswer don’   t match
    while (altAnswer == correctAnswer) {
        altAnswer = getRandomNumber(1, 10) + getRandomNumber(1, 10);
    }

    // Option B to make sure correctAnswer and altAnswer don't match
    // If they do match, just subtract some random number from the alternative answer and make sure it's positive
    // if (altAnswer == correctAnswer) {
    //     altAnswer = Math.abs(correctAnswer - getRandomNumber(1, 10));
    // }

    conditions.push({
        num1: num1,
        num2: num2,
        correctAnswer: correctAnswer,
        altAnswer: altAnswer,
    });
}

// console.log(conditions);

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}