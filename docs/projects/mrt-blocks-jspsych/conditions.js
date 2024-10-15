let conditions = [];

for (let i = 0; i < 3; i++) {

    let numbers = [];

    // FYI: When using a nested numerical for loop, it’s common practice
    // to use "j" as the iterator variable in the inner loop since "i" is already being 
    // used as the iterator variable in the outer for loop
    for (let j = 0; j < 3; j++) {

        let min = i * 10;
        let max = min + 10;

        let num1 = getRandomNumber(min, max);
        let num2 = getRandomNumber(min, max);

        numbers.push({
            num1: num1,
            num2: num2,
            answer: num1 + num2
        })
    }

    conditions.push({
        title: `Part ${i + 1}`,
        questions: numbers
    });
}

//console.log(conditions);

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


/* 
Example `conditions` array that would be produced by the above code:
[
    {
        "title": "Part 1",
        "questions": [
            {
                "num1": 4,
                "num2": 4,
                "answer": 8
            },
            {
                "num1": 0,
                "num2": 2,
                "answer": 2
            },
            {
                "num1": 7,
                "num2": 9,
                "answer": 16
            }
        ]
    },
    {
        "title": "Part 2",
        "questions": [
            {
                "num1": 10,
                "num2": 14,
                "answer": 24
            },
            {
                "num1": 13,
                "num2": 14,
                "answer": 27
            },
            {
                "num1": 14,
                "num2": 19,
                "answer": 33
            }
        ]
    },
    {
        "title": "Part 3",
        "questions": [
            {
                "num1": 21,
                "num2": 22,
                "answer": 43
            },
            {
                "num1": 29,
                "num2": 21,
                "answer": 50
            },
            {
                "num1": 28,
                "num2": 25,
                "answer": 53
            }
        ]
    }
]
*/
