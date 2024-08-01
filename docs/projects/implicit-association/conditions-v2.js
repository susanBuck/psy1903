let words = {
    family: ['home', 'wedding', 'children', 'relatives', 'parents'],
    career: ['corporation', 'salary', 'interview', 'promotion', 'resume'],
    men: ['Ben', 'Jamal', 'Charles', 'Mateo', 'Henry'],
    women: ['Emily', 'Julia', 'Brenda', 'Tasha', 'Priya'],
};

let blocksA = [
    ['family', 'career'],
    ['men', 'women']
];

let blocksB = [
    ['family or men', 'career or women'],
    ['family or women', 'career or men']
];


let blocks = _.shuffle(blocksA).concat(_.shuffle(blocksB));
let conditions = [];

for (let categories of blocks) {

    let trials = [];

    for (let category of _.shuffle(categories)) {

        let wordChoices = [];

        if (category.includes('or')) {
            let parts = category.split(' or ');
            wordChoices = _.shuffle(words[parts[0]].concat(words[parts[1]]));
        } else {
            wordChoices = _.shuffle(words[category]);
        }

        let wordsLeft = [...wordChoices];

        for (let i = 0; i < 10; i++) {

            if (_.isEmpty(wordsLeft)) {
                wordsLeft = _.shuffle([...wordChoices]);
            }

            let word = _.sample(wordsLeft);
            _.remove(wordsLeft, (element) => element === word);

            trials.push({
                word: word,
                category: category
            })
        }
    }

    conditions.push({
        categories: categories,
        trial: _.shuffle(trials)
    });
}

console.log(conditions);