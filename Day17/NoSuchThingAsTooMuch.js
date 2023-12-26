const { dataImporter } = require('../DataImporter');
const data = dataImporter('\n');

// * Part 1
const validCombos = [];
const findCombinations = (array, targetSum, currentCombination = [], currentSum = 0, startIndex = 0) => {
    if (currentSum === targetSum) {
        validCombos.push(currentCombination);
    }

    for (let i = startIndex; i < array.length; i++) {
        const newSum = currentSum + array[i];
        const newCombination = [...currentCombination, array[i]];
        findCombinations(array, targetSum, newCombination, newSum, i + 1);
    }
}

findCombinations(data.map(stringNum => parseInt(stringNum)), 150);
console.log("Part 1 - number of combinations:", validCombos.length);

// * Part 2
let min = 99;
validCombos.forEach(combo => {
    if (combo.length < min) {
        min = combo.length;
    }
});

let numOfCombosWithMinNum = 0;
validCombos.forEach(combo => {
    if (combo.length === min) {
        numOfCombosWithMinNum++;
    }
});

console.log(`Part 2 - minimum number of containers needed is: ${min} and there are ${numOfCombosWithMinNum} combinations with that number.`);