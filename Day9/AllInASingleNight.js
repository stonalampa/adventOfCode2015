const { dataImporter } = require('../DataImporter');
const data = dataImporter('\n');

const mapValues = () => {
    const map = new Map();
    data.forEach(line => {
        const firstCity = line.split(' to ');
        const secondCityAndValue = firstCity[1].split(' = ');
        // * Create both key combos, more memory, less logic needed :)
        map.set(firstCity[0] + secondCityAndValue[0], parseInt(secondCityAndValue[1]))
        map.set(secondCityAndValue[0] + firstCity[0], parseInt(secondCityAndValue[1]))
    })
    return map;
}

const getPermutations = (array) => {
    const result = [];

    function permute(arr, current = []) {
        if (arr.length === 0) {
            result.push(current.slice());
            return;
        }

        for (let i = 0; i < arr.length; i++) {
            const remaining = arr.slice(0, i).concat(arr.slice(i + 1));
            current.push(arr[i]);
            permute(remaining, current);
            current.pop();
        }
    }

    permute(array);
    return result;
}

const map = mapValues();
const allPermutations = getPermutations(['AlphaCentauri', 'Snowdin', 'Tambi', 'Faerun', 'Norrath', "Straylight", 'Tristram', 'Arbre']);

const part1 = () => {
    let shortestDistance = 999999999;
    let shortestPath = [];

    allPermutations.forEach((permutation) => {
        let currentDistance = 0;
        for (let i = 0; i < permutation.length - 1; i++) {
            if (permutation[i + 1]) {
                currentDistance += map.get(permutation[i] + permutation[i + 1]);
            }
        }

        if (currentDistance < shortestDistance) {
            shortestDistance = currentDistance;
            shortestPath = permutation;
        }
    });
    console.log("Shortest distance is", shortestDistance, "via this path:", shortestPath);
}

const part2 = () => {
    let longestDistance = 0;
    let longestPath = [];

    allPermutations.forEach((permutation) => {
        let currentDistance = 0;
        for (let i = 0; i < permutation.length - 1; i++) {
            if (permutation[i + 1]) {
                currentDistance += map.get(permutation[i] + permutation[i + 1]);
            }
        }

        if (currentDistance > longestDistance) {
            longestDistance = currentDistance;
            longestPath = permutation;
        }
    });
    console.log("Longest distance is", longestDistance, "via this path:", longestPath);
}

part1();
part2();