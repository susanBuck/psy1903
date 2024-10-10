let conditions = [];
for (let i = 0; i < 3; i++) {
    let num1 = getRandomNumber(1, 10);
    let num2 = getRandomNumber(1, 10);

    conditions.push({
        num1: num1,
        num2: num2,
        answer: num1 + num2
    })
}
console.log(conditions);

function getRandomNumber(min, max) {
    let randomNumber = Math.floor(Math.random() * max) + min;
    return randomNumber;
}

