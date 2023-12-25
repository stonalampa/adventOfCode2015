const { dataImporter } = require('../DataImporter');
const data = dataImporter('\n');

const personMap = {};
const setHappiness = (person1, person2, value) => {
    if (!personMap[person1]) {
        personMap[person1] = {};
    }
    personMap[person1][person2] = value;
};

const processInput = (input) => {
    const regex = /(\w+) would (gain|lose) (\d+) happiness units by sitting next to (\w+)/;
    const match = input.match(regex);

    if (match) {
        const person1 = match[1];
        const person2 = match[4];
        const happinessChange = (match[2] === 'gain' ? 1 : -1) * parseInt(match[3]);

        setHappiness(person1, person2, happinessChange);
    }
};

data.forEach(row => processInput(row));

const createAllCombination = (array) => {
    const result = [];

    const permute = (arr, m = []) => {
        if (arr.length === 0) {
            result.push(m);
        } else {
            for (let i = 0; i < arr.length; i++) {
                const curr = arr.slice();
                const next = curr.splice(i, 1);
                permute(curr.slice(), m.concat(next));
            }
        }
    }
    permute(array);

    return result;
};

const calculateHappiness = (combo) => {
    let happiness = 0;

    for (let i = 0; i < combo.length; i++) {
        const person = combo[i];
        const leftPerson = combo[i - 1] || combo[combo.length - 1];
        const rightPerson = combo[i + 1] || combo[0];

        happiness += personMap[person][leftPerson] + personMap[person][rightPerson];
    }

    return happiness;
}


const allCombos1 = createAllCombination(['Alice', 'Bob', 'Carol', 'David', 'Eric', 'Frank', 'George', 'Mallory']);
let maxHappiness1 = 0;

allCombos1.forEach((combo) => {
    const happiness = calculateHappiness(combo);

    if (happiness > maxHappiness1) {
        maxHappiness1 = happiness;
    }
});
console.log("Part 1:", maxHappiness1);


// * Part 2 - Added me sentences to the input
let maxHappiness2 = 0;
const allCombos2 = createAllCombination(['Alice', 'Bob', 'Carol', 'David', 'Eric', 'Frank', 'George', 'Mallory', 'Me']);

allCombos2.forEach((combo) => {
    const happiness = calculateHappiness(combo);

    if (happiness > maxHappiness2) {
        maxHappiness2 = happiness;
    }
});
console.log("Part 2:", maxHappiness2);