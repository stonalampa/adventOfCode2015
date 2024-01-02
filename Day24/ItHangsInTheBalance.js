const { parse } = require('path');
const { dataImporter } = require('../DataImporter');

const data = dataImporter('\n').map(strNum => Number.parseInt(strNum));
const sumOfAllElements = data.reduce((acc, curr) => acc + curr, 0);

const getCombinations = (arr, targetSum, currentCombination = [], startIdx = 0) => {
    const result = [];

    if (targetSum === 0) {
        result.push([...currentCombination]);
        return result;
    }

    for (let i = startIdx; i < arr.length; i++) {
        if (arr[i] <= targetSum) {
            currentCombination.push(arr[i]);
            const subResult = getCombinations(arr, targetSum - arr[i], currentCombination, i + 1);
            result.push(...subResult);
            currentCombination.pop();
        }
    }

    return result;
};

const calc = (weightOfEachCompartment) => {
    const combinations = getCombinations(data, weightOfEachCompartment)
        .sort((a, b) => a.length - b.length); // get all combos and sort from shortest to longest
    const lowestNumberOfElements = combinations
        .filter(combination => combination.length === combinations[0].length); // get only the shortest combos

    let min = Number.MAX_SAFE_INTEGER; // find the lowest quantum entanglement from the shortest combos
    for (let i = 0; i < lowestNumberOfElements.length; i++) {
        const product = lowestNumberOfElements[i].reduce((acc, curr) => acc * curr, 1);
        if (product < min) {
            min = product;
        }
    }

    return min;
}

console.log("Part 1 - Minimum quantum entanglement: ", calc(sumOfAllElements / 3)); // 3 compartments
console.log("Part 2 - Minimum quantum entanglement: ", calc(sumOfAllElements / 4)); // 4 compartments