
// QUESTION 2
function celsiusToFahrenheit(temp) {
    return (temp * 1.8) + 32;
}
// console.log(celsiusToFahrenheit(10)); // Expected output: 50
// console.log(celsiusToFahrenheit(-5)); // Expected output: 23



// QUESTION 3
function convertTemp(temp, convertTo) {
    if (convertTo == 'c') {
        return (temp - 32) / 1.8;
    } else if (convertTo == 'f') {
        return (temp * 1.8) + 32;
    } else {
        return 'error';
    }
}
// console.log(convertTemp(10, 'c')); // Expected output: -12.222222222222221
// console.log(convertTemp(10, 'f')); // Expected output: 50
// console.log(convertTemp(10, 'x')); // Expected output: error



// QUESTION 4
function getWordLengths(words) {
    let results = [];
    for (let word of words) {
        results.push(word.length);
    }
    return results;
}
// let words = ['apple', 'banana', 'cherry', 'pear', 'grape'];
// console.log(getWordLengths(words)); // Expected output: [5, 6, 6, 4, 5]



// QUESTION 5
function getLongestWord(words) {
    let longestWord = '';
    for (let word of words) {
        if (word.length > longestWord.length) {
            longestWord = word;
        }
    }

    return longestWord;
}
// let words = ['apple', 'banana', 'cherry', 'pear', 'grape'];
// console.log(getLongestWord(words)); // Expected output: banana



// QUESTION 6
function getOddNumbers(numbers) {
    let results = [];
    for (let number of numbers) {
        if (number % 2 != 0) {
            results.push(number);
        }
    }
    return results;
}

// console.log(getOddNumbers([1, 2, 3, 4, 5])); // Expected output: [1, 3, 5]
// console.log(getOddNumbers([12, 45, 10, 11, 61])); // Expected output: [45, 11, 61]



// QUESTION 7
function filterNumbers(numbers, evenOrOdd) {

    let results = [];

    for (let number of numbers) {
        if ((evenOrOdd == "even" && number % 2 == 0) ||
            (evenOrOdd == "odd" && number % 2 != 0)) {
            results.push(number);
        }
    }

    return results;

}

// console.log(filterNumbers([1, 2, 3, 4, 5], 'even')); // Expected output: [2, 4]
// console.log(filterNumbers([1, 2, 3, 4, 5], 'odd')); // Expected output: [1, 3, 5]

// console.log(filterNumbers([45, 10, 11, 61], 'even')); // Expected output: [10]
// console.log(filterNumbers([45, 10, 11, 61], 'odd')); // Expected output: [45, 11, 61]


// QUESTION 8
alert(`Welcome to the even/odd response time task. 

You are about to see a series of numbers.

If the number you see is EVEN, type the letter 'e'. 
If the number you see is odd, type the letter 'o'. 

Please answer as quickly and accurately as possible.`);

let results = [];

for (let i = 0; i < 5; i++) {

    let randomNumber = getRandomNumber(1, 20);

    let start = Date.now();

    let response = prompt(`Number: ${randomNumber}
        Type the letter "e" for EVEN.
        Type the letter "o" for ODD.`);

    let end = Date.now();
    let responseTime = (end - start) / 1000;

    let correct = (randomNumber % 2 == 0 && response == 'e') || (randomNumber % 2 != 0 && response == 'o');

    results.push({
        number: randomNumber,
        response: response,
        correct: correct,
        responseTime: responseTime
    });
}

alert('Thank you for your time!');
console.log(results);





function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
