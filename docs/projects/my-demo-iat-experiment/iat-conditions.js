// Modify the following `blocksA`, `blocksB`, and `words` arrays with appropriate values for your experiment
let blocksA = [
    ['men', 'women'],
    ['family', 'career']
];

let blocksB = [
    ['family or men', 'career or women'],
    ['family or women', 'career or men']
];

// There should be 10 words per category
let words = {
    family: ['home', 'wedding', 'children', 'relative', 'parent', 'cousin', 'sibling', 'spouse', 'house', 'baby'],
    career: ['corporation', 'salary', 'interview', 'promotion', 'resume', 'office', 'income', 'hiring', 'bosses', 'corporate'],
    men: ['Calvin', 'Ben', 'Jamal', 'Charles', 'Mateo', 'Henry', 'Lucas', 'Andrew', 'Darnell', 'George'],
    women: ['Mariah', 'Emily', 'Julia', 'Brenda', 'Tasha', 'Priya', 'Kelsey', 'Jasmine', 'Grace', 'Camila'],
};


// Your final experiment should show 36 words per category; 
// when developing your experiment you can reduce this number
// to expedite the process of testing the experiment
// Always set the count to an even number
let count = 4;



// The following code will process the above information into a `conditions` array you 
// can use to structure your experiment. 
// 
// !! DO NOT MODIFY ANY OF THE FOLLOWING CODE !!
// 
let conditions = generateConditions();
console.log(conditions);

function generateConditions() {

    // Define an empty array we'll accumulate our conditions in
    let conditions = [];

    // Define a blocks array that will start with blocksA in random order, followed by blocksB in random order
    let blocks = shuffle(blocksA).concat(shuffle(blocksB));

    // Loop through the categories of our blocks
    for (let categories of blocks) {

        // Define an empty array we'll accumulate our trials in
        let trials = [];

        // Loop through the individual categories
        for (let category of shuffle(categories)) {

            // wordChoices is an array we’ll build pulling from our pool of words
            let wordChoices = [];

            // In the case of compound categories (e.g. "women or career") we need to split
            // this into the individual categories (e.g. "women" and "career") to build our pool of words
            if (category.includes('or')) {
                let parts = category.split(' or ');
                wordChoices = shuffle(words[parts[0]].concat(words[parts[1]]));
            } else {
                wordChoices = shuffle(words[category]);
            }

            // Start with a copy of wordChoices, which we'll pull from until it's empty, at which point we'll start with a new copy
            // FYI the ... operator is used here to make a copy of the wordChoices array
            let wordsLeft = [...wordChoices];

            // Now we'll pick our words on a loop. We loop for count/2
            // because this will happen twice (once for each category in the block)
            for (let i = 0; i < count / 2; i++) {

                // If we've emptied our wordChoices array, "refill" it
                if (wordsLeft.length == 0) {
                    wordsLeft = shuffle([...wordChoices]);
                }

                // Pick a random word
                let word = sample(wordsLeft);

                // Remove the word we just picked so we don't pick it again
                remove(wordsLeft, (element) => element === word);

                // If the category matches the left category, we expect "f" key response
                if (categories[0] == category) {
                    expectedResponse = 'f';
                    // Otherwise we expect a "j" key response
                } else {
                    expectedResponse = 'j';
                }

                // Push an object of trial data onto our trials array
                trials.push({
                    word: word,
                    expectedCategory: searchObject(words, word),
                    expectedCategoryAsDisplayed: category,
                    expectedResponse: expectedResponse
                })
            }
        }

        // Push an object of block data onto our conditions array
        conditions.push({
            categories: categories,
            trials: shuffle(trials)
        });
    }

    return conditions;
}


/**
* The following are miscellaneous array functions utilized in the above code
*/
// Shuffle an array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Remove an element from an array
function remove(array, predicate) {
    const index = array.findIndex(predicate);
    if (index !== -1) {
        array.splice(index, 1);
    }
}

// Select a random element from an array
function sample(array) {
    const index = Math.floor(Math.random() * array.length);
    return array[index];
}

// Search an object for a string
function searchObject(haystack, needle) {
    for (let key in haystack) {
        if (haystack[key].includes(needle)) {
            return key; // Return the key where the string was found
        }
    }
}